class `BufferHolder`
===================
__Namespace :__ `optima_v2::runtime`  
__Header :__ `OptimaV2/Runtime/Tensor.h`

`BufferHolder` is a guard class that holds and releases tensor memory.

`BufferHolder` gets device memory, which represents actual memory representing a tensor, and holds it while the user accesses it. When `BufferHolder` leaves its scope, it automatically releases the device memory so the device can access its own memory. Due to its behavior, you should never copy or move this object around. Doing so may cause undefined behavior because the device cannot access or synchronize its memory while the object is alive.

!!! warning
    This function does not verify whether the user accesses memory outside of bounds.
    If you just want to copy data from/to the tensor, use [`Tensor::copyFrom`](tensor.md#function-copyFrom) or [`Tensor::copyTo`](tensor.md#function-copyTo).

## Members
### Destructor
__Signature__
``` cpp
~BufferHolder() noexcept;
```

### function `cast<T>()`
Cast raw memory pointer to pointer of desired type.

__Signature__
``` cpp
template <typename T>
T* cast();
```
``` cpp
template <typename T>
const T* cast() const;
```

| Parameters |   |
| ---------- | - |
| `T`        | Type to convert. |

!!! warning
    This function does not verify whether given type is same as or convertible to the actual type of the tensor. Use with caution.

### function `data()`
Get raw pointer of tensor memory.

__Signature__
``` cpp
void* data();
```
``` cpp
const void* data() const;
```
