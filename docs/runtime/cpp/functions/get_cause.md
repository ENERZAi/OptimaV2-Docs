function `getCause`
===================
__Namespace :__ `optima_v2::runtime`  
__Header :__ `OptimaV2/Runtime/Exception.h`

Get cause message from `std::exception_ptr`.

It can gather message from exceptions that inherit `std::exception` or values from `std::string` or `const char*`. Other exceptions are returned as `"unknown cause"`.

__Signature__
``` cpp
std::string_view getCause(
    std::exception_ptr Error
);
```

| Parameters |   |
| ---------- | - |
| `Error`    | An error to extract cause message. |

__Usage__
``` cpp
try {
    // do something that may throw
} catch (...) {
    auto Ex = std::current_exception();
    std::cerr << "function threw an exception: " << getCause(Ex) << std::endl;
}
```