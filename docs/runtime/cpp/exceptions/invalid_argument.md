exception `InvalidArgumentException`
============================
__Namespace :__ `optima_v2::runtime`  
__Header :__ `OptimaV2/Runtime/Exception.h`  
__Extends :__ [`Exception`](exception.md)

`InvalidArgumentException` represents an exception that indicates something wrong argument is provided by user.

## Members
### Constructor
Create a new `InvalidArgumentException`.

__Signature__
``` cpp
InvalidArgumentException(
    const std::string &Message
);
```
``` cpp
InvalidArgumentException(
    const char *Message
);
```

| Parameters |   |
| ---------- | - |
| `Message`  | a message to describe what cause the exception. |
