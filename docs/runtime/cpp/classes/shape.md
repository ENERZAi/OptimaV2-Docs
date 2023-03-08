class `Shape`
===================
__Namespace :__ `optima_v2::runtime`  
__Header :__ `OptimaV2/Runtime/Shape.h`

`Shape` represents shape of the tensor.

## Members
### Constant `MaxDimensions`
Max dimension size of the shape. Limited to 8 dimensions.

__Signature__
``` cpp
constexpr size_t MaxDimensions = 8;
```

### Typedef `ShapeT`
Defines a type of dimension values. Currently fixed to `uint32_t`.

__Signature__
``` cpp
using ShapeT = uint32_t;
```

### Typedef `value_type`
Defines a type of elements in the container. Required for range-based for-loop.

__Signature__
``` cpp
using value_type = ShapeT;
```

### Typedef `const_iterator`
Defines a type of iterator of the container. Required for range-based for-loop.

__Signature__
``` cpp
using const_iterator = std::array<ShapeT, MaxDimensions>::const_iterator;
```

### Constructors
Create empty `Shape`.

__Signature__
``` cpp
Shape() = default;
```

<hr>

Create `Shape` from variadic paramters. Count of parameters should be less than `MaxDimensions`.

__Signature__
``` cpp
template <typename... Ints>
explicit Shape(
    Ints... Dimensions
);
```

| Parameters |   |
| ---------- | - |
| `Ints`     | Variadic type list of integers. Should be convertible to `ShapeT`. |
| `Dimensions` | List of integers that represent dimensions. |

<hr>

Create `Shape` from container. The container should have elements less than `MaxDimensions`.

__Signature__
``` cpp
template <typename IterT>
Shape(
    IterT Begin,
    IterT End
);
```

| Parameters |   |
| ---------- | - |
| `IterT`    | Iterable type of the container. Type of the element should be convertible to `ShapeT`. |
| `Begin`    | An iterator that points start position of the container. |
| `End`      | An iterator that points end position of the container. |

### function `getTotalElementCount()`
Get count of total elements.

__Signature__
``` cpp
[[nodiscard]]
size_t getTotalElementCount() const;
```

### function `getElementCountAt()`
Get count of element at given index.

__Signature__
``` cpp
[[nodiscard]]
ShapeT getElementCountAt(
    size_t Index
) const;
```

| Parameters |   |
| ---------- | - |
| `Index`    | an index of dimensions to get count of elements.  |

### function `getStride()`
Get stride at given index. Note that the function returns size in elements, not bytes.

__Signature__
``` cpp
[[nodiscard]]
ShapeT getStride(
    size_t Index
) const;
```

| Parameters |   |
| ---------- | - |
| `Index`    | an index of dimensions to get stride. |

### function `getDimensionSize()`
Get size of dimensions.

__Signature__
``` cpp
[[nodiscard]]
ShapeT getDimensionSize() const;
```

### function `empty()`
Check the `Shape` has no dimension. Returns `true` if the `Shape` has no dimensions.

__Signature__
``` cpp
[[nodiscard]]
bool empty() const;
```

### function `equals()`
Compare this `Shape` and `Other` are equal.

__Signature__
``` cpp
[[nodiscard]]
bool equals(
    const Shape &Other
) const;
```

| Paramters |   |
| --------- | - |
| `Other`   | Other `Shape` to compare. |

### function `begin()`
Get an iterator that points front of dimensions. Required for range-based for-loop.

__Signature__
``` cpp
[[nodiscard]]
const_iterator begin() const;
```

### function `end()`
Get an iterator that points end of dimensions. Required for range-based for-loop.

__Signature__
``` cpp
[[nodiscard]]
const_iterator end() const;
```

### operator `[]`
__Signature__
``` cpp
ShapeT operator [](
    size_t Index
) const;
```

### operator `==`
__Signature__
``` cpp
bool operator ==(
    const Shape &Other
) const;
```

### operator `!=`
__Signature__
``` cpp
bool operator !=(
    const Shape &Other
) const;
```

### operator `<<`
__Header :__ `OptimaV2/Runtime/Utils/StreamHelper.h`

__Signature__
``` cpp
std::ostream &operator <<(
    std::ostream &OS,
    const optima_v2::runtime::Shape &Value
);
```

### specialized for : `fmt::formatter<>`
__Header :__ `OptimaV2/Runtime/Utils/FormatHelper.h`

__Signature__
``` cpp
template <>
struct fmt::formatter<optima_v2::runtime::Shape>;
```
