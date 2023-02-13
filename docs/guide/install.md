# Installation guide

There are several ways to install OptimaV2. This document will guide you for installing the OptimaV2 in your system.

There are 3 components required to compile and run your model with OptimaV2

* OptimaV2 compiler
* OptimaV2 runtime
* torch2nx 
* torch-mlir (To be deprecated)

This guide will let you install all requirements for using OptimaV2, Assuming you have host system satisfying _System requirements_ and python 3.10 or above installed with virtual environment tool (venv or anaconda).

### System requirements

* **OptimaV2 Compiler**
    * CPU : amd64 (Intel64) based processor
        * Intel Core i5 6600 (or AMD processor of similar performance) or above is recommended
        * arm64 is supposed to work, but we did not finish our tests on it
    * Operating system : Ubuntu linux 22.04
        * Apple macos is also supposed to work, but we did not finish our tests on it
    * At least 8GB or more ram is recommended
    
* **OptimaV2 Runtime**
    * CPU : amd64 (Intel64) or arm64 based processor
        * Tested on following platforms
            * raspberry pi (64bit ubuntu, 64bit raspbian)
            * Qualcomm SM-8150 develepment board (ubuntu 18.04 LTS)
            * amd64 based linux systems
    * Operating system : Linux (ubuntu 18.04 with python 3.6 or above)

## Installing OptimaV2

### A. Using Docker

Using docker image is the simplest way for using OptimaV2 However, this is limited for system with amd64 (or x86_64) and CUDA support. 

From the enerzai docker registry, you can pull the image with this command

```bash
docker pull ezcr.enerzai.com/optima-v2:<version>
```

Now you can run the image using 

```bash
docker run --gpus all -it ezcr.enerzai.com/optima-v2:<version> /bin/bash
```

This image has all requirements already installed including OptimaV2 runtime. You can import torch2nx on your code and try out OptimaV2 directly!

### B. Install using pip
We can also install OptimaV2 components using python pip. We have our dedicated pypi server hosted in Garnet. You can install using pip from it. However, you must be connected to ENERZAi internal network

Installing OptimaV2 via pip is just simple as below

**Step 0:** create conda environment to install OptimaV2 (or any virtual enviornment will do)
```bash
conda create -n OptimaV2
```

**Step 1:** Install torch-mlir (This dependency is going to be deprecated will be removed in future releases)
```bash
pip install --index http://192.168.0.80:12321 --trusted-host 192.168.0.80  --no-deps -f .  --pre torch-mlir==20221010.622
```

**Step 2:** Install torch2nx (zaiConverter)
```bash
pip install --index http://192.168.0.80:12321 --trusted-host 192.168.0.80 zaiConverter==1.4.2
```

**Step 3** Install OptimaV2 compiler
```bash
pip install --index http://192.168.0.80:12321 --trusted-host 192.168.0.80 optima-v2==0.1.0
```

Now your installation is complete for OptimaV2 compiler and user interface. However, you will need to install OptimaV2 runtime to verify OptimaV2 installation is complete

**Step 4:** Install OptimaV2 runtime
```bash
pip install --index http://192.168.0.80:12321 --trusted-host 192.168.0.80 optima-v2-runtime==0.1.0
```

**Step 5:** Verify your installation
```bash
python3 python/tests/test_manager/test.py > log.txt
```
Detailed test output will be written in log.txt. This will take few minutes to complete. If your terminal shows OK at the end, your installation is complete.

If this outputs 'E' in the terminal, it means there was some problem during your installation. In this case, please send us log.txt file and contact us. We will be greateful to help you out.


### C. Building from source (Full)

You can build your own version of OptimaV2. 

**Step 0:** Install requirements

  We first need to install requrements to build and use OptimaV2. For building OptimaV2 with torch2nx, We need following dependencies. Please note this guide assumes you don't have anything installed in your system. If you already have them installed in your system, you can skip this step.

  * Ubuntu 22.04
  * python 3.10 or above
  * Cython
  * LLVM 15.0.1 (with clang and lld)
  * MLIR
  * protocol buffer v21.7 : **NOTE** - Protocol buffer must have been installed with -fPIC (position independent code) option. If your installation does not support it, you will have to re-install it. Please refer to section 'h' for installing protocol buffer in proper way.
  * Optional : anaconda (or venv is possible)
  * Optional : NVIDIA CUDA (optional)

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

**Step 2**: Install torch2nx (You will need read privilege to torch2nx)

```bash
pip install git+ssh://git@github.com/ENERZAi/torch2nx 
```

**Step 3:** Install runtime (For this process, you will need to be inside ENERZAi local network)

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

**Step 5:** Verify your installation

```bash
# You can run simple test to verify your installation
# From the OptimaV2 root directory
python3 python/tests/test_manager/test.py > log.txt
```

If this finishes with OK, it verifies your installation was successful