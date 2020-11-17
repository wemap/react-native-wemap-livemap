import { NativeModules } from 'react-native';

type WemapLivemapType = {
  multiply(a: number, b: number): Promise<number>;
};

const { WemapLivemap } = NativeModules;

export default WemapLivemap as WemapLivemapType;
