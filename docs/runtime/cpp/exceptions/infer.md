exception `InferException`
============================
__Namespace :__ `optima_v2::runtime`  
__Header :__ `OptimaV2/Runtime/Exception.h`  
__Extends :__ [`Exception`](exception.md)

`InferException` represents an exception thrown when the runtime detected a fault while running inference.

## Members
### Constructor
Create a new `InferException`.

__Signature__
``` cpp
InferException(
    const std::string &Message
);
```
``` cpp
InferException(
    const char *Message
);
```

| Parameters |   |
| ---------- | - |
| `Message`  | a message to describe what cause the exception. |
