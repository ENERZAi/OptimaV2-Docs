class `InferRequest`
===================
__Namespace :__ `optima_v2::runtime`  
__Header :__ `OptimaV2/Runtime/InferRequest.h`

`InferRequest` represents single inference.

In Optima, models and inferences are separated. This allows to user run multiple inferences on a single model and enables the runtime to reduce the usage of resources by sharing immutable data such as weights and pipelining those inferences to improve throughput.

!!! note
    Because `InferRequest` is unique per model, `InferRequest` is non-copyable. `std::move` should be used when moving the object.

## Members
### Constructors
Initialize empty `InferRequest`.

__Signature__
``` cpp
InferRequest() = default;
```

<hr>

Creates new `InferRequest` object. Internal usage only.

__Signature__
``` cpp
InferRequest(
    detail::ModeDetail *Model,
    uint32_t ID
);
```

### Constant `InvalidRequestID`
Represents invalid inference request. Internal usage only.

__Signature__
``` cpp
constexpr auto InvalidRequestID = std::numeric_limits<uint32_t>::max();
```

### function `getInputTensor()`
Get input tensor by its index or name.

__Signature__
``` cpp
[[nodiscard]]
Tensor getInputTensor(
    uint32_t Index = 0
);
```
``` cpp
[[nodiscard]]
Tensor getInputTensor(
    const std::string &Name
);
```

| Parameters |   |
| ---------- | - |
| `Index`    | Index of the tensor. Defaults to 0. |
| `Name`     | Name of the tensor.  |

__Throws__

- Any exceptions that inherit [`Exception`](../exceptions/exception.md) threw by the backend.
- `std::out_of_range` : `Index` got out of range.
- `std::invalid_argument` : `Name` was not found in input tensors.
- [`BackendException`](../exceptions/backend.md) : The backend threw an exception that was not handled.

__See Also :__ [Tensor](tensor.md)

### function `getInputTensorCount()`
Get count of input tensors of the model.

__Signature__
``` cpp
[[nodiscard]]
uint32_t getInputTensorCount() const;
```

### function `getInputTensors()`
Get list of all input tensors of the model.

__Signature__
``` cpp
[[nodiscard]]
std::vector<Tensor> getInputTensors()
```

__Throws__

- Any exceptions that inherit [`Exception`](../exceptions/exception.md) threw by the backend.
- [`BackendException`](../exceptions/backend.md) : The backend threw an exception that was not handled.

__See Also :__ [Tensor](tensor.md)

### function `getOutputTensor()`
Get output tensor by its index or name.

__Signature__
``` cpp
[[nodiscard]]
Tensor getOutputTensor(
    uint32_t Index = 0
);
```
``` cpp
[[nodiscard]]
Tensor getOutputTensor(
    const std::string &Name
);
```

| Parameters |   |
| ---------- | - |
| `Index`    | Index of the tensor. Defaults to 0. |
| `Name`     | Name of the tensor.  |

__Throws__

- Any exceptions that inherit [`Exception`](../exceptions/exception.md) threw by the backend.
- `std::out_of_range` : `Index` got out of range.
- `std::invalid_argument` : `Name` was not found in input tensors.
- [`BackendException`](../exceptions/backend.md) : The backend threw an exception that was not handled.

__See Also :__ [Tensor](tensor.md)

### function `getOutputTensorCount()`
Get count of output tensors of the model.

__Signature__
``` cpp
[[nodiscard]]
uint32_t getOutputTensorCount() const;
```

### function `getOutputTensors()`
Get list of all output tensors of the model.

``` cpp
[[nodiscard]]
std::vector<Tensor> getOutputTensors();
```

__Throws__

- Any exceptions that inherit [`Exception`](../exceptions/exception.md) threw by the backend.
- [`BackendException`](../exceptions/backend.md) : The backend threw an exception that was not handled.

__See Also :__ [Tensor](tensor.md)

### function `setCallback()`
Register callback function that called when the inference finished. Note that the function overwrites previous registered callback.

__Signature__
``` cpp
void setCallback(
    InferRequestCallback Callback
);
```

| Parameters |   |
| ---------- | - |
| `Callback`    | Callback function to register. |

__Throws__

- [`InvalidOperationException`](../exceptions/invalid_operation.md) : Callback is updated while running the inference.

__See Also :__ [InferRequestCallback](../typedefs/infer_request_callback.md)

### function `infer()`
Start an inference. Note that this function is non-blocking function.

__Signature__
``` cpp
void infer();
```

__Throws__

- Any exceptions that inherit [`Exception`](../exceptions/exception.md) threw by the backend.
- [`BackendException`](../exceptions/backend.md) : The backend threw an exception that was not handled.
- [`InferException`](../exceptions/infer.md) : Failed to run inference.
- [`InvalidOperationException`](../exceptions/invalid_operation.md) : User starts inference while previous request running.

### function `wait()`
Wait until the inference finished or reached timeout. Returns `true` if the timeout reached and the request not finished.

This function may throw other exceptions not listed below if the backend throw an exception.

__Signature__
``` cpp
bool wait(
    std::chrono::milliseconds Timeout = std::chrono:milliseconds(0)
);
```

| Parameters |   |
| ---------- | - |
| `Timeout`  | Maximum duration to block for. Defaults to 0(wait until finished). |

__Throws__

- Any exceptions that inherit [`Exception`](../exceptions/exception.md) threw by the backend.
- [`InferException`](../exceptions/infer.md) :  User waits the request that is not running.
- [`BackendException`](../exceptions/backend.md) : The backend threw an exception that is not handled.

### function `getProfileData()`
Get profile data measured during inference.

Note that the data is a data measured in latest `infer()` call. If the request was never called `infer()` function or is running, the function returns empty list.

__Signature__
``` cpp
[[nodiscard]]
std::vector<ProfileData> getProfileData() const;
```

__Throws__

- Any exceptions that inherit [`Exception`](../exceptions/exception.md) threw by the backend.
- [`BackendException`](../exceptions/backend.md) : The backend threw an exception that was not handled.

__See Also :__ [ProfileData](../structs/profile_data.md)