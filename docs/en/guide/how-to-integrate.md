# Integration

SukiSU-Ultra can be integrated into both GKI and non-GKI kernels. The prerequisite is an open-source, bootable kernel.

::: tip Just want to use it on a GKI device?
You do not need to build a kernel. Install it as a Loadable Kernel Module with the Manager: see [LKM installation](./installation#method-1-lkm-via-the-manager-recommended).
:::

Some OEM customizations can result in a large share of the kernel code being out-of-tree, not coming from upstream Linux or the ACK. Because of this, non-GKI kernels are heavily fragmented and there is no general way to build them, so boot images for non-GKI kernels cannot be provided.

## Pick a branch

| Branch | How it hooks the kernel | Typical use |
|--------|-------------------------|-------------|
| `main` | Kprobes / kretprobes and the `sys_enter` syscall tracepoint, registered at runtime. No hook calls have to be added to the kernel source. | GKI kernels, and building as a module (LKM) or built in |
| `builtin` | No kprobes. The kernel source calls SukiSU-Ultra's hook entry points (manual hooks). | Kernels you patch by hand |

::: warning Outdated options
`CONFIG_KSU_MANUAL_HOOK` and `CONFIG_KSU_TRACEPOINT_HOOK` no longer exist in either branch, and the `ksu_trace.h` header used by the old *Tracepoint Hook* guide is gone. Guides that tell you to enable them are out of date.
:::

## The `main` branch

### Requirements

- `CONFIG_KPROBES=y` and `CONFIG_EXT4_FS=y`. `CONFIG_KSU` depends on both.
- The hook manager uses kretprobes (`CONFIG_KRETPROBES`) and the `sys_enter` syscall tracepoint (`CONFIG_HAVE_SYSCALL_TRACEPOINTS`) when your kernel provides them.
- `CONFIG_KSU` is tristate: use `y` to build it in, or `m` to build the `kernelsu` module.

### Add it to your kernel source

Run this in the root of your kernel source tree:

```sh [bash]
curl -LSs "https://raw.githubusercontent.com/SukiSU-Ultra/SukiSU-Ultra/main/kernel/setup.sh" | bash -s main
```

The script clones the repository, links it into `drivers/kernelsu` and adds the entries to `drivers/Makefile` and `drivers/Kconfig`. Use `--cleanup` to undo it.

### Optional configs

| Option | Meaning |
|--------|---------|
| `CONFIG_KSU_MANUAL_SU` (default `y`) | Use manual su: authorize the command line and application via `prctl`. |
| `CONFIG_KPM` | Enable SukiSU KPM. Requires a 64-bit kernel and selects `CONFIG_KALLSYMS` and `CONFIG_KALLSYMS_ALL`. May affect system stability. |
| `CONFIG_KSU_DISABLE_MANAGER` | Disable manager APK detection and manager-specific handling. |
| `CONFIG_KSU_DISABLE_POLICY` | Disable per-app profiles. Escalation always uses the default full root profile. |
| `CONFIG_KSU_X86_PATCH_SYSCALL_DISPATCHER` | x86_64 only. Dynamically patches the hardened syscall dispatcher so syscall hooks work, replacing a kernel source patch. Useful for x86_64 LKM mode. |
| `CONFIG_KSU_DEBUG` | Debug mode. |

## The `builtin` branch

::: info Attribution
The manual hook integration guide in this section comes from backslashxx's GitHub issue: [scope-minimized manual hooks v2.3](https://github.com/backslashxx/KernelSU/issues/5).
:::

This branch does not register kprobes. You add calls to its hook entry points in your kernel source (manual hooks). The entry points are declared in the branch's headers (`kernel/feature/sucompat.h`, `kernel/feature/kernel_umount.h`, `kernel/runtime/ksud.h`, among others). **Check their exact signatures against the branch you build**; the patches below are for reference only.

First add the branch to your source tree:

```sh [bash]
curl -LSs "https://raw.githubusercontent.com/SukiSU-Ultra/SukiSU-Ultra/main/kernel/setup.sh" | bash -s builtin
```

This branch also carries the SUSFS options (`CONFIG_KSU_SUSFS` and its sub-options) and `CONFIG_KPM`, which needs a 64-bit kernel.

### Before you start

- If you are somehow building for a 6.8+ **non-ARM64** kernel, make sure to also apply: <https://github.com/backslashxx/KernelSU/issues/7>
- On **ARM / ARM64**, enabling **`CONFIG_KSU_TAMPER_SYSCALL_TABLE=y`** allows you to skip the following hooks: execve, sys_faccessat, sys_newfstatat, sys_newfstat ret_hook, sys_reboot and slow_avc_audit. **Make sure to remove the listed hooks when doing this!**
- On **4.19+ ARM64**, you can try **`CONFIG_KSU_HACK_ARM64_BRANCH_LINK=y`** instead and **skip all** the manual hooks below.
- Kernels vary in what has been backported. Pick the patch that matches the functions actually present in your kernel.

### 🟢 execve hook

- For sucompat.
- **Choose one** that suits your kernel version.
- If your kernel has stuff backported, use the hook that matches what's in your kernel.
- If you are on a custom ROM and want to hide adb root on selinuxfs, install [this KSU module](https://github.com/backslashxx/small_module).

**3.19+ (via `do_execveat_common`):**

```patch
--- a/fs/exec.c
+++ b/fs/exec.c
@@ -1728,6 +1728,11 @@
/*
 * sys_execve() executes a new program.
 */
static int do_execveat_common(int fd, struct filename *filename,
			struct user_arg_ptr argv,
			struct user_arg_ptr envp,
			int flags)
{
	char *pathbuf = NULL;
	struct linux_binprm *bprm;
	struct file *file;
	struct files_struct *displaced;
	int retval;

+#ifdef CONFIG_KSU
+	extern int ksu_handle_execveat(int *, struct filename **, void *, void *, int *);
+	ksu_handle_execveat(&fd, &filename, &argv, &envp, &flags);
+#endif
+
	if (IS_ERR(filename))
		return PTR_ERR(filename);
```

**3.19+ (via `__do_execve_file`):**

```patch
--- fs/exec.c
+++ fs/exec.c
@@ -1921,11 +1921,20 @@

/*
 * sys_execve() executes a new program.
 */
static int __do_execve_file(int fd, struct filename *filename,
			struct user_arg_ptr argv,
			struct user_arg_ptr envp,
			int flags, struct file *file)
{
	char *pathbuf = NULL;
	struct linux_binprm *bprm;
	struct files_struct *displaced;
	int retval;

+#ifdef CONFIG_KSU
+	extern int ksu_handle_execveat(int *, struct filename **, void *, void *, int *);
+	ksu_handle_execveat(&fd, &filename, &argv, &envp, &flags);
+#endif
+
	if (IS_ERR(filename))
		return PTR_ERR(filename);
```

**3.18 (via `do_execve_common`):**

- For 3.18, we can repurpose the upstream `do_execveat_common` hook for `do_execve_common`.
- There is no `sys_execveat` on <= 3.18, so this makes sense instead of hooking `sys_execve` + `compat_sys_execve`.
- Take note: the parameter is **`struct filename *filename`**.

```patch
--- a/fs/exec.c
+++ b/fs/exec.c
/*
 * sys_execve() executes a new program.
 */
static int do_execve_common(struct filename *filename,
				struct user_arg_ptr argv,
				struct user_arg_ptr envp)
{
	struct linux_binprm *bprm;
	struct file *file;
	struct files_struct *displaced;
	int retval;

+#ifdef CONFIG_KSU
+	extern int ksu_handle_execveat(int *, struct filename **, void *, void *, int *);
+	ksu_handle_execveat((int *)AT_FDCWD, &filename, &argv, &envp, 0);
+#endif
+
	if (IS_ERR(filename))
		return PTR_ERR(filename);
```

**3.0 - 3.10 (via `do_execve_common`):**

- For <= 3.10, this repo provides a handler for `do_execve_common`.
- There is no `sys_execveat` on <= 3.18, so this makes sense instead of hooking `sys_execve` + `compat_sys_execve`.
- Take note: the parameter is **`const char *filename`**.

```patch
--- a/fs/exec.c
+++ b/fs/exec.c
@@ -1615,6 +1615,12 @@
/*
 * sys_execve() executes a new program.
 */
static int do_execve_common(const char *filename,
				struct user_arg_ptr argv,
				struct user_arg_ptr envp)
{
	struct linux_binprm *bprm;
	struct file *file;
	struct files_struct *displaced;
	bool clear_in_exec;
	int retval;
	const struct cred *cred = current_cred();

+#ifdef CONFIG_KSU
+	extern int ksu_legacy_execve_sucompat(const char **, void *, void *);
+	ksu_legacy_execve_sucompat(&filename, (void *)&argv, (void *)&envp);
+#endif
+
	/*
	 * We move the actual failure in case of RLIMIT_NPROC excess from
	 * set*uid() to execve() because too many poorly written programs
```

### 🟢 sys_faccessat hook

- For sucompat.
- From the original guide.
- Hook **`sys_faccessat`** even if you have `do_faccessat`; this is for scope minimization.
- If your kernel has stuff backported, use the hook that matches what's in your kernel.

**5.10+:**

```patch
--- a/fs/open.c
+++ b/fs/open.c
@@ -483,6 +483,10 @@

SYSCALL_DEFINE3(faccessat, int, dfd, const char __user *, filename, int, mode)
{
+#ifdef CONFIG_KSU
+	extern int ksu_handle_faccessat(int *, const char __user **, int *, int *);
+	ksu_handle_faccessat(&dfd, &filename, &mode, NULL);
+#endif
	return do_faccessat(dfd, filename, mode, 0);
}
```

**4.19+:**

```patch
--- a/fs/open.c
+++ b/fs/open.c
@@ -483,6 +483,10 @@

SYSCALL_DEFINE3(faccessat, int, dfd, const char __user *, filename, int, mode)
{
+#ifdef CONFIG_KSU
+	extern int ksu_handle_faccessat(int *, const char __user **, int *, int *);
+	ksu_handle_faccessat(&dfd, &filename, &mode, NULL);
+#endif
	return do_faccessat(dfd, filename, mode);
}
```

**4.14 and older:**

```patch
--- a/fs/open.c
+++ b/fs/open.c
/*
 * access() needs to use the real uid/gid, not the effective uid/gid.
 * We do this by temporarily clearing all FS-related capabilities and
 * switching the fsuid/fsgid around to the real ones.
 */
SYSCALL_DEFINE3(faccessat, int, dfd, const char __user *, filename, int, mode)
{
	const struct cred *old_cred;
	struct cred *override_cred;
	struct path path;
	struct inode *inode;
	int res;
	unsigned int lookup_flags = LOOKUP_FOLLOW;

+#ifdef CONFIG_KSU
+	extern int ksu_handle_faccessat(int *, const char __user **, int *, int *);
+	ksu_handle_faccessat(&dfd, &filename, &mode, NULL);
+#endif
+
	if (mode & ~S_IRWXO)	/* where's F_OK, X_OK, W_OK, R_OK? */
		return -EINVAL;
```

### 🟢 sys_newfstatat hook

- For sucompat.
- Scope minimized.
- You now have to hook **`sys_newfstatat`** instead of `vfs_statx()`.
- Optionally hook **`sys_fstatat64`** if 32-bit su is needed.

```patch
--- a/fs/stat.c
+++ b/fs/stat.c
@@ -371,6 +371,11 @@
#if !defined(__ARCH_WANT_STAT64) || defined(__ARCH_WANT_SYS_NEWFSTATAT)
SYSCALL_DEFINE4(newfstatat, int, dfd, const char __user *, filename,
		struct stat __user *, statbuf, int, flag)
{
	struct kstat stat;
	int error;

+#ifdef CONFIG_KSU
+	extern int ksu_handle_stat(int *, const char __user **, int *);
+	ksu_handle_stat(&dfd, &filename, &flag);
+#endif
+
	error = vfs_fstatat(dfd, filename, &stat, flag);
	if (error)
		return error;
	return cp_new_stat(&stat, statbuf);
}
#endif

@@ -515,6 +520,11 @@
SYSCALL_DEFINE4(fstatat64, int, dfd, const char __user *, filename,
		struct stat64 __user *, statbuf, int, flag)
{
	struct kstat stat;
	int error;

+#ifdef CONFIG_KSU // for 32-bit
+	extern int ksu_handle_stat(int *, const char __user **, int *);
+	ksu_handle_stat(&dfd, &filename, &flag);
+#endif
+
	error = vfs_fstatat(dfd, filename, &stat, flag);
	if (error)
		return error;
	return cp_new_stat64(&stat, statbuf);
}
```

### 🟢 sys_newfstat ret_hook

- Needed for Android 16 and newer.
- Introduced upstream by [kernel: ksud: Refine rc injection, fix issue of Android Canary 2601](https://github.com/tiann/KernelSU/commit/df640917d11dd0eff1b34ea53ec3c0dc49667002).
- Go to `fs/stat.c` and hook `newfstat` before it returns.
- Optionally hook **`sys_fstat64`** for 32-bit, 32-on-64 (likely not needed though).
- **DO NOT** worry about **`#pragma GCC`**, this also works on Clang.

```patch
diff --git a/fs/stat.c b/fs/stat.c
--- a/fs/stat.c
+++ b/fs/stat.c
@@ -386,6 +392,14 @@
SYSCALL_DEFINE2(newfstat, unsigned int, fd, struct stat __user *, statbuf)
{
	struct kstat stat;
	int error = vfs_fstat(fd, &stat);

	if (!error)
		error = cp_new_stat(&stat, statbuf);

+#if defined(CONFIG_KSU) && !defined(CONFIG_KSU_KPROBES_KSUD)
+#pragma GCC diagnostic push
+#pragma GCC diagnostic ignored "-Wdeclaration-after-statement"
+	extern void ksu_handle_newfstat_ret(unsigned int *, struct stat __user **);
+	ksu_handle_newfstat_ret(&fd, &statbuf);
+#pragma GCC diagnostic pop
+#endif
+
	return error;
}

@@ -506,6 +520,14 @@
SYSCALL_DEFINE2(fstat64, unsigned long, fd, struct stat64 __user *, statbuf)
{
	struct kstat stat;
	int error = vfs_fstat(fd, &stat);

	if (!error)
		error = cp_new_stat64(&stat, statbuf);

+#if defined(CONFIG_KSU) && !defined(CONFIG_KSU_KPROBES_KSUD) // for 32-bit
+#pragma GCC diagnostic push
+#pragma GCC diagnostic ignored "-Wdeclaration-after-statement"
+	extern void ksu_handle_fstat64_ret(unsigned long *, struct stat64 __user **);
+	ksu_handle_fstat64_ret(&fd, &statbuf);
+#pragma GCC diagnostic pop
+#endif
+
	return error;
}
```

### 🟢 sys_reboot hook

- This is needed by the new KernelSU supercall introduced at 12143.
- Just go to where `sys_reboot` is and hook right on its entry.

**3.18+ (`kernel/reboot.c`):**

```patch
--- a/kernel/reboot.c
+++ b/kernel/reboot.c
@@ -284,6 +284,11 @@
SYSCALL_DEFINE4(reboot, int, magic1, int, magic2, unsigned int, cmd,
		void __user *, arg)
{
	struct pid_namespace *pid_ns = task_active_pid_ns(current);
	char buffer[256];
	int ret = 0;

+#if defined(CONFIG_KSU) && !defined(CONFIG_KSU_KPROBES_KSUD)
+	extern int ksu_handle_sys_reboot(int, int, unsigned int, void __user **);
+	ksu_handle_sys_reboot(magic1, magic2, cmd, &arg);
+#endif
+
	/* We only trust the superuser with rebooting the system. */
	if (!ns_capable(pid_ns->user_ns, CAP_SYS_BOOT))
		return -EPERM;
```

**3.0 ~ 3.10 (`kernel/sys.c`):**

```patch
--- a/kernel/sys.c
+++ b/kernel/sys.c
@@ -463,6 +463,11 @@
 *
 * reboot doesn't sync: do that yourself before calling this.
 */
SYSCALL_DEFINE4(reboot, int, magic1, int, magic2, unsigned int, cmd,
		void __user *, arg)
{
	struct pid_namespace *pid_ns = task_active_pid_ns(current);
	char buffer[256];
	int ret = 0;

+#if defined(CONFIG_KSU) && !defined(CONFIG_KSU_KPROBES_KSUD)
+	extern int ksu_handle_sys_reboot(int, int, unsigned int, void __user **);
+	ksu_handle_sys_reboot(magic1, magic2, cmd, &arg);
+#endif
+
	/* We only trust the superuser with rebooting the system. */
	if (!ns_capable(pid_ns->user_ns, CAP_SYS_BOOT))
		return -EPERM;
```

### 🟡 policy_rwlock

- This is **OPTIONAL**, nice to have but **NOT** required.
- Mostly only for 3.0 ~ 4.9, maybe 4.14.
- Most 4.14 kernels do **NOT** need this though (due to `selinux_state` backported by ACK).
- If you can't find it or are too lazy, don't bother with it.
- Basically you just remove the "static" from `policy_rwlock`'s definition.

```patch
--- a/security/selinux/ss/services.c
+++ b/security/selinux/ss/services.c
@@ -74,7 +74,7 @@
 int selinux_android_netlink_route;
 int selinux_policycap_netpeer;
 int selinux_policycap_openperm;

-static DEFINE_RWLOCK(policy_rwlock);
+DEFINE_RWLOCK(policy_rwlock);

 static struct sidtab sidtab;
 struct policydb policydb;
```

### 🟡 slow_avc_audit

- This is **OPTIONAL**.
- **NOT needed on ARM64**.
- Mostly only for ARM32 and can be handled in userspace.
- This is not a standard KSU feature, but it's here if you want it.

```patch
--- a/security/selinux/avc.c
+++ b/security/selinux/avc.c
/* This is the slow part of avc audit with big stack footprint */
noinline int slow_avc_audit(struct selinux_state *state,
			u32 ssid, u32 tsid, u16 tclass,
			u32 requested, u32 audited, u32 denied, int result,
			struct common_audit_data *a,
			unsigned int flags)
{
	struct common_audit_data stack_data;
	struct selinux_audit_data sad;

+#if defined(CONFIG_KSU) && !defined(CONFIG_KPROBES)
+	extern void ksu_slow_avc_audit(u32 *);
+	ksu_slow_avc_audit(&tsid);
+#endif
	if (!a) {
		a = &stack_data;
		a->type = LSM_AUDIT_DATA_NONE;
```

### Optimization tip

- If you're using a recent **Clang** with **FULL LTO**, you can try to hint the optimizer to inline the hooks.
- This is hit and miss, but if it works you get better optimization:

```patch
 #ifdef CONFIG_KSU
 	extern int ksu_handle_execveat(int *, struct filename **, void *, void *, int *);
-	ksu_handle_execveat(&fd, &filename, &argv, &envp, &flags);
+	[[clang::always_inline]] ksu_handle_execveat(&fd, &filename, &argv, &envp, &flags);
 #endif
```

```patch
 #ifdef CONFIG_KSU
 	extern int ksu_handle_faccessat(int *, const char __user **, int *, int *);
-	ksu_handle_faccessat(&dfd, &filename, &mode, NULL);
+	[[clang::always_inline]] ksu_handle_faccessat(&dfd, &filename, &mode, NULL);
 #endif
```

```patch
 #ifdef CONFIG_KSU
 	extern int ksu_handle_stat(int *, const char __user **, int *);
-	ksu_handle_stat(&dfd, &filename, &flag);
+	[[clang::always_inline]] ksu_handle_stat(&dfd, &filename, &flag);
 #endif
```

### Kconfig reference

The Kconfig below comes from backslashxx's KernelSU repository (same source as the guide above), provided for reference:

```kconfig
menu "KernelSU"

config KSU
	tristate "KernelSU function support"
	depends on !CPU_BIG_ENDIAN
	depends on SECURITY_SELINUX
	select SECCOMP
	default y
	help
	  Enable kernel-level root privileges on Android System.

config KSU_KPROBES_KSUD
	bool "Enable dynamic kprobes for early boot hooks"
	depends on KSU
	depends on !KSU_TAMPER_SYSCALL_TABLE
	depends on !KSU_HACK_ARM64_BRANCH_LINK
	depends on KPROBES && KRETPROBES
	depends on DEPRECATED
	default n
	help
	  [deprecated] Use dynamic hooks via kprobes for functions only
	  on early boot. Hooks are unregistered at boot complete
	  to reduce overhead.

config KSU_HACK_ARM64_BRANCH_LINK
	bool "inline call-site hijacking (ARM64 bl insn)"
	depends on KSU
	depends on ARM64 && KALLSYMS
	depends on !KSU_TAMPER_SYSCALL_TABLE
	default y if KSU = m
	default n
	help
	  Attempts to provide sucompat by scanning kernel text and overwriting caller's
	  branch insn ('b' or 'bl') directly to our hooks, bypassing trampoline overhead
	  and CFI fuckups. Inspired by ARM64 optprobes.
	  Successful patching relies on symbol stability, so hooking success will
	  vary across different compliers, optimization, tweaks and backports.
	  When patching fails, it keeps syscall table hook for the target symbol.
	  Verified on 3.10 ~ 7.1. Recommended for 4.19+.

config KSU_TAMPER_SYSCALL_TABLE
	bool "tamper sys_call_table for sucompat + sys_reboot"
	depends on KSU
	depends on (ARM || ARM64)
	default n
	help
	  Use a high-performance syscall table hijacking method demonstrated on zx2c4's
	  kernel-assisted-superuser. Replaces sys_reboot, sys_execve, sys_newfstatat,
	  sys_faccessat, sys_newfstat_ret.
	  As syscalls are called directly, it avoids indirect branch (blr) overhead and
	  complies with Clang CFI.
	  Verified on 3.0 ~ 7.1. Recommended for 3.0 ~ 4.14.

config KSU_DISABLE_32BIT_HOOKS
	bool "disable 32-bit symbol hooking"
	depends on KSU
	depends on 64BIT && COMPAT
	depends on (KSU_TAMPER_SYSCALL_TABLE || KSU_HACK_ARM64_BRANCH_LINK)
	default n
	help
	  Skips hooking 32-bit syscalls (compat_sys_call_table). Mostly useful for zygote64-only devices.
	  Author assumes you know what you're doing, __builtin_assume(!!&user_brain).

config KSU_LSM_SECURITY_HOOKS
	bool "Use LSM security hooks"
	depends on KSU
	default y
	help
	  Disabling this is mostly useful for non-ARM64 with kernel > 6.8.
	  Make sure to implement manual hooks on security/security.c.

config KSU_FEATURE_SULOG
	bool "KernelSU SU Logging feature"
	depends on KSU
	default y
	help
	  Build KernelSU's SU Log.

config KSU_FEATURE_ADBROOT
	bool "KernelSU ADB Root feature"
	depends on KSU
	default y
	help
	  Build KernelSU's adb root feature.

config KSU_HOSTSREDIRECT
	bool "/system/etc/hosts redirection"
	depends on KSU
	depends on (ARM || ARM64)
	default n
	help
	  Kernel-level sys_openat fd redirect targeting /system/etc/hosts to /data/adb/hosts.
	  Allows hosts file modification without mounting hosts file directly, this is meant to
	  be used with bindhosts mode 3. If /data/adb/hosts does NOT exist at boot, the syscall
	  hook is automatically skipped. See like ZN-hostsredirect / APatch hosts file redirect.
	  If unsure, say n.

config KSU_ENABLE_FULL_UID_CHECKS
	bool "perform full uid checks (reduced performance)"
	depends on KSU
	default n
	help
	  Validate every non-root UID against the allowlist. When disabled, only shell (2000)
	  is checked. Recommended for permissive selinux / seccomp disabled scenarios.
	  Enable for extended security; keep disabled for performance.

config KSU_THRONE_TRACKER_ALWAYS_THREADED
	bool "Always run throne tracker in a kthread"
	depends on KSU
	default n
	help
	  Enable this option to run throne tracker in a kthread for the first
	  run, which happens at boot time / decryption stage. This can decrease
	  boot time, but can cause crowning failure on some FDE/FBEv1 setups.
	  If unsure, say n.

config KSU_NOPRINTK
	bool "disable ALL dmesg logging"
	depends on KSU
	depends on !KSU_DEBUG
	default n
	help
	  Disable KernelSU dmesg output.

config KSU_SHELL_HAS_SU_ALWAYS
	bool "give shell su"
	depends on KSU
	default n
	help
	  Always allow shell (2000) for su. Can speedup sucompat gate as a side-effect.

config KSU_DEBUG
	bool "KernelSU debug mode"
	depends on KSU
	default n
	help
	  Enable KernelSU debug mode.

config KSU_HEURISTIC_IN_TREE_BUILD
	bool "heuristic. do NOT touch"
	depends on KSU
	default y
	help
	  Note: if youre building out-of-tree, configure by editing ksu.c #defines instead.

config KPM
    bool "Enable SukiSU KPM"
    depends on KSU && 64BIT
    default n
    help
      Enabling this option will activate the KPM feature of SukiSU.
      This option is suitable for scenarios where you need to force KPM to be enabled.
      but it may affect system stability.
    select KALLSYMS
    select KALLSYMS_ALL

endmenu
```
