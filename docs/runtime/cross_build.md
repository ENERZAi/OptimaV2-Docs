How to cross compile OptimaV2 Runtime
=====================================

This document is intended for users who want to build OptimaV2 Runtime for devices that cannot compile on local machine.(too slow, lack of native toolchains, etc.)

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


__Step 4.__ Install cross compile toolchain

=== "Linux"
    To cross compile for Linux device, you need cross compile toolchain for target device. If your hardware provider gives you specific toolchain to compile, please let us know. We`ll support you.

    Otherwise, you can install cross compile toolchain via package manager like `apt`.

    | Target Architecture       | Required Tools (in `apt`)                           |
    |---------------------------|-----------------------------------------------------|
    | x86 (a.k.a i386)          | `crossbuild-essential-i386` or `clang`<sup>1</sup>  |
    | x64 (a.k.a x86_64, AMD64) | `crossbuild-essential-amd64` or `clang`<sup>1</sup> |
    | ARM<sup>2</sup>           | `crossbuild-essential-armhf` or `clang`<sup>1</sup> |
    | AArch64(a.k.a ARM64)      | `crossbuild-essential-arm64` or `clang`<sup>1</sup> |

    Other archtectures not available in list above are not supported.

    <sup>1</sup> Clang supports cross compilation in native. You also need `lld` to avoid installing extra GNU toolchain.  
    <sup>2</sup> On ARM machines, OptimaV2-Runtime requires ARM v7-A and hardware floating point support.

=== "Android"
    To cross compile for Android device, you need Android NDK that supports Android Platform 26 or above for cross compile toolchain.

    After install Android NDK, you also need some environment variable.
    ``` bash
    export ANDROID_NDK_ROOT='/your/ndk/path'  # example: ~/android-ndk-r25b
    export ANDROID_PLATFORM='target-android-platform-level'  # example: android-26
    ```

__Step 5.__ Install runtime requirements
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

Also, `install` script has concept "triplet" to support installing packages for various architecutures and OSes.

Supported triplets are:

- `x64-linux`
- `aarch64-linux`
- `arm-linux`
- `x64-android`
- `aarch64-android`
- `arm-android`

To install requirements with triplet, please run command below.
``` bash
# Install requirements.
# example: python -m Scripts.install --triplet aarch64-linux protobuf fmt
# for more detail: python -m Scripts.install --help
python -m Scripts.install --triplet <triplet> <packages>
```

The `install` script will auto-detect compiler and build dependencies for OptimaV2 Runtime. If you want to force `install` script to use specific compiler, flags in below list can be used.

- `--ignore-clang` : Make `install` ignore Clang. This forces `install` to use GCC.
- `--use-clang=VERSION` : Use specific version of Clang. If not found, `install` will be failed.
- `--ignore-gcc` : Make `install` ignore GCC. This forces `install` to use Clang.
- `--use-gcc=VERSION` : Use specific version of GCC. If not found, `install` will be failed.

!!! note
    On Android target(triplets end with `-android`), above flags are ignored.

After run command above, the folder named `third_party` will be created.

If you have problems running `install` script, please let us know. We`ll support you.

__Step 6.__ Configure cmake

To configure CMake for cross platform, you need to use toolchain file `CrossLinux-<arch>.cmake` for Linux or `CrossAndroid-<arch>.cmake` for Android in `CMake` folder of the repository(`<arch>` is same value in triplet).

```bash
# example: cmake -DTHIRD_PARTY_ROOT="$(pwd)/third_party/installed/aarch64-linux" \
#                -DENABLE_NATIVE=ON \
#                -DCMAKE_TOOLCHAIN_FILE=CMake/CrossLinux-aarch64.cmake \
#                -B build -S . -G Ninja
# Default install path is: "${CMAKE_BUILD_DIR}/install".
# To override this, use "-DCMAKE_INSTALL_PREFIX=<install>".
cmake -DTHIRD_PARTY_ROOT="$(pwd)/third_party/installed/<triplet>" \
      -DCMAKE_TOOLCHAIN_FILE=CMake/<toolchain>.cmake \
      <cmake flags> \
      -B build -S . -G Ninja
```

These CMake script will auto-detect compiler and use it. If you want to use specific compiler version, use this flag for Clang: `-DTARGET_LLVM_VERSION=VERSION` and this flag for GCC: `-DTARGET_GCC_VERSION=VERSION`. 

!!! note
    On Android target, above flags are ignored.

__Step 7.__ Build the runtime
```bash
cmake --build build --target install
```

__Step 8.__ Generate python wheel

This is extra step for who want to build python wheels.

To generate wheel, you should enable python binding feature(`-DENABLE_PYTHON=ON`) and build with target `install`. Also, python binding does not support for Android platforms.

!!! warning
    To generate python wheel, it is not allowed to change install prefix to usual install path like `/usr` or `/usr/local`. `setup.py` copies built libraries in install path during build wheel and does not check files whether are part of the runtime or not. It may cause undesired behavior. To prevent this problem, use other paths or do not change install path.  

To make python wheel for cross platform, you`ll need these requirements:

- Python for host
- Python for target (yes, cross-built python is mandatory and must be same version with the host)
- crossenv

!!! note
    This document assumes you already have python for host and target.  
    From here, `HOST_PYTHON` refers python for the host and `TARGET_PYTHON` refers python for the target.

1. Install crossenv on host python
``` bash
HOST_PYTHON -m pip install crossenv
```

2. Create cross environment
``` bash
HOST_PYTHON -m crossenv TARGET_PYTHON cross-venv
source cross-venv/bin/activate
```

3. Update pip, wheel and setuptools
``` bash
cross-pip3 install --upgrade pip wheel setuptools
build-pip3 install --upgrade pip wheel setuptools
```

4. Generate python wheel
`setup.py` in OptimaV2 Runtime re-uses built libraries rather than re-build entire runtime again. To inform `setup.py` to where is library located, enviroment variables are used.

``` bash
INSTALL_PATH=<install_path> cross-pip3 wheel --wheel-dir wheel-out Bindings/Python
```

You can see built wheel file located in `wheel-out` folder.