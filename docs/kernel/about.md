# Introduction to Opto programming language

Opto language is custom language integerated in OptimaV2. It is designed for everyone to build their own version of layer, and maximize scalability and flexibility of Optima project.

## What Opto can bring us

* __Performance__
    * Opto can generate performance-optimized code with consideration of model hyperparameters and target hardware
* __Flexibility & Scalability__
    * Opto language can support unlimited range of layers, even if it is not yet supported by famous frameworks such as pytorch or tensorflow. You can design your own layer.
* __Usability__
    * Everyone can easily understand the concept and language features once they are familiar with concept of functional programming. Functional programming is reliable, concise and safe way to write safe and reliable kernel. 


### Why we designed Opto?
The most important purpose of OptimaV2 is being fast, while preserving flexibilty, and friendly to users. When we consider flexibility, We were required to widen the scope of supported layers as much as possible. However, writing single layer takes lots of effort. The algorithm needs to be fast, while scalable to various hardware. Moreover, suitable algorithm can be different depending on layer hyperparameters (Consider optimizing conv2d layer with input of 10x10 image with lots of channels, and same layer with 4k input with only 3 channels. Optimization strategy should be different). This forces us to write multiple version of the same layer.

The Opto language is designed to reduce the effort here. By writing just one opto code for each layer, Opto compiler will consider the hyperparameters and hardware restrictions to produce code that matches the requirements. The language is designed to be concise, and flexible so everyone can write their own layers with minimum effort, allowing support for any kind of operation on wide range of hardwares.

### Concept 
Opto language uses concept called 'Metaprogramming' to achieve flexibiliy between hyperparameters. In other words, it generates suitable code using the given hyperparameters, which is static in inference time. We can express which algorithm to select, or which code block to use using hyperparameters, or we can pre-compute some portion of the kernel if it is 'static' during the inference time.


### Support
Opto language is in early state, and is in fast cycle of development and feature updates. So keep in mind there can be uncaught problems and inconvenience for now. You can always post your opinions and report bugs on our youtrack page.
