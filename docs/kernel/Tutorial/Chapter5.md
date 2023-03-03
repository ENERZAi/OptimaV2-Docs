# Chapter 5. Runtime expressions

We have now come through series of features that compile time expression has. But as I mentioned earlier, the primary purpose of compile time expression is generating runtime expressions. Runtime expressions will be translated into executable binary after lowering and applying some optimizations. To do so, compile time expression can treat runtime expression as a 'value'. In this chapter, I will show you how you can write runtime expression, and use it in compile time to generate appropriate output expression.

### Defining runtime expression
In compile time expression, we have seen runtime expression can be described as follows. (If you don't remember, go back to Chapter 1)
```
let rtExpr = !{<some runtime expression>}
<next compile time expression to execute>
```
As we see, runtime expression is embedded in compile time expression as a value. Moreover, we can nest compile time expression and runtime expression for generating runtime expression (runtime code in otherwords). This concept is a key to understanding how Opto works.

In runtime, everything is similar to compile time, except the following

1. It does not have closure or recursion
      *  We use for loops instead!
  
2. we can manage our memory
      *  Use alloc</type, alignment/>() for allocation
      *  Use load, store expressions to read and store the value to the memory

3. No tuple types
4. List type is only allowed with 'idx' type
5. Tensors are mutable
   * Just like compile time code, definitions with 'let' bindings are immutable. However, only runtime tensors can be modified by 'store' function.

Let me explain these with examples.
Runtime code is closely related to hardware. Therefore, we can explicitly allocate, load and store to the memory. Following example allocates a tensor, and stores data from given tensor called 'data' after multiplying by 2

```c++
// Allocates tensor
let buffer = alloc</${rt_tensor([10,20], rt_number("f32"))}, 64/>()

// Nested for loop for storing a value
for(i from 0i to 10i step 1i){
    for(j from 0i to 10i step 1i){
        let value = load(data, [i, j]) // Load the value from the tensor 'data'
        store(buffer, [i, j], value*2.0f) // Store the value to the allocated buffer
    }
}
```

#### Runtime tensor

1. __Allocating a tensor__
   
    Tensor allocation can be done with alloc</(runtime_type), alignment/>(). runtime_type is tensor runtime type defined in compile time. In the above example, we used compile time block ${} to express runtime tensor type. alignment means memory alignment of the tensor. For amd64 architectures, it is best to align it on 64bit boundary, because most of its vector instructions requires value to be aligned in 64bit boundary

        alloc</runtime tensor type, alignment/>() -> returns runtime tensor

    * Note : Lifetime of the tensor

        Tensor is allocated in heap by default, and it will be freed automatically (or destroyed) when program's control flow exists the current scope. Internally, Opto compiler automatically puts memory free instruction at the end of the scope for all tensors that have been allocated inside the current scope.

2.  __Loading and storing to tensor__
   
    tensor load and store can be done with dedicated load, and store functions

        load(tensor, index list) -> returns the loaded value
        store(tensor, index list, value to store) -> returns the value that has been stored

    Index list is list of indices used to access a value in the tensor.


#### For loop
   
We can use for loops in runtime code. However its form is little different with what we saw in python or C.

```
// Basic format of for loop
for(iterator_variable from begin_idx to end_idx step step_size) [iterator_variables : initial_value, ...]{
    // Body expression
}
```

In the for loop, we cannot have conditions other than range. Moreover, this range must be fixed in compile time. This is due to optimitization issues. We need to know the range and step of the for loop before optimization so we can decide how to optimize the for loop.

Something that might be new to you is concept called _iterator_vairable_. This is used when we have to use 'destructive update;'. As we all know, let bindings in Opto is immutable unless it's tensor. However, in the for loop, we might want to update some value we have already defined. 
Suppose we want to add up all values in the tensor. In this case, it is necessary to define a value and keep adding to that value.

To support this without violating the immutability, This is where _iterator_variable_ comes into play.

This code calculates sum of all values in the tensor called 'data' and stores it in 'result'. 
```
// Basic format of for loop
let initialSum = 0.0f
let result = 
    for(itr from 0i to 10i step 1i) [sumOnUpdate : initialSum]{
        sumOnUpdate + load(data, [itr])
    }
result
```

The initial value of the sum is stored in 'initialSum' with zero. When for loops starts its iteration, initialSum is captured in value called 'sumOnUpdate'. In the body of for loop, the returned value from the last expression is stored in 'sumOnUpdate' for the next iteration. Since we are adding value loaded from 'data' and passing it to 'sumOnUpdate', 'sumOnUpdate' in the next iteration will equal ('sumOnUpdate' in current iteration + loaded value from 'data).  When this procedure continues, we end up adding all elements in 'data'.
The return value of the for loop is the value of the 'sumOnUpdate' updated from the last iteration. Therefore, 'result' becomes the result we want.

We can use iterator variables when we need to use the result of the body expression of for, but please note that number of return values and number of iterator variables should match unless there are no iterator variables

If we don't require any iterator variables, we can omit bracket '[]', and for loop won't return any values.

#### Automatically generating nested for loops
    
In some cases, we might not know number of required nested for loops. This case frequently happens if we don't know the dimension of the given tensor. Supppose we have to add two tensors one by one, and we need to broadcast between them. We will have to make nested for loops to do so, but number of loops depends on the dimension of input tensors. In Opto, answer to this problem is 'rt_for', which is compile time expression that will generated nested runtime for loops.
Here is the simple use case.

```
let iteratorNames = ["itr0", "itr1", "itr2"]
let loops = ([0i, 3i, 1i], [0i, 10i, 1i], [0i, 5i, 1i])
let initialValue = 0.0f

!{
    let returnedValue = ${
        rt_for(iteratorNames : loops)} ["updateValue" : initialValue]{
            // Body function
            // Note rt_for is the compile time expression. Therefore, body has to be compile time expression
            !{
                updateValue + load(data, iteratorNames)
            }
        }
    }
    returnedValue
}
```

Now this will be converted to following runtime code

```
let returnedValue = for(itr0 from 0i to 3i step 1i) [updateValue_0 : 0.000000f] {
    for(itr1 from 0i to 3i step 1i) [updateValue_1 : updateValue_0] {
        for(itr2 from 0i to 3i step 1i) [updateValue : updateValue_1] {
            updateValue + load(data, [itr0, itr1, itr2])
        }
    }
}
returnedValue
```

How cool is that? We have successfully created nested for loop using list of iterator names and loop range lists.
Just like normal runtime for loops we can omit '[]' bracket or leave it empty if we don't need iterator variables. If there are no iterator variables, return value of the body will be ignored.

```
// rt_for without iterator variables
rt_for(iteratorNames : loops)} {
        // Body function
        // Note rt_for is the compile time expression. Therefore, body has to be compile time expression
        !{
            let value = load(src, iteratorNames)
            store(dest, iteratorNames, value) 
        }
    }
```

Just be careful that rt_for is compile time expression. Thats why we had to give the name 'updateValue' as a string in compile time, so its converted into identifier in runtime. Also, we have to put compile time expression inside the body of rt_for.

Here is the description of each section in rt_for expression

    rt_for(itr variable list: itr range list) [update_value : initial_value, ...]{
        // Body of the expresion
    }

* itr variable list : list of iteration variables to be used in runtime. Given as list of string. beginning of the list indicates outermost loop.
* itr range list : list of iteration variables used for each loop level. beginning  of the list indicates outermost loop. Given as list of list with 3 values indicating [begin index, end index, step size]
* update_value : name of the value to be updated
* initial_value : value to initialize update_value in the first loop


### Runtime if statements

We can use if statement in runtime just like what we did in copmile time. However, it is important to note some differences between these two cases.

The key differences are

1. Since there is no 'none' type in runtime, we must return same type in both if and else block or return nothing from neither of the blocks
2. Return type must be number type
        * Note : this restriction will be removed after
3. 'else' block is omittable only if 'if' block returns nothing

```
    let returnVal  = if(cast</f32/>(${t[0]}) + 1.0f > cast</f32/>(${t[1]} - 1i)){
        cast</f32/>(cast</i32/>(${t[1]} - 1i))
    } else {
        cast</f32/>(${t[0]}) + 1.0f
    }
```