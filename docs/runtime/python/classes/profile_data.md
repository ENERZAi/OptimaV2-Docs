class `ProfileData`
=======================
__Package :__  `optima_v2.runtime`

`ProfileData` represents performance datas measured while running inference.

## Members
### property `kind`
Represents a kind of the data. Note that this property is readonly.

__Signature__
``` python
@property
def kind(self) -> ProfileKind: ...
```

__See Also :__ [ProfileKind](../enums/profile_kind.md)

### property `name`
Represents a name of the data. It may have different meaning depending on what kind of the data is. Note that this property is readonly.

__Signature__
``` python
@property
def name(self) -> str: ...
```

### property `time`
Represents measured time for specific kind in microseconds. Note that this property is readonly.

__Signature__
``` python
@property
def time(self) -> int: ...
```
