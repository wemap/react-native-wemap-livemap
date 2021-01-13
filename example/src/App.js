import React, { useRef, useEffect } from 'react';
import Livemap from 'react-native-wemap-livemap';

export default () => {
  const livemap = useRef();

  useEffect(() => {
    setTimeout(() => {
      // livemap.current.openPinpoint(36123691);
      livemap.current.signInByToken(
        'BM85HR0HkotCTvzn1gCGof72z81p1N',
        'i1LCEn7ZGxP6GTnliO0fAxo13KtVxW'
      );
    }, 10000);
  }, [livemap]);

  return (
    <Livemap
      ref={livemap}
      mapId={-1}
      token={'7ETI43N4ZZGARWPHJ57WQAARW'}
      style={{ flex: 1 }}
      onPinpointOpen={(e) => alert(e.nativeEvent.value)}
      onUserLogin={() => alert('userLogin')}
      onUserLogout={() => alert('userLogout')}
    />
  );
};
