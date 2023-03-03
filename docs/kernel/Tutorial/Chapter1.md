# Chapter 1. Basic concepts

This document wil guide you to write your first layer in Opto language. At the end, you will complete writing a kernel that implements complete layer in machine learning tasks.

### Starting point
We start from the following code, which is basic template for generating layer. 

```
template<//>
module tutorial(){
    // Body expression
    !{0}
}
```
Don't forget primary purpose of opto language is to generate suitable runtime code that can execute the layer.
This code will generate a runtime code that receives zero arguments, and returns int32 value in runtime. From now on, let's inspect how it works, starting from the 'Module'.

## Module
Module is the basic building block of the layer in Opto language.
When you define a module, you define a 'layer' in Optima.

This code snippet describes how you can define and write a 'module'
```
template</arg : type, .../>
module fold_list(arg : type, ...){
    // Code block goes here
    // Code block must return runtime expression
}

```
What you can observe here can be divided into three parts.

1. template</... />
      * List of 'static' arguments. In other words, hyperparameters. Static arguments do not change during the inference. Therefore, they are evaluated in compile time.
2. module 'name' (...)
      * List of 'dynamic' arguments. Dynamic arguments are evaluated during the inference. Therefore, they cannot be determined in compile time. However, they are evaluated in runtime (during the inference).
3. body
     * The implementation of the kernel goes here. Body can be composed of both compile time, and runtime expressions. But body expressions must return runtime expression at the end.

Hmm.. Compile time, runtime, expresssions.. what?? 
Hold it for a second. Let me explain what they are.

__Expression__ is how we 'express' the behavior of the program. Every code we write is an 'expression'. Expression is basic building block of the program. We can do arithmetics, save or load values, or write functions by composing expressions, which builds up to another expression. When we 'evaluate' an expression, we end up executing the program.
For example, Here is a simple expression that adds two values in opto.
```
let a = 1 + 2 // expression
a // returns 3
```
Here, the number 1, 2, and symbol 'a' are all expression. These expressions are composed together, and builds bigger expression such as (1 + 2). Now, they build up again, and end up composing the full expression, which is the program itself.
When we evaluate this, we get '3', which is the result of the addition.


__Compile time expression__ represents expressions that are evaluated in compile time. Since it is evaluated in compile time by the compiler, we can only compute with pre-defined hyperparameters. Such as input size, output size, or pre-trained weights. In opto language, compile time expressions are used to build 'runtime expression', which is described below.

__Runtime expression__ represents expressions that are evaluated in infernce time, from the target. Since they are evaluated in inference time, it is best to make runtime expression 'efficient'. Therefore, we should avoid putting unnecessary computations in runtime expression. If compuatations could be done in compile time, it's better choice to delegate it to compile time expression.

We've gone through basic concepts used in Opto language. Now it's time to see how they are mixed together to generate code used for inference.

### Embedding runtime expressions in compile time
In opto, bracket starting with '!' means runtime code block. Which means, code inside !{} bracket is runtime code, which cannot be evaluated during compile time. In compile time, runtime code is treated just like a 'value'. Therefore, we can do something like this.

```
template</selection : idx/>
module tutorial(){
    // Body expression
    let runtimeCodes = [!{0}, !{1}, !{let a = 2 \n a + 3}]
    runtimeCodes[selection]
}

```
This code defines a with list of three runtime code blocks as a list, and receives compile time argument 'selection'. According to the value of 'selection', this code will generate runtime code that 'selection' variable points to. That is, if selection is zero, the generated code will be exactly same as what we saw above. However, if selection equals '2', generated runtime code will look like this.

```fsharp
// Runtime code output
module tutorial(){
    let a = 2
    a + 3
}
```

We can see that 3rd argument (which is 2 in index) is the output of the code.

### Embedding compile time expressions in compile time
Sometimes, we might want to use value evaluated in compile time in runtime. To provide solution for this, opto language provides compile time code block. It is pretty much similar with runtime code block in compile time code. However, we start '$' sign instead of '!'. In other words, we can use ${} to express compile time code block in runtime. We can put any compile time code inside ${}. Despite ${} block is embedded in runtime code, it will be evaluated in compile time.

```
template</selection : idx, valueToAdd : int32/>
module tutorial(){
    // Body expression
    let runtimeCodes = [!{0}, !{1}, !{let a = 2 \n a + ${valueToAdd}}]
    runtimeCodes[selection]
}
```
Here is the use case of compile time code block in runtime code. We want to use 'valueToAdd' variable in runtime, which is given as compile time parameter (which is static in runtime). we can simply use ${} and put 'valueToAdd' inside. Then, 'valueToAdd' variable will be evaluated, and embedded as runtime code output.
The following is result of the above code when 'selection' was '2', and 'valueToAdd' was '4'

```
module tutorial(){
    let a = 2
    a + 4
}
```
Do you see how it works? The value '4' (which was the compile time value) is embedded inside runtime code.

We can put any expression that can be converted into runtime code inside compile time code block. Following still works.

```
template</selection : idx, valueToAdd : int32/>
module tutorial(){
    // Body expression
    let runtimeCodes = [!{0}, !{1}, !{
        // runtime code block
        let a = 2 \n a + ${
            // Compile time code block
            let multiplied = valueToAdd*4
            multiplied % 3 
        }}]
    runtimeCodes[selection]
}
```

Now we multiplied 'valueToAdd' with 4, and returned remainder after dividing by '3'. if 'valueToAdd' was for, this code will add '0', since evaluated value of (4*3)%3 is '0'

```
module tutorial(){
    let a = 2
    a + 0
}
```

Therefore, compile time code block, and runtime code block can be recursively nested. This extends capability of opto. You can maximize your creativity to write new layer!