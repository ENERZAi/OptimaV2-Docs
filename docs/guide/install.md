# Installation guide

__version__ : 0.1.0 alpha

This document will guide you for installing the OptimaV2 in your systemm and OptimaV2 runtime on your target.

There are 3 components required to compile and run your model with OptimaV2

* OptimaV2 compiler
* OptimaV2 runtime
* torch2nx 
* torch-mlir (To be deprecated)

This guide will let you install all requirements for using OptimaV2, Assuming you have host system satisfying _System requirements_ connected to ENERZAi local network, and python 3.10 or above installed with virtual environment tool (venv or anaconda).

Since OptimaV2 is on alpha testing phase, it is not yet open to public network yet. Therefore, you must be connected to ENERZAi local network for installation. We apologize for this inconvenience.

### System requirements

=== "OptimaV2 Compiler"
    * CPU : amd64 (Intel64) based processor
        * Intel Core i5 6600 (or AMD processor of similar performance) or above is recommended
        !!! note 
            arm64 is supposed to work, but we did not finish our tests on it
    * Operating system : Ubuntu linux 22.04
    !!! note 
        Apple macos is also supposed to work, but we did not finish our tests on it
    * At least 8GB or more ram is recommended
    
=== "OptimaV2 Runtime"
    * CPU : amd64 (Intel64) or arm64 based processor
        * Tested on following platforms
            * raspberry pi (64bit ubuntu, 64bit raspbian)
            * Qualcomm SM-8150 develepment board (ubuntu 18.04 LTS)
            * amd64 based linux systems
    * Operating system : Linux (ubuntu 18.04 with python 3.6 or above)
  

## Installing OptimaV2

=== "Using Docker"

    Using docker image is the simplest and fastest way to try using OptimaV2. We recommend this way if you want to try OptimaV2 in simple way.

    A. __CPU only__

    For the CPU only version, we provide two docker images. Debug build, and Release build. Both of them of capable of experiencing full funcitonality of OptimaV2 (except functionalties that requires cuda support). However, release build is more optimized to performance, while debug build allows loading symbols for inspecting code with debugger.

    Pull the default optima-v2 image 

    ```bash
    # For debug mode
    docker pull ezcr.enerzai.com/optima-v2-debug:0.1.0
    # For release mode
    docker pull ezcr.enerzai.com/optima-v2-release:0.1.0
    ``` 

    Run the image with optima-v2

    ```bash
    # For debug mode
    docker run -v /var/run/docker.sock:/var/run/docker.sock -it ezcr.enerzai.com/optima-v2-debug:0.1.0 /bin/bash
    # For release mode
    docker run -v /var/run/docker.sock:/var/run/docker.sock -it ezcr.enerzai.com/optima-v2-release:0.1.0 /bin/bash
    ```

    These docker images should have complete setup for using and testing OptimaV2 and OptimaV2 runtime on cpu.

    !!! note 
        We Should mount docker socket, so we can use DooD(docker out of docker) in the image. SNPE converter integrated in OptimaV2 uses DooD.

    B. __With CUDA__

    If you can use CUDA, we also provide us docker image with CUDA support. This way, OptimaV2 can build project towards CUDA supported GPU targets.

    From the enerzai docker registry, you can pull the image with this command

    ```bash
    docker pull ezcr.enerzai.com/optima-v2-gpu:0.1.0
    ```

    Now you can run the image using 

    ```bash
    docker run --gpus all -it ezcr.enerzai.com/optima-v2:0.1.0 /bin/bash
    ```

    This image has all requirements already installed including OptimaV2 runtime. You can import torch2nx on your code and try out OptimaV2 directly!

