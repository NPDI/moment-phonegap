# Moment Developer App

## Download

- [Android Google Play][1]
- [Apple AppStore][2]
- [Windows Phone store][7]

## Development

### Setup

The repository includes everything required to compile the app. You can get
setup by:

    $ git clone https://github.com/npdi/moment-phonegap.git
    $ cd moment-phonegap/
    $ npm install

### Compile and Run

The app bundles the `phonegap` npm module as a dependency. This means that
there is no need for a global installation of `phonegap` or `cordova`.
By editing the `package.json`, you can specify the exact version of `phonegap`
to compile the project.

Since a global install of the `phonegap` module is not required, we use
`npm run` scripts to compile and run the application. This allows the app's
`platforms/` and `plugins/` directories to be removed and rebuilt each time,
ensuring a consistent build using the correct PhoneGap, Cordova, platform,
and plugin versions.

The command structure is:

    $ npm run phonegap -- <command> [args]

For example, you can check the version of `phonegap`:

    $ npm run phonegap -- --version

You can compile and run iOS or Android:

    $ npm run phonegap -- run ios
    $ npm run phonegap -- run android

For developers wishing to use the platform SDKs (Xcode, Eclipse, Visual Studio),
please build once with the CLI to correctly populate the platform assets:

    $ npm run phonegap -- build <platform>

Due to a Windows npm bug, the `--` does not work. Therefore we have created
run script that will build Windows Phone 8, so it can run in Visual Studio.

    $ npm run phonegap-wp8
