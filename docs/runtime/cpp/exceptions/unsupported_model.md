exception `UnsupportedModelException`
============================
__Namespace :__ `optima_v2::runtime`  
__Header :__ `OptimaV2/Runtime/Exception.h`  
__Extends :__ [`Exception`](exception.md)

`UnsupportedModelException` represents an exception thrown when the model requires unsupported framework and/or device.

## Members
### Constructor
Create a new `UnsupportedModelException`.

__Signature__
``` cpp
UnsupportedModelException(
    const std::string &Message
);
```
``` cpp
UnsupportedModelException(
    const char *Message
);
```

| Parameters |   |
| ---------- | - |
| `Message`  | a message to describe what cause the exception. |
