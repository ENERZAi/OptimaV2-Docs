# function `throwFormat`
__Namespace :__ `optima_v2::runtime`  
__Header :__ `OptimaV2/Runtime/Exception.h`

Convenient function for formatting message and throwing exception at once.

__Signature__
``` cpp
template <typename ExceptionT,
          typename... ArgsT>
[[noreturn]]
void throwFormat(
    std::string_view Format,
    ArgsT... &&Args
);
```

| Paramters |   |
| --------- | - |
| `ExceptionT` | A type of the exception to throw. |
| `ArgsT` | Type parameter list of arguments. |
| `Format` | A string to be formatted. |
| `Args` | Parameter list for formatting string. |

__Usage__
``` cpp

void doSomething(int Index) {
    if (Index > 10)
        throwFormat<std::out_of_range>(
            "expected less than 10 but got {}.", Index);
}

```

__See Links :__ [fmt::format Syntax](https://fmt.dev/latest/syntax.html), [std::format Syntax](https://en.cppreference.com/w/cpp/utility/format/format)