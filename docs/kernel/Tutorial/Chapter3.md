# Chapter 3. Functions (Closures)

### Defining Functions with parameters
Since opto language is composed using functions (closures), defining function with parameters is very simple.

```
template<//>
module function_example(){
    // Body expression
    let foo a = a + 3 // Define the function
    foo <| 3 // Call the function with 3
}
```
This example shows process of defining very simple function, and calling it. It defines function named 'foo' with single parameter called 'a'. In the next line, we call our function 'foo' by assigning '3' to parameter 'a'. 
The '<|' symbol is called 'pipe operator', which is used to call function 'foo'. It will convey parameter value '3' to the function and invoke the function.


#### Function with multiple parameters
When we need multiple parameters, we can simply write more parameters in the definition.
```
template<//>
module function_example(){
    // Body expression
    let foo a b = a + b + 2 // Define the function
    foo <| 3 <| 4 // Call the function with 3 and 4
}
```

This way, we can defined function 'foo' receiving a and b as a parameter and called function 'foo' with 3 and 4, where 3 is assigned to parameter 'a' and 4 is assigned to parameter 'b'.

We can even generate a 'partial' function of function 'foo'.
```
template<//>
module function_example(){
    // Body expression
    let foo a b = a + b + 2 // Define the function
    let foo_partial = foo <| 3 // This is a partial function  of function 'foo'
    foo_partial <| 4
}
```
Here, we gave only one parameter to function 'foo' that should receive two parameters. In other languages like python or C++, this would cause error since number of parameters did not match number of given arguments. However, in Opto, this is valid code. Opto will generate a partial function of 'foo'. In above code, 'foo_partial' is equivalent to the following.

```
let foo_partial b = 3 + b + 2
```
We now see how 'a' is converted into given parameter, and b is remaining undetermined. Now, foo_partial is a function that receives 'b' and returns 3 + b + 2.
Therefore, we need to pass parameter 'b' to compute the result. Which was '4' in the above example.

This is possible because Opto defines function with multiple arguments as higher order functions.
If we define function 'foo' with multiple arguments like we did before, foo is actually treated equivalent as following.

```
let foo = lambda (a) {
        lambda (b) {
            a + b + 2
        }
    }
}

```
'foo' is actually a higher order function that returns another function inside with parameter, which is defined using first parameter 'a'. Therefore, when we call 'foo <| 3 <|4', we end up evaluating higher order function first with 'a = 3' and evaluate internal partial function with 'b = 4'.  


If you want to write the function in-line, you can also write like following using 'lambda'.
```
template<//>
module function_example(){
    // Body expression
    let foo = lambda (a, b) { a + b + 2 }
    foo <| 3 <| 4
}
```
This example does exactly same thing as above. The only difference is syntax.

#### Closure
Actually, accurate name of calling 'function' in Opto is 'closure'. It is called closure because our functions capture values automatically that were in the environment when it is defined.  See the following example.
```
template<//>
module closure_example(){
    // Body expression
    let c = 2
    let foo a b = a + b + c
    foo <| 3 <| 4
}
```
In this code we define 'c' outside as 2 and we are using 'c' inside foo. Our function (closure) 'foo' captures value c in its own environment, and uses it to compute its output. Since 'c' is 'captured' inside closure foo's local environment, it is independent from the 'c' variable ouside function after it is captured. In other words, closures capture by value.

```
template</a : bool/>
module closure_example(){
    // Body expression
    let foo = if (a == true) {
        let c = 2
        let foo a b = a + b + c
        foo
    } else {
        let c = 1
        let foo a b = a + b + c
        foo
    }

    foo <| 3 <| 4 // result : 9 if a was true, 8 otherwise
}

```
While c is defined inside scope of if/else statement, we can still compute the 'foo' because c = <value> is already stored inside the closure 'foo'.

### Recursions
Recursions are very important feature in Opto. Many critical functionalities are built with recursions in Opto. It is used when generating nested for loops, variable indices, and lots more.
Defining recursive function (closure) is not really different from defining non-recursive functions, but we need to write 'rec' (stands for 'recursion') after 'let'.
```
template<//>
module recursion_example(){
    let rec fibonacci n = 
        if (n == 0){
            0
        } else {
            if (n == 1) {
                1
            } else {
                fibonacci <| (n-1) + fibonacci <| (n-2)
            }
        }

    fibonacci <| 10 // result : 55
}
```
This code computes fibonacci sequence. Recursive functions defines its name in its captured environment. This is accomplished by fixed point combinator, used to define recursive functions without using mutable values.

