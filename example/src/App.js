import React, { useRef, useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import Livemap from 'react-native-wemap-livemap';

export default () => {
  const livemap = useRef();

  const onMapReady = useCallback(() => {
    livemap.current.openPinpoint(37132482);
  }, [livemap]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Livemap
        ref={livemap}
        mapConfig={{
          ufe: true,
          webappEndpoint: 'https://livemapdev.maaap.it',
        }}
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
