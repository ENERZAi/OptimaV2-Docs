# How to convert your ML model and compile it
The document describes the steps to convert a machine learning (ML) model into a dynamic library that can be used for deployment on a target device. The process involves two steps:

1. Converting the ML model (Pytorch, for now) into a networkx model and allocating each operation into one or multiple devices
    1. Provides a machine learning model (implemented using the PyTorch framework) to convert into a graph representation using the *torch2nx* library. The output is then saved in the "gpickle" format.[^1] 
 
    2. Creates a "json file" that maps operations within the graph representation of the model to specific devices, such as GPUs or CPUs. This information can be used to optimize the execution of the model on different devices.

2. Compiling into binary
    1. initialize graph module
    2. allocate kernel
    3. kernel compile
    4. graph split
    5. extract representative dataset
    6. export to runtime
    7. convert onnx

## Convert ML model to networkx model

You can put togehter following code snippets to run it. In below, each part of the code is explained in detail.

### Create gpickle file for networkx model
````python
  
import torch
import torch.nn as nn
import zaiConverter
from zaiConverter.pytorch_module import converter

class SampleModel(nn.Module):
    def __init__(self):
        super(SampleModel, self).__init__()
        self.conv = nn.Conv2d(3, 1, 3, 1, 1, bias=False)
    def forward(self, x, y):
        out1 = self.conv(x)
        out2 = out1 + y
        return out2

model = SampleModel()
sample_input_list = [torch.rand(1, 3, 32, 32), torch.rand(1, 1, 32, 32)] # shape of each arguments matches with that of tensor x and tensor y
need_gpu = True # or False
gpickle_save_filename = "<SOME PATH WHERE GPICKLE WILL BE SAVED>"

# Convert model to Networkx specification
graph_converter = converter.Torch2GraphConverter(tf_flip=True, torch_flip=False)
nx_graph = graph_converter.convert(
    model=model, fake_torch_data=sample_input_list, gpu=need_gpu
)
graph_converter.reset_module()
graph_converter.export_to_gpickle(gpickle_save_filename, nx_graph)
````

User should provide three inputs

`model` : a torch.nn.Module instance

`fake_torch_data` : list of torch tensor(s) of which the order must match the order of arguments in the forward method of the provided model.

`gpu` : boolean to indicate if you use gpu or not

Then, you get graph gpickle file saved in "gpickle_save_filename"

### Create json file that maps operations to specific devices

The device allocation JSON file indicates which device (processor) is assigned to each operation in the graph. 

For example, the above "SampleModel" may assign "add" into CPU and "convolution" into GPU.

The required JSON file has key-value pairs, where the key is the operation name and the value is the allocated device. The supported devices are [^2]:

+ `X86` 
+ `X64` (Tested)
+ `ARM`
+ `ARM64` (Tested)
+ `NVIDIA`
+ `AMDGPU`
+ `INTELGPU`
+ `MALI`
+ `ADRENO`
+ `HEXAGON` (Tested)
+ `MYRIAD`
+ `ARA1`
+ `TPU`
+ `CV22`

Torch2nx provides user to create a template JSON with a given device.

````python
import pickle
import networkx as nx
import json
# Create json file #
model_json_filename="<SOME PATH WHERE JSON WILL BE SAVED>"
default_device="<SOME DEVICE>" # You must select among above candidates

converter.Torch2GraphConverter.get_onedevice_allocator(model_json_filename, default_device, gpickle_save_filename)

````

Then, you will get a JSON file like this:
````json
{"conv2d_2": "X64:0", "add_5": "X64:0"}
````

You can customize this JSON file as you wish, for example, the following JSON file indicates that the convolution operation runs on hexagon and then adds tensors on an x86-64 architecture processor:

````json
{"conv2d_2": "HEXAGON:0", "add_5": "X64:1"}
````

### Graph visualization

Device allocation becomes much easier with a visual representation of the graph. To visualize the graph, you need to install pygraphviz.

````bash
# (Linux)
sudo apt-get install graphviz graphviz-dev
pip install pygraphviz
# (For other OS, please refer to https://pygraphviz.github.io/documentation/stable/install.html)
````

