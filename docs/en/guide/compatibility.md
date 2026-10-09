# Compatibility Status

::: tip GKI 2.0 devices
Android devices with a GKI 2.0 kernel (5.10+) are supported. You can install SukiSU-Ultra as an LKM with the Manager, using a prebuilt module that matches your device's KMI. See [LKM installation](./installation#method-1-lkm-via-the-manager-recommended).
:::

::: warning Legacy Kernel Support
Older kernels (4.4+) are also compatible, but the kernel must be built manually. See [Integration](./how-to-integrate).
:::

::: tip Extended Compatibility
SukiSU-Ultra can support 3.x kernels (3.4-3.18) through additional backports. This is experimental.
:::

## Architecture Support

Currently supports the following processor architectures:

| Architecture | Support Level | Notes |
|-------------|---------------|-------|
| **arm64-v8a** | ✅ Full Support | Primary target architecture |
| **armeabi-v7a** | ✅ Basic Support | Bare minimum functionality |
| **X86_64** | 🟡 Partial Support | Some devices supported |
