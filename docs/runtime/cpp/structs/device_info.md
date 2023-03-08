struct `DeviceInfo`
=======================
__Namespace :__ `optima_v2::runtime`  
__Header :__ `OptimaV2/Runtime/Device.h`

`DeviceInfo` represents information of the device.

## Members
### Constructors
Create empty `DeviceInfo`.

__Signature__
``` cpp
DeviceInfo() = default;
```

<hr>

Create a new `DeviceInfo`.

__Signature__
``` cpp
DeviceInfo(
    FrameworkKind Framework,
    DeviceKind Kind,
    std::string Name,
    std::string ID
);
```

### field `Framework`
Represents a kind of the framework which recognize the device.

__Signature__
``` cpp
FrameworkKind Framework;
```

__See Also :__ [FrameworkKind](../enums/framework_kind.md)

### field `Kind`
Represents a kind of the device.

__Signature__
``` cpp
DeviceKind Kind;
```

__See Also :__ [DeviceKind](../enums/device_kind.md)

### field `Name`
Represents user-friendly name of the device.

__Signature__
``` cpp
std::string Name;
```

### field `ID`
Represents unique ID distinguish between devices in the backend.

May be empty if the backend does not provide device ID.

__Signature__
``` cpp
std::string ID;
```

### operator `<<`
__Header :__ `OptimaV2/Runtime/Utils/StreamHelper.h`

__Signature__
``` cpp
std::ostream &operator <<(
    std::ostream &OS,
    const optima_v2::runtime::DeviceInfo &Value
);
```

### specialized for : `fmt::formatter<>`
__Header :__ `OptimaV2/Runtime/Utils/FormatHelper.h`

__Signature__
``` cpp
template <>
struct fmt::formatter<optima_v2::runtime::DeviceInfo>;
```
