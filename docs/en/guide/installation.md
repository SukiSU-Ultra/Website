# Installation

## Usage

### Universal GKI

Please **all** refer to [KernelSU Installation Guide](https://kernelsu.org/zh_CN/guide/installation.html)

::: info
1. For devices with GKI 2.0 such as Xiaomi, Redmi, Samsung, etc. (excludes kernel-modified manufacturers such as Meizu, OnePlus, Realme, and Oppo)
2. Find the GKI build in [more links](./links). Find the device kernel version. Then download it and use TWRP or kernel flashing tool to flash the zip file with `AnyKernel3` suffix.
3. The `.zip` archive without suffix is uncompressed, the `gz` suffix is the compression used by specific models.
:::

### OnePlus

1. Use the link mentioned in the 'More Links' section to create a customized build with your device information, and then flash the zip file with the AnyKernel3 suffix.

::: tip
- You only need to fill in the first two parts of kernel versions, such as `5.10`, `5.15`, `6.1`, or `6.6`.
- Please search for the processor codename by yourself, usually it is all English without numbers.
- You can find the branch and configuration files from the OnePlus open-source kernel repository.
- Custom recovery (TWRP recommended)
- Compatible kernel version (see compatibility section)
- Basic knowledge of Android flashing procedures
:::

## Installation Methods

### Universal GKI Installation

::: info
For devices with GKI 2.0 such as Xiaomi, Redmi, Samsung, etc. (excludes kernel-modified manufacturers such as Meizu, OnePlus, Realme, and Oppo)
:::

#### Steps:

1. **Download GKI Build**
   
   Find the GKI build from our [resources section](./links). Look for your device's kernel version and download the zip file with AnyKernel3 suffix.

2. **Flash via Recovery**
   
   - Boot into TWRP recovery
   - Select "Install" 
   - Navigate to the downloaded AnyKernel3 zip file
   - Swipe to flash
   - Reboot system

3. **Verify Installation**
   
   - Install the SukiSU Ultra manager app
   - Check if root access is working
   - Verify kernel version in settings

::: details File Format Guide
The `.zip` archive without suffix is uncompressed, the `gz` suffix is the compression used by specific models.
:::

### OnePlus Device Installation

#### Steps:

1. **Get Device Information**
   
   Gather your device information:
   - Kernel version (first two parts, e.g., 5.10, 5.15, 6.1, 6.6)
   - Processor codename (usually English without numbers)
   - Branch and configuration files from OnePlus open-source kernel repository

2. **Create Custom Build**
   
   Use the link mentioned in our [resources section](./links) to create a customized build with your device information.

3. **Flash the Build**
   
   - Download the generated zip file with AnyKernel3 suffix
   - Boot into recovery mode
   - Flash the zip file
   - Reboot and verify installation

::: info
You only need to fill in the first two parts of kernel versions. Search for the processor codename yourself - it's usually all English without numbers.
:::

### Manual Kernel Integration

For advanced users who want to integrate SukiSU Ultra into their own kernel builds:

#### Main Branch (GKI)
```bash
curl -LSs "https://raw.githubusercontent.com/SukiSU-Ultra/SukiSU-Ultra/main/kernel/setup.sh" | bash -s main
```

#### Non-GKI Branch
```bash
curl -LSs "https://raw.githubusercontent.com/SukiSU-Ultra/SukiSU-Ultra/main/kernel/setup.sh" | bash -s nongki
```

#### SUSFS-Dev Branch (Recommended)
```bash
curl -LSs "https://raw.githubusercontent.com/SukiSU-Ultra/SukiSU-Ultra/main/kernel/setup.sh" | bash -s susfs-main
```

::: warning Required Kernel Configs
For KPM support, add `CONFIG_KPM=y`

For non-GKI devices, also add `CONFIG_KALLSYMS=y` and `CONFIG_KALLSYMS_ALL=y`
:::

## Post-Installation Setup

### System Updates with Root Retention

::: info 💡
How to maintain root access after OTA updates:
:::

#### Steps:

1. **Before Rebooting After OTA**

   Don't reboot immediately after the OTA update is installed.

2. **Flash to Opposite Slot**

   - Open SukiSU Ultra manager
   - Go to flashing/patching kernel interface
   - Find "GKI/non_GKI install"
   - Select your AnyKernel3 kernel zip file
   - Choose the slot opposite to current running slot
   - Flash and then reboot

3. **Alternative: LKM Mode**

   Use LKM mode to install to the unused slot after OTA.

::: warning
**Note for Non-GKI devices:** This method is not supported for all non-GKI devices. Use TWRP for non-GKI devices as the safest method.
:::

## Verification

After installation, verify everything is working correctly:

### ✅ Manager App
Install and open the SukiSU Ultra manager to check root status

### 🔍 Root Check
Use root checker apps to verify root access is working

### ⚙️ Kernel Info
Check kernel version in Settings > About Phone

## Need Help?

If you encounter issues during installation:

1. Check our [compatibility guide](./compatibility) for device requirements
2. Visit our [GitHub repository](https://github.com/sukisu-ultra/sukisu-ultra) for support
3. Join our [Telegram community](https://t.me/sukiksu) for help
4. Make sure your device is compatible

::: danger Safety Reminder
⚠️ **Always have a backup plan!** Keep your original boot.img and know how to restore your device in case of issues.
:::
