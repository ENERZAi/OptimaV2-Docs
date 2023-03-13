exception `Exception`
============================
__Namespace :__ `optima_v2::runtime`  
__Header :__ `OptimaV2/Runtime/Exception.h`  
__Extends :__ `std::runtime_error`

`Exception` is base exception class for every exceptions that are thrown in the runtime.

## Members
### Constructor
Create a new `Exception`.

__Signature__
``` cpp
Exception(
    const std::string &Message
);
```
``` cpp
Exception(
    const char *Message
);
```

| Parameters |   |
| ---------- | - |
| `Message`  | a message to describe what cause the exception. |
