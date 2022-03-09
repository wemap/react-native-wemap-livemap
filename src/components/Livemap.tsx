import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { requireNativeComponent, HostComponent, UIManager, findNodeHandle } from 'react-native';

import type {
  Pinpoint,
  NativeLivemapProps,
  LivemapProps,
  LivemapRef,
  LivemapEvent,
} from '../types';

const NativeLivemap: HostComponent<NativeLivemapProps> = requireNativeComponent('WemapLivemap');

/**
 * This component represents a React Native embed of the [IOS](https://developers.getwemap.com/docs/ios/getting-started) and the [Android](https://developers.getwemap.com/docs/android/Livemap/) SDK.
 * It allows the developper to interact with it.
 *
 * To get a full documentation on its props and methods, please refers to [[LivemapProps]] and [[LivemapRef]] respectively.
 */
const Livemap = forwardRef<LivemapRef, LivemapProps>((props, ref) => {
  const nativeLivemap = useRef(null);

  const sendCommand = (command: string, params?: any) => {
    UIManager.dispatchViewManagerCommand(findNodeHandle(nativeLivemap.current), command, params);
  };

  const getNativeEventCallBack = (
    func: (nativeEvent: LivemapEvent['nativeEvent']['value']) => void = () => {}
  ) => {
    return (livemapEvent: LivemapEvent) => {
      func(livemapEvent.nativeEvent.value);
    };
  };

  useImperativeHandle(ref, () => ({
    openEvent,
    closeEvent,
    openPinpoint,
    closePinpoint,
    setFilters,
    navigateToPinpoint,
    stopNavigation,
    enableSidebar,
    disableSidebar,
    loadMapUrl,
    signInByToken,
    signOut,
    setPinpoints,
    setSourceLists,
  }));

  const openEvent = (id: number): void => {
    sendCommand('openEventViaManager', [id]);
  };

  const closeEvent = (): void => {
    sendCommand('closeEventViaManager');
  };

  const openPinpoint = (id: number): void => {
    sendCommand('openPinpointViaManager', [id]);
  };

  const closePinpoint = (): void => {
    sendCommand('closePinpointViaManager');
  };

  const setFilters = (startDate: string, endDate: string, query: string, tags: string[]): void => {
    sendCommand('setFiltersViaManager', [startDate, endDate, query, tags]);
  };

  const navigateToPinpoint = (id: number): void => {
    sendCommand('navigateToPinpointViaManager', [id]);
  };

  const stopNavigation = (): void => {
    sendCommand('stopNavigationViaManager');
  };

  const enableSidebar = (): void => {
    sendCommand('enableSidebarViaManager');
  };

  const disableSidebar = (): void => {
    sendCommand('disableSidebarViaManager');
  };

  const loadMapUrl = (): void => {
    sendCommand('loadMapUrlViaManager');
  };

  const signInByToken = (access_token: string): void => {
    sendCommand('signInByTokenViaManager', [access_token]);
  };

  const signOut = (): void => {
    sendCommand('signOutViaManager');
  };

  const setPinpoints = (pinpoints: Array<Pinpoint>) => {
    sendCommand('setPinpointsViaManager', [pinpoints]);
  };

  const setSourceLists = (sourceLists: number[]): void => {
    sendCommand('setSourceListsViaManager', [sourceLists]);
  };

  return (
    <NativeLivemap
      ref={nativeLivemap}
      mapConfig={{ ...props.mapConfig, ufe: !props.mapConfig.emmid }}
      style={props.style}
      onMapReady={getNativeEventCallBack(props.onMapReady)}
      onPinpointOpen={getNativeEventCallBack(props.onPinpointOpen)}
      onPinpointClose={getNativeEventCallBack(props.onPinpointClose)}
      onUserLogin={getNativeEventCallBack(props.onUserLogin)}
      onUserLogout={getNativeEventCallBack(props.onUserLogout)}
      onEventOpen={getNativeEventCallBack(props.onEventOpen)}
      onEventClose={getNativeEventCallBack(props.onEventClose)}
      onGuidingStarted={getNativeEventCallBack(props.onGuidingStarted)}
      onGuidingStopped={getNativeEventCallBack(props.onGuidingStopped)}
      onUrlChange={getNativeEventCallBack(props.onUrlChange)}
      onMapMoved={getNativeEventCallBack(props.onMapMoved)}
      onMapClick={getNativeEventCallBack(props.onMapClick)}
      onMapLongClick={getNativeEventCallBack(props.onMapLongClick)}
    />
  );
});

Livemap.defaultProps = {
  style: {
    flex: 1,
  },
};

export default Livemap;
