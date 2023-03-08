enum `ElementType`
==================
__Namespace :__ `optima_v2::runtime`  
__Header :__ `OptimaV2/Runtime/Type.h`

`ElementType` represents type of the tensor.

## Members
### enum `I8`
Signed, 8bit-sized integer.

### enum `U8`
Unsigned, 8bit-sized integer.

### enum `I16`
Signed, 16bit-sized integer.

### enum `U16`
Unsigned, 16bit-sized integer.

### enum `I32`
Signed, 32bit-sized integer.

### enum `U32`
Unsigned, 32bit-sized integer.

### enum `I64`
Signed, 64bit-sized integer.

### enum `U64`
Unsigned, 64bit-sized integer.

### enum `F16`
16bit-sized floating point. (a.k.a half)

### enum `F32`
32bit-sized floating point. (a.k.a float)

### enum `F64`
64bit-sized floating point. (a.k.a double)

### enum `Q8`
8bit-sized quantized floating point.

### enum `Q16`
16bit-sized quantized floating point.

### enum `BF16`
16bit-sized brain floating point.

### operator `<<`
__Header :__ `OptimaV2/Runtime/Utils/StreamHelper.h`

__Signature__
``` cpp
std::ostream &operator <<(
    std::ostream &OS,
    optima_v2::runtime::ElementType Value
);
```

### specialized for : `fmt::formatter<>`
__Header :__ `OptimaV2/Runtime/Utils/FormatHelper.h`

__Signature__
``` cpp
template <>
struct fmt::formatter<optima_v2::runtime::ElementType>;
```
