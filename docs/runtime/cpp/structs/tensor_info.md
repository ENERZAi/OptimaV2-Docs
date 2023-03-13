struct `TensorInfo`
=======================
__Namespace :__ `optima_v2::runtime`  
__Header :__ `OptimaV2/Runtime/Tensor.h`

`TensorInfo` represents information of the tensor.

## Members
### Constructors
Create a new `TensorInfo`.

__Signature__
``` cpp
TensorInfo(
    Shape TensorShape,
    uint32_t Alignment,
    ElementType TensorType,
    std::string TensorName
);
```

### field `TensorShape`
Represents a shape of the tensor.

__Signature__
``` cpp
Shape TensorShape;
```

__See Also :__ [Shape](../classes/shape.md)

### field `Alignment`
Represents required alignment of the tensor.

__Signature__
``` cpp
uint32_t Alignment;
```

### field `TensorType`
Represents a type of the tensor.

__Signature__
``` cpp
ElementType TensorType;
```

__See Also :__ [ElementType](../enums/element_type.md)

### field `TensorName`
Represents a name of the tensor.

__Signature__
``` cpp
std::string TensorName;
```

### operator `<<`
__Header :__ `OptimaV2/Runtime/Utils/StreamHelper.h`

__Signature__
``` cpp
std::ostream &operator <<(
    std::ostream &OS,
    const optima_v2::runtime::TensorInfo &Value
);
```

### specialized for : `fmt::formatter<>`
__Header :__ `OptimaV2/Runtime/Utils/FormatHelper.h`

__Signature__
``` cpp
template <>
struct fmt::formatter<optima_v2::runtime::TensorInfo>;
```
