class `Tensor`
===================
__Namespace :__ `optima_v2::runtime`  
__Header :__ `OptimaV2/Runtime/Tensor.h`

Represents tensor of the model.

Unlike other frameworks, Optima Runtime does not allow user to create a tensor directly. Users should get tensors from [`getInputTensor`](infer_request.md#function-getinputtensor) or [`getOutputTensor`](infer_request.md/#function-getoutputtensor) functions defined in [`InferRequest`](infer_request.md).

## Members
### Constructors
Create new `Tensor`. Internal usage only.

__Signature__
``` cpp
Tensor(
    const TensorInfo &Info,
    BufferPtr Buffer
);
```

### function `getBuffer()`
Get internal tensor memory.

!!! warning
    This function does not verify whether the user accesses memory outside of bounds. Using this function is discouraged unless you have to access internal tensor memory directly.

__Signature__
``` cpp
[[nodiscard]]
BufferHolder getBuffer();
```

__Throws__

- Any exceptions that inherit [`Exception`](../exceptions/exception.md) threw by the backend.
- [`BackendException`](../exceptions/backend.md) : The backend threw an exception that was not handled.

__See Also :__ [`BufferHolder`](buffer_holder.md)

### function `copyFrom()`
Copy `Source` to the tensor.

!!! warning
    This function does not verify whether given type is same as or convertible to the actual type of the tensor.
    Also, it does not verify whether `Source` refers valid memory address (only checks `Source` is nullptr).   
    Passing invalid pointer may cause undefined behavior or even application crash. Use with caution.

__Signature__
``` cpp
template <typename T>
void copyFrom(
    const T *Source,
    size_t Count,
    size_t From = 0
);
```
``` cpp
void copyFrom(
    const void *Source,
    size_t Bytes,
    size_t From = 0
);
```

| Parameters |   |
| ---------- | - |
| `T`        | Type of incomming buffer. |
| `Source`   | A pointer to incomming buffer. |
| `Count`    | Count of elements to copy. |
| `Bytes`    | Size of buffer in bytes to copy. |
| `From`     | Position to begin copy. |

__Throws__

- Any exceptions that inherit [`Exception`](../exceptions/exception.md) threw by the backend.
- [`BackendException`](../exceptions/backend.md) : The backend threw an exception that was not handled.
- `std::out_of_range` : `Count + From` (or `Bytes + From`) is grater than size of the tensor.

### function `copyTo()`
Copy data of the tensor to `Dest`.

!!! warning
    This function does not verify whether given type is same as or convertible to the actual type of the tensor.
    Also, it does not verify whether `Dest` refers valid memory address (only checks `Dest` is nullptr).  
    Passing invalid pointer may cause undefined behavior or even application crash. Use with caution.

__Signature__
``` cpp
template <typename T>
void copyTo(
    T *Dest,
    size_t Count,
    size_t From = 0
);
```
``` cpp
void copyTo(
    void *Dest,
    size_t Bytes,
    size_t From = 0
);
```

| Parameters |   |
| ---------- | - |
| `T`        | Type of outgoing buffer. |
| `Dest`     | A pointer to outgoing buffer. |
| `Count`    | Count of elements to copy. |
| `Bytes`    | Size of buffer in bytes to copy. |
| `From`     | Position to begin copy.  |

__Throws__

- Any exceptions that inherit [`Exception`](../exceptions/exception.md) threw by the backend.
- [`BackendException`](../exceptions/backend.md) : The backend threw an exception that was not handled.
- `std::out_of_range` : `Count + From` (or `Bytes + From`) is grater than size of the tensor.

### function `getName()`
Get name of the tensor.

__Signature__
``` cpp
[[nodiscard]]
const std::string &getName() const;
```

### function `getShape()`
Get shape of the tensor.

__Signature__
``` cpp
[[nodiscard]]
const Shape &getShape() const;
```

__See Also :__ [`Shape`](shape.md)

### function `getType()`
Get type of the tensor.

__Signature__
``` cpp
[[nodiscard]]
ElementType getType() const;
```

__See Also :__ [`ElementType`](../enums/element_type.md)

### function `getTensorSize()`
Get size of the tensor in bytes.

__Signature__
``` cpp
[[nodiscard]]
size_t getTensorSize() const;
```