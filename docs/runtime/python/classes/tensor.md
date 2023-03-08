class `Tensor`
===================
__Package :__  `optima_v2.runtime`

Represents tensor of the model.

Unlike other frameworks, Optima Runtime does not allow user to create a tensor directly. Users should get tensors from [`get_input_tensor`](infer_request.md#method-get_input_tensor) or [`get_output_tensor`](infer_request.md/#method-get_output_tensor) methods defined in [`InferRequest`](infer_request.md).

## Members
### method `copy_from()`
Copy tensor data from `numpy.ndarray`.

__Signature__
``` python
def copy_from(
    self,
    data: numpy.ndarray
): ...
```

| Parameters |   |
| ---------- | - |
| `data`     | a source data for the tensor. |

__Raises__

- Any exceptions that inherit [`Exception`](../exceptions/exception.md) threw by the backend.
- `ValueError`
    - The shape does not match between the tensor and given `numpy.ndarray`
    - Given `numpy.ndarray` has more than 8 dimensions.
    - Given `numpy.ndarray` is not C-contiguous.
- `TypeError`: The type does not match between the tensor and given `numpy.ndarray`
- [`BackendException`](../exceptions/backend.md) : The backend threw an exception that was not handled.

### method `to_numpy()`
Copy tensor data to `numpy.ndarray`.

__Signature__
``` python
def to_numpy(
    self,
) -> numpy.ndarray: ...
```

__Raises__

- Any exceptions that inherit [`Exception`](../exceptions/exception.md) threw by the backend.
- [`BackendException`](../exceptions/backend.md) : The backend threw an exception that was not handled.

### property `name`
Get name of the tensor.

__Signature__
``` python
@property
def name(self) -> str: ...
```

### property `shape`
Get shape of the tensor.

__Signature__
``` python
@property
def shape(self) -> Tuple[int, ...]: ...
```

### property `type`
Get type of the tensor.

__Signature__
``` python
@property
def type(self) -> ElementType: ...
```

__See Also :__ [`ElementType`](../enums/element_type.md)

### property `size`
Get size of the tensor in bytes. Note that this property is readonly.

__Signature__
``` python
@property
def size(self) -> int: ...
```