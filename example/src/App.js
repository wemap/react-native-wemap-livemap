import React, { useRef, useCallback } from 'react';
import Livemap from 'react-native-wemap-livemap';

export default () => {
  const livemap = useRef();

  const onMapReady = useCallback(() => {
    livemap.current.openPinpoint(37132482);
  }, [livemap]);

  return (
    <Livemap
      ref={livemap}
      mapConfig={{
        token: '7ETI43N4ZZGARWPHJ57WQAARW',
        ufe: true,
        webappEndpoint: 'https://livemapdev.maaap.it',
      }}
      style={{ flex: 1 }}
      onMapReady={onMapReady}
      onPinpointOpen={({ nativeEvent: { id } }) =>
        console.log(`pinpoint open: ${id}`)
      }
      onPinpointClose={() => console.log('pinpoint close')}
      onUserLogin={() => console.log('user login')}
      onUserLogout={() => console.log('user logout')}
      onEventOpen={({ nativeEvent: { id } }) =>
        console.log(`event open: ${id}`)
      }
      onEventClose={() => console.log('event close')}
      onGuidingStarted={() => console.log('guiding started')}
      onGuidingStopped={() => console.log('guiding stopped')}
    />
  );
};
