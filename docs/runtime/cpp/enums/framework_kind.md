enum `FrameworkKind`
====================
__Namespace :__ `optima_v2::runtime`  
__Header :__ `OptimaV2/Runtime/FrameworkKind.h`

`FrameworkKind` represents kind of supported frameworks in the runtime.

## Members
### enum `TFLite`
Tensorflow Lite

### enum `OpenVINO`
OpenVINO

### enum `SNPE`
Qualcomm Snapdragon Neural Processing Engine

### enum `DVAPI`
Kinara DVAPI

### enum `Vulkan`
Vulkan

### enum `OpenCL`
OpenCL

### enum `Native`
Native code - running on CPU.

### operator `<<`
__Header :__ `OptimaV2/Runtime/Utils/StreamHelper.h`

__Signature__
``` cpp
std::ostream &operator <<(
    std::ostream &OS,
    optima_v2::runtime::FrameworkKind Value
);
```

### specialized for : `fmt::formatter<>`
__Header :__ `OptimaV2/Runtime/Utils/FormatHelper.h`

__Signature__
``` cpp
template <>
struct fmt::formatter<optima_v2::runtime::FrameworkKind>;
```
