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

## Documentation

To view all methods and props of the Livemap Component, please see the [documentation](https://developers.getwemap.com/docs/react-native/livemap)

## License

MIT
