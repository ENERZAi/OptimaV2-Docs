exception `InvalidOperationException`
============================
__Namespace :__ `optima_v2::runtime`  
__Header :__ `OptimaV2/Runtime/Exception.h`  
__Extends :__ [`Exception`](exception.md)

`InvalidOperationException` represents an exception thrown when user modify/update while the model is running.

## Members
### Constructor
Create a new `InvalidOperationException`.

__Signature__
``` cpp
InvalidOperationException(
    const std::string &Message
);
```
``` cpp
InvalidOperationException(
    const char *Message
);
```

| Parameters |   |
| ---------- | - |
| `Message`  | a message to describe what cause the exception. |
