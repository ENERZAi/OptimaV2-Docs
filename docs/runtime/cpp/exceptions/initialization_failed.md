exception `InitializationFailedException`
============================
__Namespace :__ `optima_v2::runtime`  
__Header :__ `OptimaV2/Runtime/Exception.h`  
__Extends :__ [`Exception`](exception.md)

`InitializationFailedException` represents an exception thrown when the backend failed to initialize its own subsystem.

## Members
### Constructor
Create a new `InitializationFailedException`.

__Signature__
``` cpp
InitializationFailedException(
    const std::string &Message
);
```
``` cpp
InitializationFailedException(
    const char *Message
);
```

| Parameters |   |
| ---------- | - |
| `Message`  | a message to describe what cause the exception. |
