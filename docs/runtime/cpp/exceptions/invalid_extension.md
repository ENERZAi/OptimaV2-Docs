exception `InvalidExtensionException`
============================
__Namespace :__ `optima_v2::runtime`  
__Header :__ `OptimaV2/Runtime/Exception.h`  
__Extends :__ [`Exception`](exception.md)

`InvalidExtensionException` represents an exception thrown when the runtime detects a extension is misconfigured.

## Members
### Constructor
Create a new `InvalidExtensionException`.

__Signature__
``` cpp
InvalidExtensionException(
    const std::string &Message
);
```
``` cpp
InvalidExtensionException(
    const char *Message
);
```

| Parameters |   |
| ---------- | - |
| `Message`  | a message to describe what cause the exception. |
