# @wemap/react-native-wemap-livemap

A React Native embed of the IOS and Android SDK from Wemap.
It allows the developper to interact with them from the Livemap Component.

## Installation

```sh
npm install @wemap/react-native-wemap-livemap
```

## Basic Usage

```js
import Livemap from '@wemap/react-native-wemap-livemap';

// ...

const MyLivemap = () => (
  <Livemap
    mapConfig={{
      emmid: 12606,
      token: 'XXXXXXXXXXXXXXXXXXXXXXXXX',
    }}
  />
);
```

Code samples are available in the folder example

## Documentation

To view all methods and props of the Livemap Component, please see the [documentation](https://developers.getwemap.com/docs/react-native/livemap)

## License

MIT

# setup

macBook M1,
pod install dans le dossier example/ios
arch -x86_64 pod install

Sometimes, DerivedData need to be cleared
(dangerous command that can be misused and remove everything, rm -rf ~/Library/Developer/Xcode/DerivedData/*)

Node 14 is recommended
npm i -g react-native

in the folder example:
react-native run-ios

The Pods folder is generated
Add the architectures x86_64 and arm64 in the Pods Project if it does not work

remove warnings in the excample folder:
```sh
sed -i '' s'/IPHONEOS_DEPLOYMENT_TARGET = 8/IPHONEOS_DEPLOYMENT_TARGET = 9/g' ./ios/Pods/Pods.xcodeproj/project.pbxproj && sed -i '' s'/IPHONEOS_DEPLOYMENT_TARGET = 9·4/IPHONEOS_DEPLOYMENT_TARGET = 9\.0/g' ./ios/Pods/Pods.xcodeproj/project.pbxproj
```

