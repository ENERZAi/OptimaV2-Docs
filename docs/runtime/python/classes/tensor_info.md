class `TensorInfo`
=======================
__Package :__  `optima_v2.runtime`

`TensorInfo` represents information of the tensor.

## Members
### property `shape`
Represents a shape of the tensor. Note that this property is readonly.

__Signature__
``` python
@property
def shape(self) -> Tuple[int, ...]: ...
```

### property `alignment`
Represents required alignment of the tensor. Note that this property is readonly.

__Signature__
``` python
@property
def alignment(self) -> int: ...
```

### property `type`
Represents a type of the tensor. Note that this property is readonly.

__Signature__
``` python
@property
def type(self) -> ElementType: ...
```

__See Also :__ [ElementType](../enums/element_type.md)

### property `name`
Represents a name of the tensor. Note that this property is readonly.

__Signature__
``` python
@property
def name(self) -> str: ...
```