=== "Install using pip"
    We can also install OptimaV2 components using python pip. We have our dedicated pypi server hosted in Garnet. You can install using pip from it. However, you must be connected to ENERZAi internal network

    __Requirements__

     * python 3.10
     * Ubuntu 22.04
     * virtual python environment (recommended)
     * Connection to enerzai internal network 
       * We will have to access Garnet hosted pypi server

    Installing OptimaV2 via pip is just simple as below

    **Step 0:** create conda environment to install OptimaV2 (or any virtual enviornment will do)
    ```bash
    conda create -n OptimaV2
    ```
    We recommend you installing OptimaV2 on python virtual environment to prevent version mismatches with your original installation. Moreover, we highly recommend you to not install it with 'sudo', since it will install and might change pre-installed package versions system wide.

    **Step 1:** Install requirements

    We need to install some required packages for running OptimaV2
    ```bash
    sudo apt-get update
    sudo apt-get install -y libmlir-15-dev mlir-15-tools lld-15 llvm-15
    ```

    **Step 2:** Install torch-mlir (This dependency is going to be deprecated will be removed in future releases)
    ```bash
    pip install --index http://192.168.0.80:12321 --trusted-host 192.168.0.80  --no-deps -f .  --pre torch-mlir==20221010.622
    ```

    **Step 3:** Install torch2nx and quan (zaiConverter)
    ```bash
    pip install --index http://192.168.0.80:12321 --trusted-host 192.168.0.80 quan==0.0.1
    pip install --index http://192.168.0.80:12321 --trusted-host 192.168.0.80 zaiConverter==1.4.2
    ```
    This process will install zaiOptimizer and quan. These packages are used to read pytorch and convert it into some format that OptimaV2 can understand.

    **Step 4** Install OptimaV2 compiler
    ```bash
    pip install --index http://192.168.0.80:12321 --trusted-host 192.168.0.80 optima-v2==0.1.0
    ```

    Now, your installation should be complete for OptimaV2 compiler and user interface. You should have no problem compiling your model down to runtime binary. However, We recommend you to install OptimaV2 runtime and verify your OptimaV2 installation before using it. Such steps are described from Step 4.

    **Step 5:** Install OptimaV2 runtime (Recommended)
    
    Refer to **Installing OptimaV2 Runtime** in the next section for more detail

    !!! warning
        If you install with pip, some layers working with torch-mlir would not work. As torch-mlir will be deprecated and replaced with Opto based kernels, This issue will be fixed as soon as possible.

        __Currently supported kernels with Opto :__ add, maxpool2d, conv2d (or depthwise conv2d), interpolate, relu, prelu

