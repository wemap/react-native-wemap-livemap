import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import {
  requireNativeComponent,
  UIManager,
  findNodeHandle,
} from 'react-native';

const WemapLivemap = requireNativeComponent('WemapLivemap', null);

const Livemap = (props, ref) => {
  const wemapLivemap = useRef();
  useImperativeHandle(ref, () => ({
    openPinpoint,
  }));

  const sendCommand = (command, params) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(wemapLivemap.current),
      UIManager.WemapLivemap.Commands[command],
      params
    );
  };

  const openPinpoint = (id) => {
    sendCommand('openPinpointViaManager', [id]);
  };

  return <WemapLivemap ref={wemapLivemap} style={{ flex: 1 }} {...props} />;
};

export default forwardRef(Livemap);
