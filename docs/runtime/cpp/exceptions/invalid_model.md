exception `InvalidModelException`
============================
__Namespace :__ `optima_v2::runtime`  
__Header :__ `OptimaV2/Runtime/Exception.h`  
__Extends :__ [`Exception`](exception.md)

`InvalidModelException` represents an exception thrown when the model is invalid.

## Members
### Constructor
Create a new `InvalidModelException`.

__Signature__
``` cpp
InvalidModelException(
    const std::string &Message
);
```
``` cpp
InvalidModelException(
    const char *Message
);
```

| Parameters |   |
| ---------- | - |
| `Message`  | a message to describe what cause the exception. |
