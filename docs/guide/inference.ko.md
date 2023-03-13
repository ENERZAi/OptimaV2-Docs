Run the model from OptimaV2
===========================

## Install requirements
Runtime을 설치하기 위한 요구사항을 보려면 [여기](install.md#installing-optimav2-runtime)를 확인하세요.

## Import the runtime
=== "C++"
    새로운 폴더를 만들고 그 안에 `CMakeLists.txt`를 작성합니다.
    ```cmake
    find_package(OptimaV2-Runtime REQUIRED)
    add_executable(Sample Sample.cpp)
    target_link_libraries(Sample PRIVATE OptimaV2::Runtime)
    ```
    
    `Sample.cpp` 파일을 생성하고 코드를 작성합니다.
    ```cpp
    #include <OptimaV2/Runtime.h>

    namespace rt = optima_v2::runtime;

    int main(int argc, char **argv) {
        return 0;
    }
    ```

=== "Python"
    새로운 폴더 만들고 그 안에 `sample.py`파일을 생성하고 runtime을 import합니다.
    ```python
    import optima_v2.runtime as rt
    ```

## Create the context
=== "C++"
    `rt::Context` 객체를 생성합니다. `rt::Context` 객체는 런타임에 할당되는 모든 자원, 플러그인 등을 관리하는 객체입니다.
    !!! note
        여기서부터 명시하지 않는 이상 모든 code는 위에 작성한 `main`함수에 작성됩니다.

    ```cpp
    auto Context = rt::Context();
    ```

    `rt::ContextOptions` 객체를 통해 context 초기화 옵션을 제공할 수 있습니다. `ContextOptions` 객체를 사용하여 context를 초기화 하려면 다음과 같이 진행합니다.

    ```cpp
    auto Options = rt::ContextOptions();
    
    Options.LogLevel = rt::LogLevel::Verbose; // setup verbosity of logger.
    Options.LogPath = std::filesystem::path("runtime.log"); // set file path of log. default is stdout.

    auto Context = rt::Context(Options);
    ```

    기본적으로 runtime은 runtime에 설치된 기본 extension을 로드합니다. 하지만 별도의 extension을 제공받았고, 그것이 runtime이 설치된 경로에 존재하지 않는다면 다음 방법으로 extension을 로드할 수 있습니다.

    ```cpp
    Context.loadExtension("path/to/extension");
    ```

=== "Python"
    `rt.Context` 객체를 생성합니다.

    ```python
    context = rt.Context()
    ```

    필요한 경우 `loglevel`이나 `log_path`를 지정할 수 있습니다. `loglevel`을 지정하면 보다 자세한 log가 출력되고, `log_path`를 지정할 경우 그 경로에 logfile을 작성합니다.

    ```python
    context = rt.Context(loglevel=rt.LogLevel.Verbose, log_path="runtime.log")
    ```

    기본적으로 runtime은 runtime에 설치된 기본 extension을 로드합니다. 하지만 별도의 extension을 제공받았고, 그것이 runtime이 설치된 경로에 존재하지 않는다면 다음 방법으로 extension을 로드할 수 있습니다.

    ```python
    context.load_extension("path/to/extension")
    ```

## Load the model
=== "C++"
    모델을 로드하는 방법은 간단합니다. 한 줄의 코드면 모델을 로드할 수 있습니다.

    ```cpp
    auto Model = Context.loadModel("sample_model");
    ```

    모델을 로드한 이후, 모델의 input과 output tensor정보를 얻으려면 다음과 같이 수행합니다.

    ```cpp
    // 모든 input tensor info를 가져올 때 다음과 같이 수행합니다.
    auto InputCount = Model.getInputTensorCount();
    for (auto i = 0; i < InputCount; ++i) {
        auto &Info = Model.getInputTensorInfo(i);
        // do something with Info
    }

    // 만약 특정 index 또는 특정 이름의 tensor의 info를 가져올 때에는 다음과 같이 수행합니다.
    // via index
    auto &Info = Model.getInputTensorInfo(1);
    // via name
    auto &Info = Model.getInputTensorInfo("input1");
    
    // output tensor의 정보를 가져오려면 getInputTensor* 계열 함수 대신
    // getOutputTensor* 계열의 함수를 사용합니다.
    ```

=== "Python"
    모델을 로드하는 방법은 간단합니다. 한 줄의 코드면 모델을 로드할 수 있습니다.

    ```python
    model = context.load_model("sample_model")
    ```

    모델을 로드한 이후, 모델의 input과 output tensor정보를 얻으려면 다음과 같이 수행합니다.

    ```python
    # 모든 input tensor info를 가져올 때 다음과 같이 수행합니다.
    for info in model.input_tensors_info:
        # do something with info
        pass

    # 만약 특정 index 또는 특정 이름의 tensor의 info를 가져올 때에는 다음과 같이 수행합니다.
    # via index
    info = model.get_input_tensor_info(1)
    # via name
    info = model.get_input_tensor_info("input1")

    # output tensor의 정보를 가져오려면 get_input_* 계열 함수 대신
    # get_output_* 계열의 함수를 사용합니다.
    ```

## Create the request
=== "C++"
    `rt::InferRequest` 객체를 생성합니다. `rt::InferRequest` 객체는 하나의 inference를 나타내는 객체이며 독립적입니다.
    따라서 하나의 모델에서 여러개의 `rt::InferRequest` 객체를 생성할 수 있으며, 이를 동시에 실행하여 throughput을 달성할 수 있습니다.

    ```cpp
    auto Req = Model.createRequest();

    // 만약 동시에 여러 inference를 수행하고자 한다면 다음과 같이 여러개를 만들 수 있습니다.
    std::vector<rt::InferRequest> Reqs;
    for (auto i = 0; i < 4; ++i)
        Reqs.push_back(Model.createRequest());
    ```

=== "Python"
    `rt.InferRequest` 객체를 생성합니다. `rt.InferRequest` 객체는 하나의 inference를 나타내는 객체이며 독립적입니다.
    따라서 하나의 모델에서 여러개의 `rt.InferRequest` 객체를 생성할 수 있으며, 이를 동시에 실행하여 throughput을 달성할 수 있습니다.

    ```python
    req = model.create_request()

    // 만약 동시에 여러 inference를 수행하고자 한다면 다음과 같이 여러개를 만들 수 있습니다.
    reqs = []
    for _ in range(4):
        reqs.append(model.create_request())
    ```

## Set input tensors
=== "C++"
    Runtime의 tensor는 사용자가 생성할 수 없습니다. 이는 tensor memory를 device에서 관리하기 때문입니다. 따라서 `rt::Tensor` 객체를 사용자가 생성해서 대입하는 것이 아닌
    모델로부터 `rt::Tensor` 객체를 받아 값을 복사하는 방식으로 데이터를 입력/출력 하게 됩니다.

    모델의 input tensor에 데이터를 입력하기 위해 다음과 같이 수행합니다.

    ```cpp
    // 모든 input tensor에 값을 입력하는 경우 다음과 같이 수행합니다.
    for (auto &&Tensor : Req.getInputTensors()) {
        // 단순 복사를 진행하려면 wrapper method인 copyFrom()을 사용할 수 있습니다.
        Tensor.copyFrom(InputBuffer, InputBufferLength);

        // device memory에 직접 접근하고 싶다면, 다음과 같이 수행합니다.
        auto Buffer = Tensor.getBuffer();
        auto *Ptr = Buffer.data();

        // do something with Ptr
    }

    // Tensor를 하나씩 가져온다면 다음과 같은 방법도 가능합니다.
    auto Tensor = Req.getInputTensor(0);  // via index
    auto Tensor = Req.getInputTensor("input_1"); // via name
    // 데이터를 입력하는 방법은 위와 동일합니다.
    Tensor.copyFrom(...);
    ```

    !!! warning
        위에서 생성한 `Buffer` 변수는 `BufferHolder` RTTI 객체로 runtime 및 backend에서 사용하는 내부 memory를 hold하고 변수 범위를 벗어날 때 자동으로 release합니다.
        따라서 위의 `Buffer`변수의 값을 이동/복사하는 것은 모델 실행시 device에 따라 undefined behavior를 유발할 수 있습니다.
        대신 `rt::Tensor` 객체를 보관하였다가 `getBuffer()` 메서드를 통해 필요시 buffer를 제공 받는 것이 권장됩니다.
    
    !!! warning
        cpp의 `rt::Tensor` 객체는 입력 값의 형식을 검증하지 않습니다. 사용 시 유의를 요합니다.

=== "Python"
    Runtime의 tensor는 사용자가 생성할 수 없습니다. 이는 tensor memory를 device에서 관리하기 때문입니다. 따라서 `rt.Tensor` 객체를 사용자가 생성해서 대입하는 것이 아닌
    모델로부터 `rt.Tensor` 객체를 받아 값을 복사하는 방식으로 데이터를 입력/출력 하게 됩니다.

    모델의 input tensor에 데이터를 입력하기 위해 다음과 같이 수행합니다.

    ```python
    # Tensor 하나하나 값을 입력하는 방법
    for tensor in req.input_tensors:
        arr = np.ndarray(...)
        tensor.copy_from(arr)  # tensor의 값은 numpy의 ndarray를 받습니다.
    
    # Tensor를 하나씩 가져온다면 다음과 같은 방법도 가능합니다.
    tensor = req.get_input_tensor(1)  # via index
    tensor = req.get_input_tensor("input_1")  # via name

    # 한번에 입력하고 싶다면 아래와 같이 수행합니다.
    inputs = [np.random.rand(...) for _ in range(2)]
    req.set_inputs(inputs)

    # dict 도 지원합니다.
    req.set_inputs({
        "input_1": np.random.rand(...),
        "input_2": np.random.rand(...)
    })
    ```

    !!! warning
        Numpy의 `ndarray` 객체는 다양한 형태의 array를 지원합니다. 하지만 OptimaV2 Runtime은 C 형식의 배열(Row-major)이면서 contiguous한 배열만을 지원합니다.
        위의 조건에 맞지 않는 경우 예외를 발생합니다.

## Run inference
=== "C++"
    모델에 입력 값을 입력했다면, inference를 수행할 수 있습니다. OptimaV2 Runtime의 모든 inference는 asynchronous합니다. 이는 `infer()` 메서드를 수행해도 block되지 않는 것을 나타냅니다.
    `wait()` 으로 대기할 수 있지만, callback을 등록하여 throughput을 증가하는 방법이 권장됩니다.

    Synchronous한 방법

    ```cpp
    Req.infer();
    Req.wait();

    // timeout이 필요한 경우 다음과 같이 수행합니다.
    using namespace std::literals; // for ms literal
    if (Req.wait(100ms)) {
        // infer() not finished before 100ms timeout
    } else {
        // infer() finished before 100ms timeout
    }
    ```

    Callback을 이용한 asynchronous한 방법

    ```cpp
    auto &Req = Reqs[0];
    Req.setCallback([&Req](std::exception_ptr Error) {
        if (Error != nullptr) {
            // error was thrown during inference
            return;
        }

        // Get outputs
        // Set input data and infer again

        Req.infer(); // This code is safe.
    });

    Req.infer();
    ```

=== "Python"
    모델에 입력 값을 입력했다면, inference를 수행할 수 있습니다. OptimaV2 Runtime의 모든 inference는 asynchronous합니다. 이는 `infer()` 메서드를 수행해도 block되지 않는 것을 나타냅니다.
    `wait()` 으로 대기할 수 있지만, callback을 등록하여 throughput을 증가하는 방법이 권장됩니다.

    Synchronous한 방법

    ```python
    req.infer()
    req.wait()

    # timeout이 필요한 경우 다음과 같이 수행합니다.
    # ms 단위 정수를 인자로 받습니다.
    if req.wait(100):
        # infer() not finished before timeout
        pass
    else:
        # infer() finished before timeout
        pass
    ```

    Callback을 이용한 asynchronous한 방법

    ```python
    req = ...

    def callback(data):
        # This callback never be called when inference was failed.

        # Get outputs
        # Set input data and infer again

        req.infer()
    
    req.set_callback(callback, ...)
    req.infer()
    ```

    !!! warning
        Python의 구조 상, 전역에 rt.Context, rt.Model 및 rt.InferRequest 객체를 선언한 뒤 callback을 등록할 경우 순환 참조로 인한 메모리 누수가 발생합니다.
        함수 안에서 선언하는 등 전역으로 노출되지 않도록 유의해야 합니다.

## Get output tensors
=== "C++"
    Inference가 완료되었다면 output tensor의 값을 가져올 수 있습니다.
    !!! warning
        inference완료 전이나 inference 시작 전에도 output tensor를 가져와 값을 읽을 수는 있습니다. 하지만 이는 undefined behavior입니다. 권장되지 않습니다.
    
    결과를 가져오기 위해서는 다음과 같이 수행합니다.

    ```cpp
    // 모든 tensor의 값을 가져오려면 다음과 같이 수행합니다.
    for (auto &&Tensor : Req.getOutputTensors()) {
        // 단순 복사를 진행하려면 wrapper method인 copyTo()을 사용할 수 있습니다.
        Tensor.copyTo(OutputBuffer, OutputBufferLength);

        // device memory에 직접 접근하고 싶다면, 다음과 같이 수행합니다.
        auto Buffer = Tensor.getBuffer();
        auto *Ptr = Buffer.data();

        // do something with Ptr
    }

    // Tensor를 하나씩 가져온다면 다음과 같은 방법도 가능합니다.
    auto Tensor = Req.getOutputTensor(0);  // via index
    auto Tensor = Req.getOutputTensor("input_1") // via name
    // 데이터를 출력하는 방법은 위와 동일합니다.
    Tensor.copyTo(...);
    ```

=== "Python"
    Inference가 완료되었다면 output tensor의 값을 가져올 수 있습니다.
    !!! warning
        inference완료 전이나 inference 시작 전에도 output tensor를 가져와 값을 읽을 수는 있습니다. 하지만 이는 undefined behavior입니다. 권장되지 않습니다.
    
    결과를 가져오기 위해서는 다음과 같이 수행합니다.

    ```python
    # Tensor 하나하나 값을 출력하는 방법
    for tensor in req.output_tensors:
        arr = tensor.to_numpy()
    
    # Tensor를 하나씩 가져온다면 다음과 같은 방법도 가능합니다.
    tensor = req.get_output_tensor(1)  # via index
    tensor = req.get_output_tensor("input_1")  # via name

    # 한번에 배열로 가져올 수도 있습니다
    outputs = req.get_outputs()
    ```

## Get profile data
=== "C++"
    Inference 수행 후 프로파일링 정보를 가져올 수 있습니다.
    프로파일링 정보를 통해 어느 부분에서 병목인지 등 최적화를 수행할 때 이용할 수 있습니다.

    프로파일링 정보는 다음 종류를 제공합니다.

    - `ModelInit`: 전체 모델이 로드 될 때 걸린 시간을 나타냅니다.
    - `SubgraphInit`: 모델이 일부분인 subgraph를 로드될 때 걸린 시간을 나타냅니다.
    - `RequestInit`: `rt::InferRequest` 객체를 생성하고 초기화 할 때 걸린 시간을 나타냅니다.
    - `TransferFromInput`: 입력 tensor에서 값을 입력할 때 device로 전송될 때 걸린 시간을 나타냅니다.
    - `TransferToOutput`: 출력 tensor에서 값을 출력할 때 device로 전송할 때 걸린 시간을 나타냅니다.
    - `LayerExecute` 레이어 하나(kernel)를 실행하는데 걸린 시간을 나타냅니다.
    - `Wait`: 레이어 하나 혹은 subgraph 하나를 실행하기 위해 대기한 시간(queue에서 대기, 혹은 다른 레이어/subgraph가 실행 완료될 때 까지 대기)을 나타냅니다.
    - `BufferCopy`: subgraph 사이 이기종간 buffer를 복사할 때 걸린 시간을 나타냅니다.
    - `ModelExecute`: 전체 모델이 실행된 시간(`LayerExecute` + `Wait` + `BufferCopy`)을 나타냅니다.
    - `SubgraphExecute`: subgraph가 실행된 시간(`LayerExecute` + `Wait`)을 나타냅니다.

    ```cpp
    // 프로파일링 정보를 가져오려면 다음과 같이 수행합니다.
    auto Datas = Req.getProfileData();

    for (auto &Data : Datas) {
        // <OptimaV2/Runtime/Utils/StreamHelper.h>를 include 해야합니다.
        std::cout << Data << std::endl;
    }
    ```

    !!! note
        추후 통계 자료와 graph plotting을 제공하는 편의성 기능이 도입될 예정입니다.

=== "Python"
    Inference 수행 후 프로파일링 정보를 가져올 수 있습니다.
    프로파일링 정보를 통해 어느 부분에서 병목인지 등 최적화를 수행할 때 이용할 수 있습니다.

    프로파일링 정보는 다음 종류를 제공합니다.

    - `ModelInit`: 전체 모델이 로드 될 때 걸린 시간을 나타냅니다.
    - `SubgraphInit`: 모델이 일부분인 subgraph를 로드될 때 걸린 시간을 나타냅니다.
    - `RequestInit`: `rt.InferRequest` 객체를 생성하고 초기화 할 때 걸린 시간을 나타냅니다.
    - `TransferFromInput`: 입력 tensor에서 값을 입력할 때 device로 전송될 때 걸린 시간을 나타냅니다.
    - `TransferToOutput`: 출력 tensor에서 값을 출력할 때 device로 전송할 때 걸린 시간을 나타냅니다.
    - `LayerExecute` 레이어 하나(kernel)를 실행하는데 걸린 시간을 나타냅니다.
    - `Wait`: 레이어 하나 혹은 subgraph 하나를 실행하기 위해 대기한 시간(queue에서 대기, 혹은 다른 레이어/subgraph가 실행 완료될 때 까지 대기)을 나타냅니다.
    - `BufferCopy`: subgraph 사이 이기종간 buffer를 복사할 때 걸린 시간을 나타냅니다.
    - `ModelExecute`: 전체 모델이 실행된 시간(`LayerExecute` + `Wait` + `BufferCopy`)을 나타냅니다.
    - `SubgraphExecute`: subgraph가 실행된 시간(`LayerExecute` + `Wait`)을 나타냅니다.

    ```python
    # 프로파일링 정보를 가져오려면 다음과 같이 수행합니다.
    for data in req.profile_data:
        print(data)
    ```

    !!! note
        추후 통계 자료와 graph plotting을 제공하는 편의성 기능이 도입될 예정입니다.
