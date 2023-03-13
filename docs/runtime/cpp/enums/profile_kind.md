enum `ProfileKind`
==================
__Namespace :__ `optima_v2::runtime`  
__Header :__ `OptimaV2/Runtime/Profile.h`

`ProfileKind` represents kind of profiled data.

## Members
### enum `ModelInit`
Represents taken time for initializing the model.

### enum `SubgraphInit`
Represents taken time for initializing the subgraph.

### enum `RequestInit`
Represents taken time for initializing the request.

### enum `TransferFromInput`
Unused.

### enum `TransferToOutput`
Unused.

### enum `LayerExecute`
Represents taken time for executing the kernel.

### enum `Wait`
Represents taken time for waiting dependencies of the kernel.

### enum `BufferCopy`
Represents taken time for coping between buffers.

### enum `ModelExecute`
Represents total time for executing model.

### enum `SubgraphExecute`
Represents total time for executing subgraph.

### operator `<<`
__Header :__ `OptimaV2/Runtime/Utils/StreamHelper.h`

__Signature__
``` cpp
std::ostream &operator <<(
    std::ostream &OS,
    optima_v2::runtime::ProfileKind Value
);
```

### specialized for : `fmt::formatter<>`
__Header :__ `OptimaV2/Runtime/Utils/FormatHelper.h`

__Signature__
``` cpp
template <>
struct fmt::formatter<optima_v2::runtime::ProfileKind>;
```
