struct `ProfileData`
=======================
__Namespace :__ `optima_v2::runtime`  
__Header :__ `OptimaV2/Runtime/Profile.h`

`ProfileData` represents performance datas measured while running inference.

## Members
### Constructors
Create a new `ProfileData`.

__Signature__
``` cpp
ProfileData(
    ProfileKind Kind,
    std::string Name,
    std::chrono::microseconds Time
);
```

### field `Kind`
Represents a kind of the data.

__Signature__
``` cpp
ProfileKind Kind;
```

__See Also :__ [ProfileKind](../enums/profile_kind.md)

### field `Name`
Represents a name of the data. It may have different meaning depending on what kind of the data is.

__Signature__
``` cpp
std::string Name;
```

### field `Time`
Represents measured time for specific kind in microseconds.

__Signature__
``` cpp
std::chrono::microseconds Time;
```

### operator `<<`
__Header :__ `OptimaV2/Runtime/Utils/StreamHelper.h`

__Signature__
``` cpp
std::ostream &operator <<(
    std::ostream &OS,
    const optima_v2::runtime::ProfileData &Value
);
```

### specialized for : `fmt::formatter<>`
__Header :__ `OptimaV2/Runtime/Utils/FormatHelper.h`

__Signature__
``` cpp
template <>
struct fmt::formatter<optima_v2::runtime::ProfileData>;
```
