import React from 'react';
import { View } from 'react-native';
import Livemap from 'react-native-wemap-livemap';

export default () => (
  <View style={{ flex: 1 }}>
    <Livemap
      mapId={-1}
      token={'7ETI43N4ZZGARWPHJ57WQAARW'}
      style={{ flex: 1 }}
    />
  </View>
);
