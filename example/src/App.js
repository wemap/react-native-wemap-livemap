import React, { useRef, useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import Livemap from '@wemap/react-native-wemap-livemap';

const INITIAL_MAP_CONFIG = {
  emmid: 7087,
};

const pinpoints = [
  {
    id: 1,
    name: 'Wemap Office',
    latitude: 43.609138,
    longitude: 3.884193,
    description: 'Where magic happens',
  },
  {
    id: 2,
    name: 'Effeil Tower',
    latitude: 48.85837,
    longitude: 2.294481,
    description: 'What is that ?',
  },
];

export default () => {
  const livemap = useRef();

  const onMapReady = () => {
    console.info('Livemap ready');
    livemap.current.setPinpoints(pinpoints);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Livemap
        ref={livemap}
        mapConfig={INITIAL_MAP_CONFIG}
        onMapReady={onMapReady}
        onPinpointOpen={(pp) => console.log(JSON.stringify(pp))}
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
