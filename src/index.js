import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { requireNativeComponent, UIManager, findNodeHandle } from 'react-native';

const NativeLivemap = requireNativeComponent('WemapLivemap', null);

const Livemap = forwardRef(
  (
    {
      onMapReady,
      onPinpointOpen,
      onPinpointClose,
      onUserLogin,
      onUserLogout,
      onEventOpen,
      onEventClose,
      onGuidingStarted,
      onGuidingStopped,
      ...rest
    },
    ref
  ) => {
    const nativeLivemap = useRef();

    useImperativeHandle(ref, () => ({
      openEvent,
      closeEvent,
      openPinpoint,
      closePinpoint,
      setFilters,
      navigateToPinpoint,
      stopNavigation,
      signInByToken,
    }));

    const sendCommand = (command, params) => {
      UIManager.dispatchViewManagerCommand(findNodeHandle(nativeLivemap.current), command, params);
    };

    const getNativeEventCallBack = (func) => ({ nativeEvent }) => func(nativeEvent);

    const openEvent = (id) => {
      sendCommand('openEventViaManager', [id]);
    };

    const closeEvent = () => {
      sendCommand('closeEventViaManager');
    };

    const openPinpoint = (id) => {
      sendCommand('openPinpointViaManager', [id]);
    };

    const closePinpoint = (id) => {
      sendCommand('closePinpointViaManager');
    };

    const setFilters = (startDate, endDate, query, tags) => {
      sendCommand('setFiltersViaManager', [startDate, endDate, query, tags]);
    };

    const navigateToPinpoint = (id) => {
      sendCommand('navigateToPinpointViaManager', [id]);
    };

    const stopNavigation = () => {
      sendCommand('stopNavigationViaManager');
    };

    const signInByToken = (access_token, refresh_token) => {
      sendCommand('signInByTokenViaManager', [access_token, refresh_token]);
    };

    return (
      <NativeLivemap
        ref={nativeLivemap}
        onMapReady={getNativeEventCallBack(onMapReady)}
        onPinpointOpen={getNativeEventCallBack(onPinpointOpen)}
        onPinpointClose={getNativeEventCallBack(onPinpointClose)}
        onUserLogin={getNativeEventCallBack(onUserLogin)}
        onUserLogout={getNativeEventCallBack(onUserLogout)}
        onEventOpen={getNativeEventCallBack(onEventOpen)}
        onEventClose={getNativeEventCallBack(onEventClose)}
        onGuidingStarted={getNativeEventCallBack(onGuidingStarted)}
        onGuidingStopped={getNativeEventCallBack(onGuidingStopped)}
        {...rest}
      />
    );
  }
);

export default Livemap;