=== "Building from source (Full)"

    You can build your own version of OptimaV2. 
    **Step 0:** Install requirements

    We first need to install requrements to build and use OptimaV2. For building OptimaV2 with torch2nx, We need following dependencies. Please note this guide assumes you don't have anything installed in your system. If you already have them installed in your system, you can skip this step.

    * Ubuntu 22.04
    * python 3.10 or above
    * Cython
    * LLVM 15.0.1 (with clang and lld)
    * MLIR
    * protocol buffer v21.7 
    * Optional : anaconda (or venv is possible)
    * Optional : NVIDIA CUDA (optional)
    !!! note
        Protocol buffer must have been installed with -fPIC (position independent code) option. If your installation does not support it, you will have to re-install it. Please refer to section 'h' for installing protocol buffer in proper way.

    a. First, we need to install llvm from apt-get first for building MLIR. (MLIR would not build if it was built with gcc & g++)

        apt-get update && apt-get install -yq wget && wget https://apt.llvm.org/llvm-snapshot.gpg.key &&\
        apt-key add llvm-snapshot.gpg.key &&\    
        apt-get update &&\
        apt-get install software-properties-common -yq &&\
        apt-add-repository "deb http://apt.llvm.org/jammy/ llvm-toolchain-jammy-15 main" &&\
        apt-get update && apt-get install clang-15 libomp-dev lld -yq


    b. Update alternatives 

        update-alternatives --install /usr/bin/clang clang /usr/bin/clang-15 1 &&\
        update-alternatives --install /usr/bin/clang++ clang++ /usr/bin/clang++-15 1

    c. Install dependencies and python3

        apt-get update && \
        apt-get -yq install cmake \
        lcov git ninja-build python3 python3-pip \
        build-essential checkinstall zlib1g-dev \
        libssl-dev wget clang-format && \
        apt-get clean && \
        rm -rf /var/lib/apt/lists/*


    d. Install python package dependencies (You can optionally skip this process, but we recommend using virtual python environment from here  to reduce potential problems caused by version mismatches)

        pip3 install numpy==1.23.3 pybind11==2.10.0 lit==15.0.1 networkx==2.8.6 torch==1.13.0 Cython

    e. Now, we clone the LLVM project. We use version 15.0.1

        git clone --depth 1 --branch llvmorg-15.0.1 https://github.com/llvm/llvm-project.git

    f. Now, we can build our project using cmake.
    
    This process will install LLVM 15 on your system with MLIR support.

        # Without CUDA
        cmake -S llvm-project/llvm -B llvm-project/build -G Ninja  \
            -DCMAKE_BUILD_TYPE=Release \
            -DPython3_EXECUTABLE:FILEPATH="<path to your python3 executable>" \
            -DMLIR_ENABLE_BINDINGS_PYTHON=ON \
            -DLLVM_ENABLE_PROJECTS="mlir;clang;clang-tools-extra;libc;libclc;lld"\
            -DLLVM_ENABLE_RUNTIMES="libcxx;libcxxabi;libunwind;compiler-rt"\
            -DLLVM_TARGETS_TO_BUILD="AArch64;ARM;X86;Hexagon;RISCV;NVPTX;AMDGPU;WebAssembly"\
            -DLLVM_INSTALL_UTILS=ON\
            -DCMAKE_C_COMPILER=clang\
            -DCMAKE_CXX_COMPILER=clang++\
            -DLLVM_ENABLE_LLD=ON\
            -DMLIR_ENABLE_SPIRV_CPU_RUNNER=ON\
            -DMLIR_ENABLE_VULKAN_RUNNER=ON\
            -DMLIR_INCLUDE_TESTS=ON \
            -DMLIR_INCLUDE_INTEGRATION_TESTS=ON
            
        # With CUDA : If you can use CUDA, you can use this script!
        cmake -S llvm-project/llvm -B llvm-project/build -G Ninja  \
            -DCMAKE_BUILD_TYPE=Release \
            -DPython3_EXECUTABLE:FILEPATH="<path to your python3 executable>" \
            -DMLIR_ENABLE_BINDINGS_PYTHON=ON \
            -DLLVM_ENABLE_PROJECTS="mlir;clang;clang-tools-extra;libc;libclc;lld"\
            -DLLVM_ENABLE_RUNTIMES="libcxx;libcxxabi;libunwind;compiler-rt"\
            -DLLVM_TARGETS_TO_BUILD="AArch64;ARM;X86;Hexagon;RISCV;NVPTX;AMDGPU;WebAssembly"\
            -DLLVM_INSTALL_UTILS=ON\
            -DCMAKE_C_COMPILER=clang\
            -DCMAKE_CXX_COMPILER=clang++\
            -DLLVM_ENABLE_LLD=ON\
            -DMLIR_ENABLE_CUDA_RUNNER=ON\
            -DMLIR_ENABLE_SPIRV_CPU_RUNNER=ON\
            -DMLIR_ENABLE_VULKAN_RUNNER=ON\
            -DCMAKE_CUDA_COMPILER="<path to your nvcc compiler>"\
            -DMLIR_INCLUDE_TESTS=ON \
            -DMLIR_INCLUDE_INTEGRATION_TESTS=ON
    

    g. Now, we build and install MLIR. This process might take several minutes depending on your system. You also need root privilege to install MLIR on your system.

        cmake --build llvm-project/build --target all -j"$(nproc)"
        sudo cmake --install llvm-project/build && \
        ln -s /app/llvm-project/build/bin/llvm-lit /usr/local/bin/llvm-lit

    h. Install protocol buffer. 
    
        git clone --depth 1 --branch v21.7 https://github.com/protocolbuffers/protobuf.git
        cd protobuf
        git submodule update --init
        # protocol buffer must be installed with Position independent code option turned on
        cmake -G Ninja -DCMAKE_POSITION_INDEPENDENT_CODE=ON . && cmake --build . && sudo cmake --install .

        

    **Step 1**: Download OptimaV2 source code (You will need read privilege to torch2nx)

    ```bash
    git clone git@github.com:ENERZAi/OptimaV2.git
    cd OptimaV2
    git submodule update --init --remote --recursive
    ```

    **Step 2**: Install torch2nx(zaiConverter)

    ```bash
    pip install --index http://192.168.0.80:12321 --trusted-host 192.168.0.80 zaiConverter==1.4.2
    ```

    **Step 3:** Install runtime

    ```bash
    # This installs runtime from enerzai private pypi. Therefore, you need to be inside the enerzai internal network
    pip install --index http://192.168.0.80:12321 --trusted-host 192.168.0.80 optima-v2-runtime==0.1.0
    ```

    **Step 4:** build .whl file and install whl file

    ```bash
    # Execute from the OptimaV2 project root folder
    python3 setup.py bdist_wheel
    pip install dist/optima_v2-0.1.0-cp310-cp310-linux_x86_64.whl
    ```

    **Step 5:** Install OptimaV2 Runtime

    Refer to **Installing OptimaV2 Runtime** in the next section for more details

## Installing OptimaV2 Runtime
You can skip these if you only compile the model. But if you intend to run model on target device, OptimaV2 Runtime should be installed on host device.
=== "Install with prebuilt binaries"
    This is for users who wants to use Runtime C++ API.
    First, you need to install requirements for OptimaV2 Runtime. Requirements are listed below:
    - Compiler toolchain which can compile C++ 17 sources
        - Clang 10 or above
        - GCC 8 or above (minimum version to compile, 9 or above recommended)
        - Android NDK (API Level 26 or above)
    - CMake 3.21 or above
    - Make or Ninja
    __Step 1.__ Install requirements
    ```
    # Use GCC
    sudo apt install build-essentials cmake ninja-build
    # Use GCC with cross compile toolchains
    # ARM64
    sudo apt install crossbuild-essential-arm64 cmake ninja-build
    # ARM
    sudo apt install crossbuild-essential-armhf cmake ninja-build
    # Use Clang
    sudo apt install llvm clang cmake ninja-build
    ```
    __Step 2.__ Download prebuilt OptimaV2 Runtime
    Prebuilt binaries are downloaded from EZDist. Link here: [Download](http://192.168.0.80:32123/packages/OptimaV2-Runtime)
    After download the runtime, extract downloaded zip file to preferred location. `/usr/local` is suggested but anywhere is fine.
=== "Install via pip"
    This is for users who want to use Runtime Python API, and it is simplest way to use the runtime.
    OptimaV2 Runtime is provided on internal pypi server. Because of that reason, to install OptimaV2 Runtime Python API, you must be connected to ENERZAi internal network.
    __Step 1__: Create new virtual environment to install OptimaV2 Runtime(Not a mandatory but recommended)
    ```
    # use conda
    conda create -n OptimaV2-Runtime
    # you can also use virtualenv
    python -m venv .venv
    source .venv/bin/activate
    ```
    __Step 2__: Install OptimaV2 Runtime
    ```
    pip install --index http://remote.enerzai.com:12321 --trusted-host remote.enerzai.com optima-v2-runtime==0.1.0
    ```
=== "Build from source (full)"
    You can build your own version of OptimaV2 Runtime from source.
    First, you needs to install requirements for OptimaV2 Runtime. Requirements are listed below:
    
    - Ubuntu 18.04 or later. (Ubuntu 20.04 recommended)
    - Python 3.6 or above. (Python 3.10 recommended)
    - Compiler toolchain which can compile C++ 17 sources
        - Clang 10 or above
        - GCC 8 or above (minimum version to compile, 9 or above recommended)
    - cURL (required for install scripts)
    - Git
    !!! note
        Due to `protoc` and `cmake` supports only AMD64(x86_64, x64) and ARM64(aarch64) systems, only AMD64 and ARM64 systems can build OptimaV2 Runtime.
    !!! note
        You can use Docker image that requirements are preinstalled. After __Step 1__, start container with volume mount
        (`docker run --rm -it -v /path/to/repo:/workspace/app ezcr.enerzai.com/optima-v2-runtime:0.1.3`)
        and type `cd /workspace/app` inside Docker container. Then jump to __Step 5.__
        Docker image supports AMD64 and ARM64 platforms and cross build supports only on AMD64 platform.
    !!! note
        If you want to cross compile OptimaV2 Runtime for other devices(Raspberry Pi, QRB, etc.), please refer [here](../runtime/cross_build.md)
    __Step 1.__ Clone a repository
    !!! note
        This requires permissions to access OptimaV2-Runtime repository. Please contact OptimaV2 team. The team will grant you permissions for access the repository.
    ```bash
    git clone git@github.com:ENERZAi/OptimaV2-Runtime
    cd OptimaV2-Runtime
    ```
    __Step 2.__ Create new virtual environment
    ```bash
    # use conda
    conda create -n OptimaV2-Runtime
    # you can also use virtualenv
    python3 -m venv .venv
    source .venv/bin/activate
    ```
    __Step 3.__ Install python requirements
    ```bash
    pip install -r requirements.txt
    ```
    __Step 4.__ Install runtime requirements
    ```bash
    # Install cmake
    # This script auto-detect architecture of host system. You can change this with "--arch" flag. Support architectures: amd64, arm64
    # Default install path is "/usr/local". So `sudo` is required. You can change this path with "--install" flag.
    sudo Scripts/download-cmake.sh
    # Install protoc
    # This script auto-detect architecture of host system. You can change this with "--arch" flag. Support architectures: amd64, arm64
    # Default install path is "/usr/local". So `sudo` is required. You can change this path with "--install" flag.
    sudo Scripts/download-protoc.sh
    # Install SNPE
    # This is a mandatory if you intend to enable SNPE backend.
    # Also, AMD64 systems are only supported system.
    Scripts/download-snpe.sh
    export SNPE_ROOT=$(pwd)/snpe-1.68.0.3932
    ```
    OptimaV2 Runtime uses its own dependency management script called `install` and requirements may differ depends on what features you enabled.
    To install requirements properly, please refer table below.
    
    | feature          | `install` packages     | `cmake` argument      | note                                                          |
    |------------------|------------------------|-----------------------|---------------------------------------------------------------|
    | Base requirement | `protobuf fmt`         | -                     |                                                               |
    | Testing          | `doctest`              | `-DENABLE_TESTING=ON` | Disabled on Release build                                     |
    | Python API       | `pybind11`             | `-DENABLE_PYTHON=ON`  |                                                               |
    | Native backend   | `openmp`               | `-DENABLE_NATIVE=ON`  |                                                               |
    | SNPE backend     | -                      | `-DENABLE_SNPE=ON`    | This feature requires invoke `download-snpe.sh` script above. |
    !!! note
        There are many flags that are not documented yet. Although you can declare these flags, it`ll not working.
    After decide which target and features are enabled, run commands below:
    ```bash
    # Install requirements.
    # example: python -m Scripts.install protobuf fmt
    # for more detail: python -m Scripts.install --help
    python -m Scripts.install <packages>
    ```

The `install` script will auto-detect compiler and build dependencies for OptimaV2 Runtime. If you want to force `install` script to use specific compiler, flags in below list can be used.

- `--ignore-clang` : Make `install` ignore Clang. This forces `install` to use GCC.
- `--use-clang=VERSION` : Use specific version of Clang. If not found, `install` will be failed.
- `--ignore-gcc` : Make `install` ignore GCC. This forces `install` to use Clang.
- `--use-gcc=VERSION` : Use specific version of GCC. If not found, `install` will be failed.
  
After run command above, the folder named `third_party` will be created.
Please check name of folder inside `third_party/installed` folder. Its name is your `triplet` that required below.
If you have problems running `install` script, please let us know. We`ll support you.

__Step 5.__ Configure cmake

```bash
# example: cmake -DTHIRD_PARTY_ROOT="$(pwd)/third_party/installed/x64-linux" -DENABLE_NATIVE=ON -B build -S . -G Ninja
# default install path is: "${CMAKE_BUILD_DIR}/install". To override this, use "-DCMAKE_INSTALL_PREFIX=<install>".
cmake -DTHIRD_PARTY_ROOT="$(pwd)/third_party/installed/<triplet>" <cmake flags> -B build -S . -G Ninja
```
If you want to force CMake using Clang, add this flag: `-DCMAKE_TOOLCHAIN_FILE=CMake/UseClang.cmake`. You also can force CMake using GCC via this flag: `-DCMAKE_TOOLCHAIN_FILE=CMake/UseGCC.cmake`.
These CMake script will auto-detect compiler and use it. If you want to use specific compiler version, use this flag for Clang: `-DTARGET_LLVM_VERSION=VERSION` and this flag for GCC: `-DTARGET_GCC_VERSION=VERSION`.

__Step 6.__ Build the runtime

```bash
cmake --build build --target install
```
__Step 7.__ Generate python wheel

This is extra step for who want to build python wheels.
To generate wheel, you should enable python binding feature(`-DENABLE_PYTHON=ON`) and build with target `install`.
!!! note
    To generate python wheel, it is not allowed to change install prefix to usual install path like `/usr` or `/usr/local`. `setup.py` copies built libraries in install path during build wheel and does not check files whether are part of the runtime or not. It may cause undesired behavior. To prevent this problem, use other paths or do not change install path.
`setup.py` in OptimaV2 Runtime re-uses built libraries rather than re-build entire runtime again. To inform `setup.py` to where is library located, enviroment variables are used.
``` bash
INSTALL_PATH=<install_path> pip wheel --wheel-dir wheel-out Bindings/Python
```
You can see built wheel file located in `wheel-out` folder.

## Troubleshooting
1. Building MLIR fails with compiler or linker errors
      * It turns out compilation with MLIR fails when built with GNU toolchains. We recommend using LLVM toolchain for building MLIR
2. Pip install fails to find corresponding modules
      1. Check if you python version matches python 3.10. If you don't have it, we recommend creating the environment virtually.
      2. If your versions match, check if you are connected to ENERZAi internal network
      3. If it still doesn't work, don't hesitate to contact us.
## Contact us
We will be always grateful to help you with using OptimaV2 runtime. 
You can contact one of our team members

* Jaewoo Kim (김재우) [jaewoo.kim@enerzai.com](mailto:jaewoo.kim@enerzai.com)
* Jaeyoon Yoo (유재윤) [jaeyoon.yoo@enerzai.com](mailto:jaeyoon.yoo@enerzai.com)
* Jinhwan Shin (신진환) [jinhwan.shin@enerzai.com](mailto:jinhwan.shin@enerzai.com)
* Changbeom Kang (강창범) [changbeom.kang@enerzai.com](mailto:changbeom.kang@enerzai.com)
* Seongju Lee (이성주) [seongju.lee@enerzai.com](mailto:seongju.lee@enerzai.com)