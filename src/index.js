import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { requireNativeComponent, UIManager, findNodeHandle } from 'react-native';

const WemapLivemap = requireNativeComponent('WemapLivemap', null);

const Livemap = forwardRef((props, ref) => {
  const wemapLivemap = useRef();

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
    UIManager.dispatchViewManagerCommand(findNodeHandle(wemapLivemap.current), command, params);
  };

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

  return <WemapLivemap ref={wemapLivemap} {...props} />;
});

export default Livemap;
