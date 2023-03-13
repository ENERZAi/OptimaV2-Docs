# How to read this tutorial

This tutorial is designed to help you getting used to opto language. This is not a reference page that contains every information of Opto, but is written in human-friendly way to guide you understand and start using the Opto.

I recommend you start from the beginning (Basic concepts) since starts building up language concepts from the first chapter. All language features will be explained before chapter 7, but I highly recommend you going through chapter 7 to see how Opto comes into play in real world.


## Concepts that may help before reading
  
* [Functional programming](https://www.geeksforgeeks.org/functional-programming-paradigm/)
* [Expression in programming language](https://www.geeksforgeeks.org/what-is-an-expression-and-what-are-the-types-of-expressions/) 
* [Metaprogramming](https://en.wikipedia.org/wiki/Metaprogramming)


## Index

1. **Chapter 1 (Basic concepts)** describes basic concepts you need to understand to use opto language.
2. **Chapter 2 (Understanding compile-time language features)** explains using basic functionalities in Opto such as let bindings, lists, tuples and type casting.
3. **Chapter 3 (Functions (Closures))** dives into functions in Opto. It will tell you how functions are constructed, and how they are composed together.
4. **Chapter 4 (Managing control flow)** Explains how control flow is used in Opto. It explains if/else statement, throwing exceptions, and print statements.
5. **Chapter 5 (Runtime expressions)** Explains runtime expressions. It compares runtime expressions to compile time expressions, and gives you understanding of how it can come together with compile time expressions.
6. **Chapter 6 (Helper functions)** Gives you list of builtin helper functions that can be used in Opto. Helper functions can be very useful when we write complex kernels.
7. **Chapter 7 (Putting it all together)** Puts all concepts explained in previous chapters, and explains the process by writing 'add.opto' kernel that adds two tensors element-wise.


## Opto Python API

We provide you opto compiler API with OptimaV2 package for testing your opto kernel implementation before we integrate it in your project. You can use this API to follow the steps in the tutorial.

You can start using it by importing opto in optima_v2 package
```python
from optima_v2 import opto
```

Now, we can define opto instance as follows
```python 
from optima_v2 import opto

layer = opto.OptoLayerInstance("example", "<fill path to your opto code>", "<fill path to desired output directory")
layer.add_param("name", opto.Number(3.14, opto.NumberType.F64))
layer.compile(3) # Lowers down to mlir llvm dialect
```

* **optoLayerInstance** 
  
    Defines opto layer instance. This object manages opto kernel itself, parameters, and compilation process.

* **add\_param(name, argument)**
  
    Gives template argument to the layer. Arguments added by add_param will be passed to opto code implementation.

* **compile(level)**
  
    Compiles the opto kernel with given template arguments. Level parameter is integer in range [0, 3]. It determines lowering level of the kernel. If 0, it will output the original code itself. If 1, it will output runtime code. If 2, it will output mlir dialect with custom dialect defined in OptimaV2. If 3, it will be lowered to mlir llvm dialect.

You can use this to see if your code is successfully converted by Opto compiler.
