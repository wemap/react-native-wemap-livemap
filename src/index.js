import React, { PureComponent, createRef } from 'react';
import { requireNativeComponent, UIManager, findNodeHandle } from 'react-native';

const NativeLivemap = requireNativeComponent('WemapLivemap', null);

class Livemap extends PureComponent {
  nativeLivemap = createRef();

  sendCommand = (command, params) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.nativeLivemap.current),
      command,
      params
    );
  };

  getNativeEventCallBack = (func) => ({ nativeEvent }) => func(nativeEvent);

  openEvent = (id) => {
    this.sendCommand('openEventViaManager', [id]);
  };

  closeEvent = () => {
    this.sendCommand('closeEventViaManager');
  };

  openPinpoint = (id) => {
    this.sendCommand('openPinpointViaManager', [id]);
  };

  closePinpoint = () => {
    this.sendCommand('closePinpointViaManager');
  };

  setFilters = (startDate, endDate, query, tags) => {
    this.sendCommand('setFiltersViaManager', [startDate, endDate, query, tags]);
  };

  navigateToPinpoint = (id) => {
    this.sendCommand('navigateToPinpointViaManager', [id]);
  };

  stopNavigation = () => {
    this.sendCommand('stopNavigationViaManager');
  };

  signInByToken = (access_token, refresh_token) => {
    this.sendCommand('signInByTokenViaManager', [access_token, refresh_token]);
  };

  render() {
    const {
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
    } = this.props;

    return (
      <NativeLivemap
        ref={this.nativeLivemap}
        onMapReady={this.getNativeEventCallBack(onMapReady)}
        onPinpointOpen={this.getNativeEventCallBack(onPinpointOpen)}
        onPinpointClose={this.getNativeEventCallBack(onPinpointClose)}
        onUserLogin={this.getNativeEventCallBack(onUserLogin)}
        onUserLogout={this.getNativeEventCallBack(onUserLogout)}
        onEventOpen={this.getNativeEventCallBack(onEventOpen)}
        onEventClose={this.getNativeEventCallBack(onEventClose)}
        onGuidingStarted={this.getNativeEventCallBack(onGuidingStarted)}
        onGuidingStopped={this.getNativeEventCallBack(onGuidingStopped)}
        {...rest}
      />
    );
  }
}

export default Livemap;
