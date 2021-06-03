import React, { useRef, useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import Livemap from '@wemap/react-native-wemap-livemap';

const INITIAL_MAP_CONFIG = {
  // token: 'XXXXXXXXXXXXXXXXXXXX',
  // emmid: XXXXX,
};

export default () => {
  const livemap = useRef();

  const onMapReady = () => {
    console.info('Livemap ready');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Livemap
        ref={livemap}
        mapConfig={INITIAL_MAP_CONFIG}
        onMapReady={onMapReady}
        onPinpointOpen={({ id }) => console.log(`pinpoint open: ${id}`)}
        onPinpointClose={() => console.log('pinpoint close')}
        onUserLogin={() => console.log('user login')}
        onUserLogout={() => console.log('user logout')}
        onEventOpen={({ id }) => console.log(`event open: ${id}`)}
        onEventClose={() => console.log('event close')}
        onGuidingStarted={() => console.log('guiding started')}
        onGuidingStopped={() => console.log('guiding stopped')}
      />
    </SafeAreaView>
  );
};
