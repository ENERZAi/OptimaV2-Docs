class `Model`
===================
__Package :__  `optima_v2.runtime`

`Model` represents a model compiled by Optima.

## Members
### method `create_request()`
Create a new `InferRequest`.

__Signature__
``` python
def create_request(self) -> InferRequest: ...
```

__Raises__

- Any exceptions that inherit [`Exception`](../exceptions/exception.md) threw by the backend.
- [`BackendException`](../exceptions/backend.md) : The backend threw an exception that was not handled.

__See Also :__ [InferRequest](infer_request.md)

### method `get_input_tensor_info()`
Get information of input tensor from its index or name.

__Signature__
``` python
@typing.overload
def get_input_tensor_info(
    self,
    index: int = 0
) -> TensorInfo: ...
```
``` python
@typing.overload
def get_input_tensor_info(
    self,
    name: str
) -> TensorInfo: ...
```

| Paramters |   |
| --------- | - |
| `index`   | Index of the tensor. Defaults to 0. |
| `name`    | Name of the tensor. |

__Raises__

- `IndexError` : `index` was outside of ranges.
- `ValueError` : `name` was not found in input tensors.

__See Also :__ [TensorInfo](../classes/tensor_info.md)

### property `input_tensor_count`
Get count of input tensors. Note that this property is readonly.

__Signature__
``` python
@property
def input_tensor_count(self) -> int: ...
```

### property `input_tensors_info`
Get list of information of input tensors. Note that this property is readonly.

__Signature__
``` python
@property
def input_tensors_info(self) -> Sequence[TensorInfo]: ...
```

__See Also :__ [TensorInfo](../classes/tensor_info.md)

### method `get_output_tensor_info()`
Get information of output tensor from its index or name.

__Signature__
``` python
@typing.overload
def get_output_tensor_info(
    self,
    index: int = 0
) -> TensorInfo: ...
```
``` python
@typing.overload
def get_output_tensor_info(
    self,
    name: str
) -> TensorInfo: ...
```

| Paramters |   |
| --------- | - |
| `index`   | Index of the tensor. Defaults to 0. |
| `name`    | Name of the tensor. |

__Raises__

- `IndexError` : `index` was outside of ranges.
- `ValueError` : `name` was not found in output tensors.

__See Also :__ [TensorInfo](../classes/tensor_info.md)

### property `output_tensor_count`
Get count of output tensors. Note that this property is readonly.

__Signature__
``` python
@property
def output_tensor_count(self) -> int: ...
```

### property `output_tensors_info`
Get list of information of output tensors. Note that this property is readonly.

__Signature__
``` python
@property
def output_tensors_info(self) -> Sequence[TensorInfo]: ...
```

__See Also :__ [TensorInfo](../classes/tensor_info.md)


### property `subgraph_info`
!!! note
    Not implemented.

__Signature__
``` python
@property
def subgraph_info(self) -> Any: ...
```