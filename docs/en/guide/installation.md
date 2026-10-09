# Installation Guide

This guide provides comprehensive instructions for installing SukiSU-Ultra on your Android device. Please follow the steps carefully.

## Prerequisites

Before you begin, ensure you have the following:

- [ ] A compatible device. Check the [Compatibility Guide](./compatibility.md) for details.
- [ ] Unlocked bootloader.
- [ ] Custom recovery installed, such as TWRP.
- [ ] Basic knowledge of flashing custom ROMs and kernels.
- [ ] Your device's kernel source or a compatible pre-built kernel.

## Installation Methods

There are several ways to install SukiSU-Ultra, depending on your device and preference.

### Method 1: LKM via the Manager (Recommended)

LKM mode installs SukiSU-Ultra as a Loadable Kernel Module. The Manager patches your boot image with a prebuilt module that matches your device's KMI, so you do not need to build a kernel.

#### Steps:

1.  **Install the Manager**: Download the latest `SukiSU_*.apk` from the [GitHub releases](https://github.com/SukiSU-Ultra/SukiSU-Ultra/releases) and install it.
2.  **Start the installer**: On the home screen, tap the install card (**Tap to install**).
3.  **Choose how to provide the boot image**:
    -   **Direct install (Recommended)**.
    -   **Select a file and patch**: pick a boot image. The Manager recommends the image of the partition that applies to your device (`boot`, `init_boot` or `vendor_boot`). If you enable **Backup as stock image**, make sure the image you picked is a stock image.
    -   **Download a file and patch**: enter the URL of a full OTA image or a factory image. The Manager looks for a `boot`, `init_boot` or `vendor_boot` partition inside it.
    -   **Use local LKM file**: use your own module instead of the bundled one. Only `.ko` files are supported.
4.  **Select the KMI**: the Manager shows the KMI of your device (*KMI version of this device*). Pick the matching one if you are asked.
5.  **Flash and reboot.**

::: tip Prebuilt LKM images
Release builds ship prebuilt modules for these KMIs (each for aarch64 and x86_64): `android12-5.10`, `android13-5.10`, `android13-5.15`, `android14-5.15`, `android14-6.1`, `android15-6.6`, `android16-6.12` and `android17-6.18`. See the [latest release](https://github.com/SukiSU-Ultra/SukiSU-Ultra/releases/latest) for the current list.
:::

::: warning Jailbreak mode
In **Jailbreak mode**, flashing a partition on a device with a locked bootloader breaks AVB (Android Verified Boot) and may leave the device unable to boot.
:::

### Method 2: Using Pre-built GKI Packages

This is the recommended method for devices with Generic Kernel Image (GKI) 2.0, such as many Xiaomi, Redmi, and Samsung models.[^1]

[^1]: This method is not suitable for devices from manufacturers that heavily modify the kernel, like Meizu, OnePlus, Realme, and Oppo.

#### Steps:

1.  **Download GKI Build**: Visit our [resources section](./links.md) to find the appropriate GKI build for your device's kernel version. Download the `.zip` file that includes `AnyKernel3` in its name.
2.  **Flash via Recovery**:
    - [ ] Boot your device into TWRP recovery.
    - [ ] Select "Install".
    - [ ] Navigate to the downloaded `AnyKernel3` zip file and select it.
    - [ ] Swipe to confirm the flash.
    - [ ] Once flashing is complete, reboot your system.
3.  **Verify Installation**:
    - [ ] Install the SukiSU-Ultra Manager app.
    - [ ] Open the app and check if root access is granted and working correctly.
    - [ ] You can also verify the new kernel version in your device's settings.

::: details File Format Guide
The `.zip` archive without a suffix is uncompressed. The `.gz` suffix indicates compression used for specific models.
:::

### Method 3: Custom Build for OnePlus Devices

For OnePlus devices, you'll need to create a custom build.

#### Steps:

1.  **Gather Device Information**: You will need:
    -   Your kernel version (e.g., `5.10`, `5.15`).
    -   Your processor's codename.
    -   The branch and configuration files from the OnePlus open-source kernel repository.
2.  **Create Custom Build**: Use the link in our [resources section](./links.md) to generate a custom build with your device's information.
3.  **Flash the Build**:
    - [ ] Download the generated `AnyKernel3` zip file.
    - [ ] Boot into recovery.
    - [ ] Flash the zip file.
    - [ ] Reboot and verify the installation.

### Method 4: Manual Kernel Integration (Advanced)

This method is for advanced users who are building a kernel from source.

#### Integration Scripts:

-   **Main Branch (LKM)**:
    ```sh [bash]
    curl -LSs "https://raw.githubusercontent.com/SukiSU-Ultra/SukiSU-Ultra/main/kernel/setup.sh" | bash -s main
    ```
-   **Builtin Branch**:
    ```sh [bash]        
    curl -LSs "https://raw.githubusercontent.com/SukiSU-Ultra/SukiSU-Ultra/main/kernel/setup.sh" | bash -s builtin
    ```

::: warning Required Kernel Configs
For KPM support, you must enable `CONFIG_KPM=y`.
For non-GKI devices, you also need to enable `CONFIG_KALLSYMS=y` and `CONFIG_KALLSYMS_ALL=y`.
:::

## Post-Installation

### Maintaining Root After OTA Updates

To keep root access after an Over-the-Air (OTA) update, follow these steps ==before rebooting==.

1.  **Flash to Inactive Slot**:
    - [ ] After the OTA update is downloaded and installed, **do not reboot**.
    - [ ] Open the SukiSU-Ultra Manager.
    - [ ] Go to the flashing/patching interface.
    - [ ] Select your `AnyKernel3` kernel zip file.
    - [ ] Choose to install it to the inactive slot.
    - [ ] Once flashed, you can safely reboot.
2.  **LKM mode (recommended)**: after the OTA has been installed and before you reboot, start the Manager's installer from [Method 1](#method-1-lkm-via-the-manager-recommended) and choose **Install to inactive slot (After OTA)**.

::: tip
For non-GKI devices, the safest method to retain root after an OTA is to use TWRP to flash the kernel again.
:::

## Verification Checklist

After installation, please verify the following:

- [ ] **Manager App**: The SukiSU-Ultra Manager app opens and shows a successful root status.
- [ ] **Root Access**: Root checker apps confirm that root access is working.
- [ ] **Kernel Version**: The kernel version in `Settings > About Phone` reflects the SukiSU-Ultra kernel.

## Troubleshooting

If you encounter any issues:

1.  Double-check the [Compatibility Guide](./compatibility.md).
2.  Visit our [GitHub repository](https://github.com/sukisu-ultra/sukisu-ultra) for issues and solutions.
3.  Join our [Telegram community](https://t.me/sukiksu) for live support.

::: danger Safety Reminder
⚠️ **Always have a backup!** Keep a copy of your original `boot.img` and be prepared to restore your device if something goes wrong.
:::
