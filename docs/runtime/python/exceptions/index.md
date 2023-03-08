OptimaV2 Runtime Python Exceptions
=================================

This page lists exceptions defined in OptimaV2 Runtime.

| Exceptions |   |
| ---------- | - |
| [`Exception`](exception.md) | Base exception class for every exceptions that are thrown in the runtime. |
| [`BackendException`](backend.md) | Represents an exception thrown when the runtime caught exception that is thrown and not handled properly in the backend. |
| [`InferException`](infer.md) | Represents an exception thrown when the runtime detected a fault while running inference. |
| [`InitializationFailedException`](initialization_failed.md) | Represents an exception thrown when the backend failed to initialize its own subsystem. |
| [`InvalidArgumentException`](invalid_argument.md) | Represents an exception that indicates something wrong argument is provided by user |
| [`InvalidExtensionException`](invalid_extension.md) | Represents an exception thrown when the runtime detects a extension is misconfigured. |
| [`InvalidModelException`](invalid_model.md) | Represents an exception thrown when the model is invalid. |
| [`InvalidOperationException`](invalid_operation.md) | Represents an exception thrown when user modify/update while the model is running. |
| [`OutOfResourceException`](out_of_resource.md) | Represents an exception thrown when the runtime failed to allocate resource. |
| [`UnsupportedModelException`](unsupported_model.md) | Represents an exception thrown when the model requires unsupported framework and/or device. |