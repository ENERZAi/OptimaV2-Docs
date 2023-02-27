# Basics

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