function `enumerate`
====================
__Header :__ `OptimaV2/Runtime/Utils/IterTools.h`

Enumerate the container with index.

__Signature__
``` cpp
template <typename ContainerT,
          typename IndexT = int>
auto enumerate(
    ContainerT &&Iterable,
    IndexT Start = 0
);
```

| Parameters |   |
| ---------- | - |
| `ContainerT` | A type of the container. |
| `IndexT` | A type of the index. Defaults to `int`. |
| `Iterable` | A container to iterate. |
| `Start` | Start value for increment to. Defaults to `0`. |

__Usage__
``` cpp

std::vector<std::string> Strings = { "a", "b", "c", "d" };
for (auto &&[Index, Value] : enumerate(Strings, 5))
    std::cout << "Index=" << Index << ", Value=" << Value << std::endl;

// output:
// Index=5, Value=a
// Index=6, Value=b
// Index=7, Value=c
// Index=8, Value=d
// Index=9, Value=e
```