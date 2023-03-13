enum `DeviceKind`
=================
__Namespace :__ `optima_v2::runtime`  
__Header :__ `OptimaV2/Runtime/Device.h`

`DeviceKind` represents kind of devices that supports and recognized in the runtime.

## Members
### enum `x86` 
Represents Intel IA32(i386, x86) CPU.

### enum `x64` 
Represents AMD64(IA32e, x86_64) CPU.

### enum `ARM` 
Represents ARM CPU.

### enum `ARM64`
Represents ARM64(AArch64) CPU.

### enum `NVIDIA`
Represents NVidia GPU.

### enum `AMDGPU`
Represents AMD Radeon GPU.

### enum `IntelGPU`
Represents Intel Graphics GPU.

### enum `Mali`
Represents ARM Mali GPU.

### enum `Adreno`
Represents Qualcomm Adreno GPU.

### enum `Hexagon`
Represents Qualcomm Hexagon NPU.

### enum `Myriad`
Represents Intel Myriad X NPU.

### enum `ARA1`
Represents Kinara ARA-1 NPU.

### enum `EdgeTPU`
Represents Coral EdgeTPU NPU.

### enum `CV22`
Represents Ambarellea CV22 series NPU.

### operator `<<`
__Header :__ `OptimaV2/Runtime/Utils/StreamHelper.h`

__Signature__
``` cpp
std::ostream &operator <<(
    std::ostream &OS,
    optima_v2::runtime::DeviceKind Value
);
```

### specialized for : `fmt::formatter<>`
__Header :__ `OptimaV2/Runtime/Utils/FormatHelper.h`

__Signature__
``` cpp
template <>
struct fmt::formatter<optima_v2::runtime::DeviceKind>;
```
