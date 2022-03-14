# @wemap/react-native-wemap-livemap

The Wemap react-native SDK is a library that will handle communication with the Wemap application.

The SDK offers an interface to manage the Livemap Mapview and to subscribe to events that happen on the map.

Please get your emmid and token from your pro account. You may ask for one if necessary or you can test with our developers credentials if you lack time.

## Installation

### Commons steps

#### Add the module

```
npm install @wemap/react-native-wemap-livemap
```

### IOS steps

#### Install the pods

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
cd example && npm run android|ios
```

Or with the shortcut:

```
npm run example android|ios
```

## Documentation

To view all methods and props of the Livemap component, please see the [documentation](https://developers.getwemap.com/docs/react-native)

## Know issues

- If you are using a Macbook M1, you may get some problems to install pods. Please see: https://stackoverflow.com/questions/64901180/how-to-running-cocoapods-on-apple-silicon-m1
- If you are using the Expo framework, you have to eject your project to install this module. This SDK is not part of the Expo Go app and contains native dependencies. For more informations see: https://docs.expo.dev/workflow/customizing/
- If you encounter some environment issues (related to Node.js for example), please be aware of React Native requirements before posting any new issue. You can check your project by running `react-native doctor` or `expo doctor`
- If you don't succeed to run your project from your terminal, you may have to clear the Xcode DerivedData. You can remove it using Xcode interface or by running the following command: `rm -rf ~/Library/Developer/Xcode/DerivedData`

## License

MIT
