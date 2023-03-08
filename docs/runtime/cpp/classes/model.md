class `Model`
===================
__Namespace :__ `optima_v2::runtime`  
__Header :__ `OptimaV2/Runtime/Model.h`

`Model` represents a model compiled by Optima.

## Members
### Constructors
Create a empty model.

``` cpp
Model();
```

<hr>

Create new `Model`. Internal usage only.
``` cpp
Model(
    std::unique_ptr<detail::ModelDetail> Detail
);
```

### Destructor

__Signature__
``` cpp
~Model() noexcept;
```

### Constant `IndexNotFound`
Sentinel value that represents cannot find tensor index by its name.

__Signature__
``` cpp
constexpr auto IndexNotFound = static_cast<uint32_t>(-1);
```

### function `createRequest()`
Create a new `InferRequest`.

__Signature__
``` cpp
[[nodiscard]]
InferRequest createRequest();
```

__Throws__

- Any exceptions that inherit [`Exception`](../exceptions/exception.md) threw by the backend.
- [`BackendException`](../exceptions/backend.md) : The backend threw an exception that was not handled.

__See Also :__ [InferRequest](infer_request.md)

### function `getInputTensorInfo()`
Get information of input tensor from its index or name.

__Signature__
``` cpp
[[nodiscard]]
const TensorInfo& getInputTensorInfo(
    uint32_t Index = 0
) const;
```
``` cpp
[[nodiscard]]
const TensorInfo &getInputTensorInfo(
    const std::string &Name
) const;
```

| Paramters |   |
| --------- | - |
| `Index`   | Index of the tensor. |
| `Name`    | Name of the tensor. |

__Throws__

- `std::out_of_range` : `Index` was outside of ranges.
- `std::invalid_argument` : `Name` was not found in input tensors.

__See Also :__ [TensorInfo](../structs/tensor_info.md)

### function `getInputTensorCount()`
Get count of input tensors.

__Signature__
``` cpp
[[nodiscard]]
uint32_t getInputTensorCount() const;
```

### function `getInputIndexByName()`
Get index of the input tensor from its name. Returns [`IndexNotFound`](#constant-indexnotfound) if cannot find the tensor by the name.

__Signature__
``` cpp
[[nodiscard]]
uint32_t getInputIndexByName(
    const std::string &Name
) const;
```

| Parameters |   |
| ---------- | - |
| `Name`     | Name of the tensor to get index. |

### function `getOutputTensorInfo()`
Get information of output tensor from its index or name.

__Signature__
``` cpp
[[nodiscard]]
const TensorInfo& getOutputTensorInfo(
    uint32_t Index = 0
) const;
```
``` cpp
[[nodiscard]]
const TensorInfo &getOutputTensorInfo(
    const std::string &Name
) const;
```

| Paramters |   |
| --------- | - |
| `Index`   | Index of the tensor. |
| `Name`    | Name of the tensor. |

__Throws__

- `std::out_of_range` : `Index` got out of range.
- `std::invalid_argument` : `Name` was not found in output tensors.

__See Also :__ [TensorInfo](../structs/tensor_info.md)

### function `getOutputTensorCount()`
Get count of output tensors.

__Signature__
``` cpp
[[nodiscard]]
uint32_t getOutputTensorCount() const;
```

### function `getOutputIndexByName()`
Get index of the output tensor from its name. Returns [`IndexNotFound`](#constant-indexnotfound) if cannot find the tensor by the name.

__Signature__
``` cpp
[[nodiscard]]
uint32_t getOutputIndexByName(
    const std::string &Name
) const;
```

| Parameters |   |
| ---------- | - |
| `Name`     | Name of the tensor to get index. |

### function `getSubgraphInfo()`
!!! note
    Not implemented.

__Signature__
``` cpp
[[nodiscard]]
std::vector<std::pair<std::string_view, int>> getSubgraphInfo() const;
```