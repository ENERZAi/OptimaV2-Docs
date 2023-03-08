struct `ContextOptions`
=======================
__Namespace :__ `optima_v2::runtime`  
__Header :__ `OptimaV2/Runtime/ContextOptions.h`

`ContextOptions` represents a set of options for initializing [`Context`](../classes/context.md).

## Members
### field `Verbosity`
Set inital verbosity of the logger. Default to `LogLevel::Warning`.

__Signature__
``` cpp
LogLevel Verbosity = LogLevel::Warning;
```

__See Also :__ [LogLevel](../enums/log_level.md)

### field `LogPath`
Set path of file to write log. Defaults to `""` (write logs on console).

__Signature__
``` cpp
std::filesystem::path LogPath;
```

### field `EnableProfile`
!!! note
    Currently not implemented and not used.

__Signature__
``` cpp
bool EnableProfile = false;
```
