# App Profile

App Profile lets you control how SukiSU-Ultra treats each app: whether it may use root, which identity it runs as once it does, and whether modules are visible to it. You manage profiles in the Manager app.

## Profile types

Every app has one of three profile states:

| Type | Meaning |
|------|---------|
| **Default** | No special treatment. The app follows the global behavior. |
| **Template** | The app uses a reusable set of settings (a *template*) that you can share between several apps. |
| **Custom** | The app has its own settings, configured individually. |

## Settings

A profile consists of the following fields.

### Mount namespace

Controls which mount namespace the app sees when it runs with root.

- **Inherited**: keep the namespace of the calling process.
- **Global**: use the global namespace.
- **Individual**: give the app its own private namespace.

### Groups and capabilities

- **Groups**: the Linux groups the app's process belongs to.
- **Capabilities**: the Linux capabilities granted to the app's process.

Only grant what the app actually needs.

### Flags

- **no_new_privs**: prevents further privilege escalation via SukiSU-Ultra from within the context of this root profile.

### SELinux context

- **Domain**: the SELinux domain the app's process runs in.
- **Rules**: additional SELinux policy rules applied for this profile.

### Umount modules

When enabled, SukiSU-Ultra restores any files that modules have modified, as seen by this app. Use it for apps that should not observe module changes.

## Templates

A template is a named, reusable profile. In the Manager you can:

- **Create** and **edit** templates (each has an ID, a name and a description).
- **View** which apps a template affects.
- **Import** a template from the clipboard and **export** one to the clipboard to share it.

::: tip
If several apps need the same settings, create a template once and apply it to all of them instead of configuring each app separately.
:::

::: warning
Wrong groups, capabilities or SELinux rules can break an app or weaken the security of your device. If something stops working, switch the app back to **Default**.
:::
