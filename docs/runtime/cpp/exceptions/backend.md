exception `BackendException`
============================
__Namespace :__ `optima_v2::runtime`  
__Header :__ `OptimaV2/Runtime/Exception.h`  
__Extends :__ [`Exception`](exception.md)

`BackendException` represents an exception thrown when the runtime caught exception that is thrown and not handled properly in the backend.

## Members
### Constructor

__Signature__
``` cpp
BackendException(
    std::string Name,
    std::exception_ptr Error
);
```

| Parameters |   |
| ---------- | - |
| `Name`     | a name of the backend which does not handle error properly. |
| `Error`    | a `std::exception_ptr`. |

### function `getBackendName()`
Get name of the backend which cause the exception.

__Signature__
``` cpp
[[nodiscard]]
std::string_view getBackendName() const;
```

### function `getUncaughtException()`
Get a `std::exception_ptr` that is not handled by the backend.

__Signature__
``` cpp
[[nodiscard]]
std::exception_ptr getUncaughtException() const;
```
