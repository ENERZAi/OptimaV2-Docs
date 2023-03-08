class `InferRequest`
===================
__Package :__  `optima_v2.runtime`

`InferRequest` represents single inference.

In Optima, models and inferences are separated. This allows to user run multiple inferences on a single model and enables the runtime to reduce the usage of resources by sharing immutable data such as weights and pipelining those inferences to improve throughput.

## Members
### method `get_input_tensor()`
Get input tensor by its index or name.

__Signature__
``` python
@typing.overload
def get_input_tensor(
    self,
    index: int = 0
) -> Tensor: ...
```
``` python
@typing.overload
def get_input_tensor(
    self,
    name: str
) -> Tensor: ...
```

| Parameters |   |
| ---------- | - |
| `index`    | Index of the tensor. Defaults to 0. |
| `name`     | Name of the tensor.  |

__Raises__

- Any exceptions that inherit [`Exception`](../exceptions/exception.md) threw by the backend.
- `IndexError` : `index` is outside of the range.
- `ValueError` : `name` was not found in input tensors.
- [`BackendException`](../exceptions/backend.md) : The backend threw an exception that was not handled.

__See Also :__ [Tensor](tensor.md)

### property `input_tensor_count`
Get count of input tensors of the model. Note that this property is readonly.

__Signature__
``` python
@property
def input_tensor_count(self) -> int: ...
```

### property `input_tensors`
Get list of all input tensors of the model.

__Signature__
``` python
@property
def input_tensors(self) -> Sequence[Tensor]: ...
```

__Raises__

- Any exceptions that inherit [`Exception`](../exceptions/exception.md) threw by the backend.
- [`BackendException`](../exceptions/backend.md) : The backend threw an exception that was not handled.

__See Also :__ [Tensor](tensor.md)

### method `get_output_tensor()`
Get output tensor by its index or name.

__Signature__
``` python
@typing.overload
def get_output_tensor(
    self,
    index: int = 0
) -> Tensor: ...
```
``` python
@typing.overload
def get_output_tensor(
    self,
    name: str
) -> Tensor: ...
```

| Parameters |   |
| ---------- | - |
| `index`    | Index of the tensor. Defaults to 0. |
| `name`     | Name of the tensor.  |

__Raises__

- Any exceptions that inherit [`Exception`](../exceptions/exception.md) threw by the backend.
- `IndexError` : `index` is outside of the range.
- `ValueError` : `name` was not found in input tensors.
- [`BackendException`](../exceptions/backend.md) : The backend threw an exception that was not handled.

__See Also :__ [Tensor](tensor.md)

### property `output_tensor_count`
Get count of output tensors of the model. Note that this property is readonly.

__Signature__
``` python
@property
def output_tensor_count(self) -> int: ...
```

### property `output_tensors`
Get list of all output tensors of the model.

__Signature__
``` python
@property
def output_tensors(self) -> Sequence[Tensor]: ...
```

__Raises__

- Any exceptions that inherit [`Exception`](../exceptions/exception.md) threw by the backend.
- [`BackendException`](../exceptions/backend.md) : The backend threw an exception that was not handled.

__See Also :__ [Tensor](tensor.md)

### method `set_inputs()`
Set inputs in the request.

This method accepts single `numpy.ndarray`, list of `numpy.ndarray` or dictionary of `numpy.ndarray`.

Keys allowed in dictionary are:

- `int` : index of input tensor.
- `str` : name of input tensor.

__Signature__
``` python
@typing.overload
def set_inputs(
    self,
    tensor: numpy.ndarray
): ...
```
``` python
@typing.overload
def set_inputs(
    self,
    tensors: Sequence[numpy.ndarray]
): ...
```
``` python
@typing.overload
def set_inputs(
    self,
    tensors: Dict[str, numpy.ndarray]
): ...
```

__Raises__

- Any exceptions that inherit [`Exception`](../exceptions/exception.md) threw by the backend.
- `IndexError` : `index` is outside of the range.
- `ValueError`
    - `name` was not found in input tensors.
    - The request requires more than 1 tensor but got single `numpy.ndarray`.
    - Count is different between method input and input tensors.
    - The shape does not match between the tensor and given `numpy.ndarray`
    - Given `numpy.ndarray` has more than 8 dimensions.
    - Given `numpy.ndarray` is not C-contiguous.
- `TypeError`
    - Input value is not `numpy.ndarray`, list of `numpy.ndarray` nor dictionary of string and `numpy.ndarray`.
    - Keys in dictionary is not `int` nor `str`.
    - The type does not match between the tensor and given `numpy.ndarray`
- [`BackendException`](../exceptions/backend.md) : The backend threw an exception that was not handled.

### method `get_outputs()`
Get all outputs in the request in list.

This method returns list of `numpy.ndarray` rather than `Tensor`. This  


### method `set_callback()`
Register callback function that called when the inference finished. Note that the function overwrites previous registered callback.

__Signature__
``` python
def set_callback(
    self,
    callback: Union[Callable[[], None], Callable[[Any], None]],
    userdata: Optional[Any] = None
): ...
```

!!! warning
    It is known that there is memory leak due to circular reference when declare `rt.Context`, `rt.Model` and/or `rt.InferRequest` objects in global scope and refer any of those in the callback.
    You should avoid declare these objects in global scope to prevent these problem.

| Parameters |   |
| ---------- | - |
| `callback` | Callback function to register. |
| `userdata` | Any object for the data. Defaults is `None`. |

__Raises__

- [`InvalidOperationException`](../exceptions/invalid_operation.md) : Callback is updated while running the inference.

### method `infer()`
Start an inference. Note that this method is non-blocking method.

__Signature__
``` python
def infer(self): ...
```

__Raises__

- Any exceptions that inherit [`Exception`](../exceptions/exception.md) threw by the backend.
- [`BackendException`](../exceptions/backend.md) : The backend threw an exception that was not handled.
- [`InferException`](../exceptions/infer.md) : Failed to run inference.
- [`InvalidOperationException`](../exceptions/invalid_operation.md) : User starts inference while previous request running.

### method `wait()`
Wait until the inference finished or reached timeout. Returns `True` if the timeout reached and the request not finished.

This function may throw other exceptions not listed below if the backend throw an exception.

__Signature__
``` python
def wait(
    self,
    timeout: int = 0
) -> bool: ...
```

| Parameters |   |
| ---------- | - |
| `timeout`  | Maximum duration in milliseconds to block for. Defaults to 0(wait until finished). |

__Raises__

- Any exceptions that inherit [`Exception`](../exceptions/exception.md) threw by the backend.
- [`InferException`](../exceptions/infer.md) :  User waits the request that is not running.
- [`BackendException`](../exceptions/backend.md) : The backend threw an exception that is not handled.

### property `profile_data`
Get profile data measured during inference.

Note that the data is a data measured in latest `infer()` call. If the request was never called `infer()` function or is running, the function returns empty list.
Also, this property is readonly.

__Signature__
``` python
@property
def profile_data(self) -> Sequence[ProfileData]: ...
```

__Raises__

- Any exceptions that inherit [`Exception`](../exceptions/exception.md) threw by the backend.
- [`BackendException`](../exceptions/backend.md) : The backend threw an exception that was not handled.

__See Also :__ [ProfileData](../classes/profile_data.md)
