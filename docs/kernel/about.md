# Introduction to Opto programming language

Opto language is custom language for OptimaV2, designed to let you create any type of layer you wish, while preserving inference performance and human readability.
Most of layers used in OptimaV2 is implemented using Opto. You can even design your own kernel and add it to OptimaV2 using Opto. Opto is one of the key feature of OptimaV2, providing scalability and flexibility while preserving fast performance and human readability.

Opto is designed to be 
1. Easy to understand, write layers
2. Simple and concise
3. Difficult to make mistakes

## What Opto can bring us

* __Performance__
    * Opto can generate performance-optimized code with consideration of model hyperparameters and target hardware.
* __Flexibility & Scalability__
    * Opto language can support unlimited range of layers, even if it is not yet supported by famous frameworks such as pytorch or tensorflow. You can design your own layer.
* __Usability__
    * Everyone can easily understand the concept and language features once they are familiar with concept of functional programming. Functional programming is reliable, concise and safe way to write safe and reliable kernel. 


### Why we designed Opto?
The most important purpose of OptimaV2 is being fast, while preserving flexibilty, and friendly to users. When we consider flexibility, we were required to widen the scope of supported layers as much as possible. However, writing single layer takes lots of effort. The algorithm needs to be fast, while scalable to various hardware. Moreover, suitable algorithm can be different depending on layer hyperparameters (Consider optimizing conv2d layer with input of 10x10 image with lots of channels, and same layer with 4k input with only 3 channels. Optimization strategy should be different). This forces us to write multiple version of the same layer.

The Opto language is designed to reduce the effort here. By writing just one opto code for each layer, Opto compiler will consider the hyperparameters and hardware restrictions to produce code that matches the requirements. The language is designed to be concise, and flexible so everyone can write their own layers with minimum effort, allowing support for any kind of operation on wide range of hardwares.

### Concept 
Opto language uses concept called 'Metaprogramming' to achieve flexibiliy between hyperparameters. In other words, it generates suitable code using the given hyperparameters, which is static in inference time. We can express which algorithm to select, or which code block to use using hyperparameters, or we can pre-compute some portion of the kernel if it is 'static' during the inference time.

### Functional programming 
Opto achieves these with concept called 'functional programming'. Which means, program is constructed by applying and composing functions. Therefore, Opto code is deterministic (for most cases) and prevents errors from side effects from mutable variables or memory errors from its design.

If you are new to functional programming, this concept might not familiar to you. But once you start writing in functional language such as Opto, You will feel its true horsepower.

### Current status & Support

Until now, Opto language has come far way. However, Opto is still in development phase. Therefore, there can be potential bugs or imcomplete features. Here are some features and enhanvements that is yet to come, but is under its way.

1. Hindly milner type inference
2. Runtime print statements and debugging functions
3. Compile time interpreter performance improvements

We have [Issue tracker](http://remote.enerzai.com:18080/issues) for tracking bugs and errors in Opto and OptimaV2. You can observe bugs that should be fixed, or if you find one, please report them on our issue tracker with how we can reproduce it, or you can contact us directly to Optima team.
