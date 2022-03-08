# @wemap/react-native-wemap-livemap

https://developers.getwemap.com/docs/react-native/getting-started

A React Native embed of the IOS and Android SDK from Wemap.
It allows the developper to interact with them from the Livemap component.

## Installation

### Add the module

```
yarn add @wemap/react-native-wemap-livemap
```

OR

```
npm install @wemap/react-native-wemap-livemap
```

### Install pods

```
cd ios && pod install
```

## Basic Usage

```js
import Livemap from '@wemap/react-native-wemap-livemap';

const MAP_CONFIG = {
  emmid: 12606,
  token: 'XXXXXXXXXXXXXXXXXXXXXXXXX',
};

const MyLivemap = () => <Livemap mapConfig={MAP_CONFIG} />;
```

## Sample app

A sample app is available from the [example](https://github.com/wemap/react-native-wemap-livemap/tree/master/example) folder.

You can run it as a regular RN project by typing (from root):

```
cd example && yarn android|ios
```

OR with the shortcut

```
yarn example android|ios
```

## Documentation

To view all methods and props of the Livemap component, please see the [documentation](https://developers.getwemap.com/docs/react-native/livemap)

## Know issues

- If you are using a Macbook M1, you may get some problems to install pods. Please see: https://stackoverflow.com/questions/64901180/how-to-running-cocoapods-on-apple-silicon-m1
- If you are using the Expo framework, you have to eject your project to install this module. This SDK is not part of the Expo Go app and contains native dependencies. For more informations see: https://docs.expo.dev/workflow/customizing/
- If you encounter some environment issues (related to Node.js for example), please be aware of React Native requirements before posting any new issue. You can check your project by running `react-native doctor` or `expo doctor`
- If you don't succeed to run your project from your terminal, you may have to clear the Xcode DerivedData. You can remove it using Xcode interface or by running the following command: `rm -rf ~/Library/Developer/Xcode/DerivedData`

## License

MIT
