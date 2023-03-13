class `Context`
===================
__Package :__  `optima_v2.runtime`

`Context` manages environment and resource for models and extensions.

## Members
### Initializer
Create new `Context` with options.

__Signature__
``` python
def __init__(
    self,
    /,
    verbosity: LogLevel = LogLevel.Warning,
    log_path: str = "",
): ...
```

| Paramters |   |
| --------- | - |
| `verbosity` | Options for initializing the context |
| `log_path` | Options for initializing the context |

__Raises__

- Any exceptions that inherit [`Exception`](../exceptions/exception.md) threw by the backend.
- [`BackendException`](../exceptions/backend.md) : The backend threw an exception that was not handled.

### method `load_model()`
Load the model from given path.

__Signature__
``` python
def load_model(
    self,
    model_path: str,
    fallback: bool = False
) -> Model: ...
```

| Parameters |   |
| ---------- | - |
| `model_path` | Path of the model to load. |
| `fallback` | Fallback to CPU if DSP is not available. Only affects when the model contains SNPE subgraph. |

__Raises__

- Any exceptions that inherit [`Exception`](../exceptions/exception.md) threw by the backend.
- `ValueError` : `model_path` is empty, not exists, or not a folder.
- [`InvalidModelException`](../exceptions/invalid_model.md) : The model is corrupted and/or invalid.
- [`UnsupportedModelException`](../exceptions/unsupported_model.md) : The model requires unknown devices or frameworks to load.
- [`BackendException`](../exceptions/backend.md) : The backend threw an exception that was not handled.

__See Also :__ [Model](model.md)

### method `load_extension()`
Load a extension from given path.

Normally, extensions are bundled with the runtime and loaded at construct of `Context`.
This function is intened for who have extra extensions to load.

__Signature__
``` python
def load_extension(
    self,
    extension_path: str
): ...
```

| Parameters |   |
| ---------- | - |
| `extension_path` | Path of the extension to load. |

__Raises__

- Any exceptions that inherit [`Exception`](../exceptions/exception.md) threw by the backend.
- `ValueError` : `Path` is empty, not exists, or not a file.
- [`InvalidExtensionException`](../exceptions/invalid_extension.md) : The runtime failed to load the extension.
- [`BackendException`](../exceptions/backend.md) : The backend threw an exception that was not handled.

### property `verbosity`
Get and set current verbosity of the logger.

__Signature__
``` python
@property
def verbosity(self) -> LogLevel: ...

@verbosity.setter
def verbosity(self, value: LogLevel): ...
```

__See Also :__ [LogLevel](../enums/log_level.md)

### property `available_devices`
Get list of devices the runtime recognized. It may be different depends on what extensions are loaded.

Note that this property is readonly.

__Signature__
``` python
@property
def available_devices(self) -> Sequence[DeviceInfo]: ...
```

__Raises__

- Any exceptions that inherit [`Exception`](../exceptions/exception.md) threw by the backend.
- [`BackendException`](../exceptions/backend.md) : The backend threw an exception that was not handled.

__See Also :__ [DeviceInfo](../classes/device_info.md)

### property `version`
Get version of the runtime. 

Note that this property is static and readonly.

__Signature__
``` python
@classmethod
@property
def version(cls) -> Tuple[int, int, int]: ...
```
