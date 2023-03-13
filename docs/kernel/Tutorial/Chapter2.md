# Chapter 2. Understanding compile-time language features

The key for getting used to opto language is getting used to writing compile time code. Compile time code is executed during compilation, and it is used to generate efficient runtime code for the target.

Compile time code follows functional style. In functional programming, every expression can be treated as a function. Using this feature, functional programming is constructed by applying and composing functions. This makes modularizing and structuring programs easier than conventional iterative programs. Functional programming makes program easier to debug, and harder to make mistakes. If you are new to functional programming, this will guide you getting used to it and you will see true benefit that functional programming brings us.

### let binding (expression)
'let' expression in opto language is used to bind a value to a symbol. Symbols defined using 'let' is immutable (which means the value cannot be changed). Therefore, all symbols in opto language is immutable. This might sound uncomfortable, but it prevents lots potential bugs that mutable variable can cause.

Important thing to remember about 'let' is that we must provide some expression that returns some value after using 'let'. As I said before, everything is 'function' in functional programming. In mathematics (not in programming), deterministic function should always return some value. When its parameters are equal, function should always return a same value. That applies same in opto language. Since 'let' expression is also a function, we need some way to return a value. But the 'let' expression itself has no value to return. Therefore, we add some other expression at the end to return some value.

Here is an example designed to help your understanding.
```
template<//>
module let_example(){
    // Body expression
    let a = 3 // declares symbol 'a' with 3
    a // returns value stored in 'a' (which is 3)
}
```
In this example, we declared 'a' with '3'. Remember, 'let' expression has to return some value. To do so, the expression 'a' in the next line accomplishes the purpose.
This is how opto program uses let bindings to structure the program. we can extend this further like following code.
```
template<//>
module let_example(){
    // Body expression
    let a = 3 // declares symbol 'a' with 3
    let b = 2 // declares symbol 'b' with 2
    a + b // returns 5
}
```
Now, the whole code after 'let b = 2' is responsible for generating the return value for first 'let a = 3' expression. 
Moreover, for 'let b = 2', expression 'a + b' is responsible for returning. At the end, if you follow the recursive structure, the result of 'a + b' (which is 5 here) is the value to be returned. 

This is how code is structured in functional programming and Opto. Since let binding connects the declaration of the variable and expression following after it, it is an important building block in composing expressions.

There are also some cases we want to execute the expression, but ignore its output. In such cases, we can use '_' instead of name.
```
let _ = <init expression>
<next expression>
```
In this case, output of the init expression will be ignored, and let expression will not define any symbol.

### List and tuples
Two frequently used data types in compile time code is list and tuple. These data types both store sequence of values. 
```
let a, b = (2, 3)
let listExample = [1, 2, 3, a + b] // list of int (list<int32>)
let tupleExample = (3, !{2}, [2,3,4]) // tuple of (int32, runtime_expression, list list of intetgers) (tuple<int32, rt_expr, list<int32>>)
```
They do look similar, but they differ in a very important point as you may have already noticed.

__List__ is a sequence of values of the same time

__tuple__ is a sequence of values of the same or possibily different types

You can think of tuple as a list that can have multiple types per element. While list is more efficient and type safe, tuple provides better type flexibilty. If you need a container with only one type, list provides more generality.

#### Using the list or tuple
Accessing list or tuple is simple as below.

Get single element
```
let listElement = listExample[0]
let tupleElement = tupleExample[0]
```
We can slice list or tuple and get subset of it using [<begin index>:<end index>]. End index must be greater or equal than begin index, and range of begin and end index should be between (0, len(list or tuple)]
```
let slicedList = listExample[0:2] // returns [1,2]
let slicedTuple= tupleExample[1:3] // returns (!{2}, [2,3,4])
```
If we want to slice until the end of list or tuple, we can omit 'end' index
Note that begin index 
```
let slicedList = listExample[1:] // returns [2,3,5]
let slicedTuple= tupleExample[2:] // returns ([2,3,4])

let emptyList = listExample[4:] // returns []
let emptyTuple= tupleExample[3:] // returns ()
```
Get length of list or tuple
```
let listLength = len(listExample) // returns 3
let listSubsetLength = len(listExample[0:2]) // returns 2
let tupleLength = len(tupleExample) // returns 3
```

We can use '[]' operator to access, or slice the list or tuple.
We can also use builtin operator 'len' for getting the length of the list or tuple.

#### Appending, merging the list or tuple
We can append, merge the lists and tuples using append operators.
To append to the beginning of the list or tuple, we use ':>' operator. When appending on backward of the list or tuple, we use '<:' operator.
When we merge two lists or tuples, we use '@' operator. 

```
let forwardAppendedList = 0 :> [1,2,3] // result : [0,1,2,3]
let backwardAppendedList = [1,2,3] <: 4 // result : [1,2,3,4]

let forwardAppendedTuple = [3,4] :> (a, !{2}) // result : ([3,4], a, !{2})
let backwardAppendedTuple = (a, !{2}) <: [3,4] // result : (a, !{2}, [3,4])

let mergedList = [0,1,2] @ [3,4] // result : [0,1,2,3,4]
let mergedTuple = (a, !{2}) @ (5, [1,2]) // result : (a, !{2}, 5, [1,2])

```

Note that in case of a list, we can only merge lists of same type, and append elements of the expected type of the list. On the other hand, there is no restrictions with types when using tuple.

```
// We cannot merge list with different types
let correctExample = [1,2] @ [3,4] // result : [1,2,3,4]
let wrongExample = [1,2] @ [!{1}, !{2}] // error (cannot merge between list<int32> and list<rt_expr>)

// It's fine to merge between tuples regardless of types
let correctExample = (1, 2) @ (!{1}, !{2}) // result : (1, 2, !{1}, !{2})
```

### Type casting

In opto, we can cast between number type using 'cast' function. Here is a simple example
```
let intValue = 0
let f32Value = cast</f32/>(intValue)
```

There are no restrictions in casting when we are casting between number types. Casting between any type other than number types is not allowed.

__Rounding rule__

Rounding rule determines conversion from floating point values to integer values. Rounding rule follows python's default rounding rule.

* If value is **positive**, performs **floor**(value) which is nearest integer that is less or equal than given value.
* If value is **negative**, performs **ceil**(value) which is nearest integer that is greater or equal than given value.

In C++, this rule can be implemented as follows (where 'result' means casted output and 'value' means input floating point value).
```c++
double absoluteVal = static_cast<double>(std::abs(value));
long result = if value > 0 ? absoluteVal : -absoluteVal;
```

Type casting can be done both in compile time and runtime, and their casting rules are identical.
