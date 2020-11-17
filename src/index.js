import React from 'react';
import { requireNativeComponent, View } from 'react-native';

const WemapLivemap = requireNativeComponent('WemapLivemap', null);

export default ({ mapId, token, ...props }) => {
  return (
    <View {...props}>
      <WemapLivemap mapId={mapId} token={token} style={{ flex: 1 }} />
    </View>
  );
};
