Typedef `InferRequestCallback`
======================

__Namespace :__ `optima_v2::runtime`  
__Header :__ `OptimaV2/Runtime/InferRequest.h`

`InferRequestCallback` represents a callback function called when the inference was finished.

If the inference is finished and the value of `std::exception_ptr` is `nullptr`, it represents the inference was finished without error.
Otherwise, the value of `std::exception_ptr` is caught exception during inference.

__Signature__
``` cpp
using InferRequestCallback = std::function<void(std::exception_ptr)>;
```
