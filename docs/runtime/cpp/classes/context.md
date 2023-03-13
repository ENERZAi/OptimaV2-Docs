class `Context`
===================
__Namespace :__ `optima_v2::runtime`  
__Header :__ `OptimaV2/Runtime/Context.h`

`Context` manages environment and resource for models and extensions.

## Members
### Constructors
Construct new `Context` with options.

__Signature__
``` cpp
Context(
    const ContextOptions &Options = ContextOptions()
);
```

| Paramters |   |
| --------- | - |
| `Options` | Options for initializing the context |

__Throws__

- Any exceptions that inherit [`Exception`](../exceptions/exception.md) threw by the backend.
- [`BackendException`](../exceptions/backend.md) : The backend threw an exception that was not handled.

__See Also :__ [ContextOptions](../structs/context_options.md)

### Destructor
__Signature__
``` cpp
~Context() noexcept;
```

### function `loadModel()`
Load the model from given path.

__Signature__
``` cpp
[[nodiscard]]
Model loadModel(
    const std::filesystem::path &Path,
    bool Fallback = false
);
```

| Parameters |   |
| ---------- | - |
| `Path`     | Path of the model to load. |
| `Fallback` | Fallback to CPU if DSP is not available. Only affects when the model contains SNPE subgraph. |

__Throws__

- Any exceptions that inherit [`Exception`](../exceptions/exception.md) threw by the backend.
- `std::invalid_argument` : `Path` is empty, not exists, or not a folder.
- [`InvalidModelException`](../exceptions/invalid_model.md) : The model is corrupted and/or invalid.
- [`UnsupportedModelException`](../exceptions/unsupported_model.md) : The model requires unknown devices or frameworks to load.
- [`BackendException`](../exceptions/backend.md) : The backend threw an exception that was not handled.

__See Also :__ [Model](model.md)

### function `loadExtension()`
Load a extension from given path.

Normally, extensions are bundled with the runtime and loaded at construct of `Context`.
This function is intened for who have extra extensions to load.

__Signature__
``` cpp
void loadExtension(
    const std::filesystem::path &Path
);
```

| Parameters |   |
| ---------- | - |
| `Path`     | Path of the extension to load. |

__Throws__

- Any exceptions that inherit [`Exception`](../exceptions/exception.md) threw by the backend.
- `std::invalid_argument` : `Path` is empty, not exists, or not a file.
- [`InvalidExtensionException`](../exceptions/invalid_extension.md) : The runtime failed to load the extension.
- [`BackendException`](../exceptions/backend.md) : The backend threw an exception that was not handled.

### function `getVerbosity()`
Get current verbosity of the logger. Can be updated by [`setVerbosity()`](#function-setverbosity) function.

__Signature__
``` cpp
[[nodiscard]]
LogLevel getVerbosity() const;
```

__See Also :__ [LogLevel](../enums/log_level.md)

### function `setVerbosity()`
Update verbosity of the logger. Returns previous log level.

__Signature__
``` cpp
LogLevel setVerbosity(
    LogLevel Level
);
```

| Paramters |   |
| --------- | - |
| `Level`   | `LogLevel` to update. |

__See Also :__ [LogLevel](../enums/log_level.md)

### function `getAvailableDevices()`
Get list of devices the runtime recognized. It may be different depends on what extensions are loaded.

__Signature__
``` cpp
[[nodiscard]]
std::vector<DeviceInfo> getAvailableDevices();
```

__Throws__

- Any exceptions that inherit [`Exception`](../exceptions/exception.md) threw by the backend.
- [`BackendException`](../exceptions/backend.md) : The backend threw an exception that was not handled.

__See Also :__ [DeviceInfo](../structs/device_info.md)

### function `getVersion()`
Get version of the runtime. 

!!! note
    Return value of the function and macro `OPTIMA_RT_CURRENT_VERSION` can be different. Do not assume these values are always same.

__Signature__
``` cpp
[[nodiscard]]
static VersionTuple getVersion();
```

__See Also :__ [VersionTuple](../typedefs/version_tuple.md)
