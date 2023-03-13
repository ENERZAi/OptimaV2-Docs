exception `OutOfResourceException`
============================
__Namespace :__ `optima_v2::runtime`  
__Header :__ `OptimaV2/Runtime/Exception.h`  
__Extends :__ [`Exception`](exception.md)

`OutOfResourceException` represents an exception thrown when the runtime failed to allocate resource.

## Members
### Constructor
Create a new `OutOfResourceException`.

__Signature__
``` cpp
OutOfResourceException(
    const std::string &Message
);
```
``` cpp
OutOfResourceException(
    const char *Message
);
```

| Parameters |   |
| ---------- | - |
| `Message`  | a message to describe what cause the exception. |
