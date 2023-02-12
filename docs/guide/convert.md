# How to convert your ML model and compile it
This section introduces how to convert your ML model into OptimaIR and then compile it into dynamic library (which will be used to deploy your model in your target device using runtime. please refer to [User Guide/Inference](inference.md)).

This section is again divided by two steps

1. convert torch model to networkx model and allocate each operation into device(s)
    1. User provide ML model (for now, only torch is available) and converts it into networkx which should be saved in "gpickle" format using *torch2nx* library. 

    2. User creates "json file" that enumerates which device is allocated for each operation in graph. [^1] 

2. Takes above mentioned files (gpickle and json) and then converts into binary (TO BE REWRITTEN BELOW)
    1. initialize graph module
    2. allocate kernel
    3. kernel compile
    4. graph split
    5. extract representative dataset
    6. export to runtime
    7. convert onnx

## torch to networkx




## compile

[^1]: sample input 만드는 것은 manager가 사용할 것이고 optional이기 때문에 2번 step에서 설명하면 좋겠습니다]