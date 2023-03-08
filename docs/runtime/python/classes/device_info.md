class `DeviceInfo`
=======================
__Package :__  `optima_v2.runtime`

`DeviceInfo` represents information of the device.

## Members
### property `framework`
Represents a kind of the framework which recognize the device.

__Signature__
``` python
@property
def framework(self) -> FrameworkKind: ...
```

__See Also :__ [FrameworkKind](../enums/framework_kind.md)

### property `kind`
Represents a kind of the device. Note that this property is readonly.

__Signature__
``` python
@property
def kind(self) -> DeviceKind: ...
```

__See Also :__ [DeviceKind](../enums/device_kind.md)

### field `name`
Represents user-friendly name of the device. Note that this property is readonly.

__Signature__
``` python
@property
def name(self) -> str: ...
```

### field `id`
Represents unique ID distinguish between devices in the backend. Note that this property is readonly.

May be empty if the backend does not provide device ID.

__Signature__
``` python
@property
def id(self) -> str: ...
```