The following code provides user an image that illustrates the graph with nodes of the same color representing the same device.

````python
from pathlib import Path
visual_graph_filename = "<VISUALIZED GRAPH FILENAME>"

converter.Torch2GraphConverter.plot_network(visual_graph_filename, gpickle_save_filename, model_json_filename, figsizenum=5)
```` 

By controlling the `figsizenum`, you can adjust the size of the image.

![Visualized Graph](../img/samplemodel.png)

## Compiling into binary


----

The OptimaV2 Manager is an entrypoint class to the entire OptimaV2 optimization and compilation process.
The user only needs to provide the following information.

1. The name of the model.
2. List of devices to use. Provide as list of optimav2.devices.DeviceEnum enumeration.
3. Gpickle file extracted from torch2nx. Explained above.
4. Directory of where to dump compilation outputs.
4. JSON file that denotes where each kernel is allocated to each device. Explained above.
5. (Optional) Representative Dataset if SNPE is used.

Invoking the optimize method of the manager class will run the entire OptimaV2 optimization process. Parameters are to be given like below.

```python
def optimize(
    self,
    module_name: str, # Name of module
    device_info: List[devices.DeviceEnum], # List of all devices to be considered.
    model_graph_or_gpickle: Union[str, DiGraph], # Path of model gpickle extracted from torch2nx.
    output_folder_dir: str, # Path of output directory compilation resutls will be exported to.
    device_alloc_per_kernel_json_dir: str,  # JSON file containing operation to device mapping.
    sample_inputs: Optional[List[Tuple[torch.Tensor]]] = None, # Optional Representative Dataset
    need_gpu=False, # (Float16 only) Pass "True" when float16 models are converted.
):
```

Sample Usage of Manager class
```python

# Import Manager from optima_v2
from optima_v2.manager import manager
from optima_v2.devices import DeviceEnum

# ... 
manager_instance = manager.Manager()
manager_instance.optimize(
    "MediapipeNet",
    [
        DeviceEnum.DEVICE_KIND_HEXAGON,
        DeviceEnum.DEVICE_KIND_X64,
    ],
    "~/models/mediapipe/mediapipe.gpickle",
    "~/outputs/",
    "~/models/mediapipe/mediapipe_allocation.json",
    representative_data,
)

```

After invoking this function,



**Expected Output Tree**
```
~/outputs/MediapipeNet/
	|- model.meta (metadata)
	|- Subgraph_0\
	|- Subgraph_1\
	|- ...
	|- Subgraph_i(OpenVino)\
	|		|- subgraph_i.blob
    |
	|- Subgraph_j(SNPE)\
	|		|- subgraph_j.dlc  
	|
	|- Subgraph_k(LLVM)\
	|		|- <subgraph_name>.meta
	|		|- <kernel_1_name>.so
	|		|- <kernel_2_name>.so
	|		|- ......
	|
	|- Subgraph_o(SPIRV)\
			|- <subgraph_name>.meta
			|- <kernel_1_name>.spv
			|- <kernel_2_name>.spv
			|- ......

```


### Notes on Representative Data
The format of representative dataset is as follows
```
List[Tuple[torch.Tensor]]]
```
The outermost list represents the batch, and the inner tuple represents each input for the model.

The example below illustrates how representative data is collected.

```python

    repr_data = []

    for input_tuple in some_dataset_iterator:
        # get input_tuple

        repr_data.append(input_tuple)

        output = model(*input_tuple)
        
        # Sample of how this input will 

    # ...

    manager_instance = manager.Manager()
    manager_instance.optimize(
        "MediapipeNet",
        [
            devices.DeviceEnum.DEVICE_KIND_HEXAGON,
            devices.DeviceEnum.DEVICE_KIND_X64,
        ],
        "~/models/mediapipe/mediapipe.gpickle",
        "~/outputs/",
        "~/models/mediapipe/mediapipe_allocation.json",
        repr_data,
    )

```

[^1]: The "gpickle" format is a serialization format that is commonly used in Python to store networkx graphs.
[^2]: It depends on a runtime specification
