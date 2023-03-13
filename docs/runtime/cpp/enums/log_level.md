enum `LogLevel`
===============
__Namespace :__ `optima_v2::runtime`  
__Header :__ `OptimaV2/Runtime/Logging/LogLevel.h`

`LogLevel` represents severity of the message.

## Members
### enum `Debug`
Level for verbose, informative message for debugging.

### enum `Verbose`
Level for verbose information.

### enum `Info`
Level for brief information.

### enum `Warning`
Level for errors which are not so severe and recoverable.

### enum `Error`
Level for fatal and severe errors.

### operator `<<`
__Header :__ `OptimaV2/Runtime/Utils/StreamHelper.h`

__Signature__
``` cpp
std::ostream &operator <<(
    std::ostream &OS,
    optima_v2::runtime::LogLevel Value
);
```

### specialized for : `fmt::formatter<>`
__Header :__ `OptimaV2/Runtime/Utils/FormatHelper.h`

__Signature__
``` cpp
template <>
struct fmt::formatter<optima_v2::runtime::LogLevel>;
```
