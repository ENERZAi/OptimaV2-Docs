# function `range`
__Header :__ `OptimaV2/Runtime/Utils/IterTools.h`

Creates a sequence of numbers that can be used in range-based for-loop replacing traditional for-loop.

Note that negative steps are not supported.

__Signature__
``` cpp
template <typename IndexT = int>
auto range(
    IndexT End
);
```
``` cpp
template <typename IndexT = int>
auto range(
    IndexT Begin,
    IndexT End
);
```
``` cpp
template <typename IndexT = int>
auto range(
    IndexT Begin,
    IndexT End,
    IndexT Step
);
```

| Parameters |   |
| ---------- | - |
| `IndexT`   | A type for index. Should be arithmetic type. |
| `Begin`    | Start value for index. |
| `End`      | Value to stop iterating. |
| `Step`     | Value to increase index at a time. |

__Usage__
``` cpp
// same usage as in python.         Same as
for (auto i : range(10))         // for (auto i = 0; i < 10; ++i)
    std::cout << i << std::endl; //     std::cout << i << std::endl;

for (auto i : range(1, 10))      // for (auto i = 1; i < 10; ++i)
    std::cout << i << std::endl; //     std::cout << i << std::endl;

for (auto i : range(0, 30, 2))   // for (auto i = 0; i < 30; i += 2)
    std::cout << i << std::endl; //     std::cout << i << std::endl;
```