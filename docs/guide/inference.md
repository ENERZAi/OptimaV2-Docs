Run the model from OptimaV2
===========================

## Install requirements
To install requirements for running OptimaV2 Runtime, please refer [here](install.md#installing-optimav2-runtime).

## Import the runtime
=== "C++"
    Create a folder with preferred name and add a file named `Sample.cpp` in the folder.

    Add code below in `Sample.cpp`.
    ```cpp
    #include <OptimaV2/Runtime.h>

    namespace rt = optima_v2::runtime;

    int main(int argc, char **argv) {
        // TODO: Write your own code
        return 0;
    }
    ```

    Create file named `CMakeLists.txt` in same folder and add code:
    ```cmake
    # If you installed the runtime at non-common path, uncomment code below.
    # list(INSERT 0 CMAKE_PREFIX_PATH "<runtime installed path>")
    find_package(OptimaV2-Runtime REQUIRED)
    add_executable(Sample Sample.cpp)
    target_link_libraries(Sample PRIVATE OptimaV2::Runtime)
    ```

=== "Python"
    Create new folder with preferred name and add a file named `sample.py` in the folder.

    Add code below in `sample.py`.
    ```python
    import optima_v2.runtime as rt

    # TODO: Write your own code
    ```

## Create the context
=== "C++"
    Declare a variable with type `rt::Context`. It manages resources like extensions, allocated during inferences, etc.

    !!! note
        All codes are written in `main` function if not explicitly mentioned.

    ```cpp
    auto Context = rt::Context();
    ```

    Additional options for initializing `rt::Context` can be given by `rt::ContextOptions` object. If you want to initialize the context with options, refer the code below.

    ```cpp
    auto Options = rt::ContextOptions();
    
    Options.LogLevel = rt::LogLevel::Verbose; // setup verbosity of logger.
    Options.LogPath = std::filesystem::path("runtime.log"); // set file path of log. default is stdout.

    auto Context = rt::Context(Options);
    ```

    By default, the runtime loads extensions that are installed with the runtime. If you supplied extra extension and that is not in the path where the runtime installed, you can load it this way:

    ```cpp
    Context.loadExtension("path/to/extension");
    ```

=== "Python"
    Declare a variable with type `rt.Context`. It manages resources like extensions, allocated during inferences, etc.

    ```python
    context = rt.Context()
    ```

    Additional options for initializing `rt::Context` can be given by keyword arguments. `verbosity` argument set loglevel for internal logger and `log_path` argument set log path  If you want to initialize the context with options, refer the code below.

    ```python
    context = rt.Context(verbosity=rt.LogLevel.Verbose, log_path="runtime.log")
    ```

    By default, the runtime loads extensions that are installed with the runtime. If you supplied extra extension and that is not in the path where the runtime installed, you can load it this way:

    ```cpp
    context.load_extension("path/to/extension")
    ```

## Load the model
=== "C++"
    Loading a model is simple; just one line of code.

    ```cpp
    auto Model = Context.loadModel("path/to/model");
    ```

    !!! note
        OptimaV2-generated model output is a folder.

    To get information of input and output tensors, see the code below.

    ```cpp
    // Gather all input tensor information
    auto InputCount = Model.getInputTensorCount();
    for (auto i = 0; i < InputCount; ++i) {
        auto &Info = Model.getInputTensorInfo(i);
        // Do something with Info
    }

    // Get input tensor info with index
    auto &Info = Model.getInputTensorInfo(i);

    // ... or with name
    auto &Info = Model.getInputTensorInfo("input_1");

    // To get output tensor information, use getOutputTensor* series methods rather than getInputTensor* series methods.
    ```

=== "Python"
    Loading a model is simple; just one line of code.

    ```python
    model = context.load_model("sample_model")
    ```

    !!! note
        OptimaV2-generated model output is a folder.

    To get information of input and output tensors, see the code below.

    ```python
    # Gather all input tensor information
    for info in model.input_tensor_info:
        # do something with info
        pass

    # Get input tensor info with index
    info = model.get_input_tensor_info(i)

    # ... or with name
    info = model.get_input_tensor_info("input_1")

    # To get output tensor information, use get_output_tensor* series methods rather than get_input_tensor* series methods.
    ```

## Create the request
=== "C++"
    Create a `rt::InferRequest` object. It represents single inference and indepenedent between objects. So multiple `rt::InferRequest` objects can be created on single model and run those asynchonously to achieve maximum throughput.

    ```cpp
    auto Req = Model.createRequest();

    // To make more than one requests, you can do like this:
    std::vector<rt::InferRequest> Reqs;
    for (auto i = 0; i < 4; ++i)
        Reqs.push_back(Model.createRequest());
    ```

=== "Python"
    Create a `rt.InferRequest` object. It represents single inference and indepenedent between objects. So multiple `rt.InferRequest` objects can be created on single model and run those asynchonously to achieve maximum throughput.

    ```python
    req = model.create_request()

    # To make more than one requests, you can do like this:
    reqs = []
    for _ in range(4):
        reqs.append(model.create_request())
    ```

## Set input tensors
=== "C++"
    Because the device manages tensor memory, tensors cannot be created by user. So users should use `rt::Tensor` objects that are provided by `rt::InferRequest` and copy datas using methods in `rt::Tensor`.

    To give input tensor data for the model, refer the code below:

    ```cpp
    // To get all input tensors, use getInputTensors() method.
    for (auto &&Tensor : Req.getInputTensors()) {
        // use copyFrom() method to do simple copy from buffer to tensor.
        Tensor.copyFrom(InputBuffer, InputElementCount);

        // If you access device memory directly, use getBuffer() method.
        auto Buffer = Tensor.getBuffer();
        auto *Ptr = Buffer.data();

        // Do something with Ptr
    }

    // To get tensor by index use getInputTensor() method.
    auto Tensor = Req.getInputTensor(0);
    // String is allowed too.
    auto Tensor = Req.getInputTensor("input_1");

    // The way to access data is same with above.
    Tensor.copyFrom(...);
    ```

    !!! warning
        a variable named `Buffer` is a RTTI object typed `rt::BufferHolder` which is acquire device memory when use it and release the memory when reaches out of its scope.
        So it may cause undefined behavior copying or moving value of `rt::BufferHolder` class.
        It is recommended that save `rt::Tensor` object and use `getBuffer()` method if you need to access device memory.
    
    !!! warning
        `rt::Tensor` in C++ API does not verify shape and/or type of input value. Use with caution.

=== "Python"
    Because the device manages tensor memory, tensors cannot be created by user. So users should use `rt.Tensor` objects that are provided by `rt.InferRequest` and copy datas using methods in `rt.Tensor`.

    To give input tensor data for the model, refer the code below:

    ```python
    # To get all input tensors, use input_tensors property.
    for tensor in req.input_tensors:
        arr = np.ndarray(...)

        # use copy_from() method to input data
        tensor.copy_from(arr)

    # To get tensor by index use get_input_tensor() method.
    tensor = req.get_input_tensor(1)
    # String is allowed too.
    tensor = req.get_input_tensor("input_1")

    # use set_inputs() method to input datas at once.
    inputs = [np.random.rand(...) for _ in range(...)]
    req.set_inputs(inputs)

    # dictionary form is also allowed.
    req.set_inputs({
        "input_1": np.random.rand(...),
        "input_2": np.random.rand(...)
    })
    ```

    !!! warning
        `ndarray` in Numpy supports various form of array. In contrast, OptimaV2 Runtime only accepts row-major and contiguous array.
        the runtime raises an error if inputs do not conform these conditions.

## Run inference
=== "C++"
    After you input datas for the model, you can run inference. All inferences are run asynchonously in the runtime. This means `infer()` method does not block the code.
    You can use `wait()` method until the inference finish, but it is suggested that register the callback to improve throughput.

    Running inference synchronously:

    ```cpp
    Req.infer();
    Req.wait();

    // To set timeout for waiting, supply std::chrono::duration value
    // when call the method.
    using namespace std::literals; // for ms literal
    if (Req.wait(100ms)) {
        // infer() not finished before 100ms timeout
    } else {
        // infer() finished before 100ms timeout
    }
    ```

    Running inference asynchronously:

    ```cpp
    auto &Req = Reqs[...];
    Req.setCallback([&Req](std::exception_ptr Error) {
        if (Error != nullptr) {
            // error was thrown during inference
            return;
        }

        // Do necessary jobs and run inference again.
        Req.infer(); // this is safe.
    });
    ```

=== "Python"
    After you input datas for the model, you can run inference. All inferences are run asynchonously in the runtime. This means `infer()` method does not block the code.
    You can use `wait()` method until the inference finish, but it is suggested that register the callback to improve throughput.

    Running inference synchronously:

    ```python
    req.infer()
    req.wait()

    # To set timeout for waiting, supply integer value in milliseconds
    # when call the method.
    if req.wait(100):
        # infer() not finished before timeout
        pass
    else:
        # infer() finished before timeout
        pass
    ```

    Running inference asynchronously:

    ```python
    req = ...

    def callback(data):
        # This callback never be called when inference was failed.

        # Do necessary jobs and run inference again.

        req.infer()  # this is safe.

    req.set_callback(callback, ...)
    req.infer()
    ```

    !!! warning
        It is known that there is memory leak due to circular reference when declare `rt.Context`, `rt.Model` and/or `rt.InferRequest` objects.
        You should avoid declare these objects in global scope to prevent these problem.

## Get output tensors
=== "C++"
    When the inference is finished successfully, you can read output tensor.

    !!! warning
        You can get output tensor before finish the inference, even before run the inference. But it is not expected usage and it may cause undefined behavior. It is not recommended.
    
    To get output tensors, refer the code below:

    ```cpp
    // To get all output tensors, use getOutputTensors() method.
    for (auto &&Tensor : Req.getOutputTensors()) {
        // use copyTo() to simple copy from tensor to buffer.
        Tensor.copyTo(OutputBuffer, OutputElementCount);

        // If you want to access device memory directly, use getBuffer() mehtod.
        auto Buffer = Tensor.getBuffer();
        auto *Ptr = Buffer.data();

        // Do something with Ptr
    }

    // To get tensor by index, use getOutputTensor() method.
    auto Tensor = Req.getOutputTensor(0);
    // String is allowed too.
    auto Tensor = Req.getOutputTensor("output");

    // The way to access data is same with above.
    Tensor.copyTo(...);
    ```

=== "Python"
    When the inference is finished successfully, you can read output tensor.

    !!! warning
        You can get output tensor before finish the inference, even before run the inference. But it is not expected usage and it may cause undefined behavior. It is not recommended.

    To get output tensors, refer the code below:

    ```python
    # To get all output tensors, use output_tensors property.
    for tensor in req.output_tensors:
        arr = tensor.to_numpy()
    
    # To get tensor by index, use get_output_tensor() method
    tensor = req.get_output_tensor(0)
    # String is allowed too.
    tensor = req.get_output_tensor("output")

    # you can get all outputs at once in list of numpy arrays.
    outputs = req.get_outputs()
    ```

## Get profile data
=== "C++"
    After running inference, you can get profile data gathered while running inference.
    You can use this information to find out problems like which part is bottleneck for optimizing the model.

    OptimaV2 Runtime provides these kinds of profile data below:

    - `ModelInit`: Represents taken time during load the model.
    - `SubgraphInit`: Represents taken time during load the subgraph which is partal graph of the model.
    - `RequestInit`: Represents taken time during create and initialize `rt::InferRequest` object.
    - `TransferFromInput`: Represents taken time during transfer data from input tensor to device memory.
    - `TransferToOutput`: Represents taken time duing transfer data from device memory to output tensor.
    - `LayerExecute`: Represents taken time during execute single layer(kernel).
    - `Wait`: Represents taken time to wait execute the layer or the subgraph. (Waiting in the queue to run or waiting other layers and/or subgraphs to be finished)
    - `BufferCopy`: Represents taken time to copy buffer between different devices.
    - `ModelExecute`: Represents taken time to run entire model. (`LayerExecute` + `Wait` + `BufferCopy`)
    - `SubgraphExecute`: Represents taken time to run single subgraph. (`LayerExecute` + `Wait`)

    To get profile data, refer the code below:

    ```cpp
    auto Datas = Req.getProfileData();

    for (auto &Data : Datas) {
        // <OptimaV2/Runtime/Utils/StreamHelper.h> required to print in std::cout.
        std::cout <<Data << std::endl;
    }
    ```

    !!! note
        We`ll introduce convenience feature for statistics and plotting graph in near future.

=== "Python"
    After running inference, you can get profile data gathered while running inference.
    You can use this information to find out problems like which part is bottleneck for optimizing the model.

    OptimaV2 Runtime provides these kinds of profile data below:

    - `ModelInit`: Represents taken time during load the model.
    - `SubgraphInit`: Represents taken time during load the subgraph which is partal graph of the model.
    - `RequestInit`: Represents taken time during create and initialize `rt.InferRequest` object.
    - `TransferFromInput`: Represents taken time during transfer data from input tensor to device memory.
    - `TransferToOutput`: Represents taken time duing transfer data from device memory to output tensor.
    - `LayerExecute`: Represents taken time during execute single layer(kernel).
    - `Wait`: Represents taken time to wait execute the layer or the subgraph. (Waiting in the queue to run or waiting other layers and/or subgraphs to be finished)
    - `BufferCopy`: Represents taken time to copy buffer between different devices.
    - `ModelExecute`: Represents taken time to run entire model. (`LayerExecute` + `Wait` + `BufferCopy`)
    - `SubgraphExecute`: Represents taken time to run single subgraph. (`LayerExecute` + `Wait`)

    To get profile data, refer the code below:

    ```python
    for data in req.profile_data:
        print(data)
    ```

    !!! note
        We`ll introduce convenience feature for statistics and plotting graph in near future.
