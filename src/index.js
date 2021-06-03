import React, { PureComponent, createRef } from 'react';
import { requireNativeComponent, UIManager, findNodeHandle, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

const NativeLivemap = requireNativeComponent('WemapLivemap', null);

/**
 * This component represents a React Native embed of the [IOS](https://developers.getwemap.com/docs/ios/getting-started) and the [Android](https://developers.getwemap.com/docs/android/Livemap/) SDK.
 * It allows the developper to interact with it. This document mainly presents the props of the Livemap as well as its methods.
 * To see the source code and an exemple, please check its <a href="https://github.com/wemap/react-native-wemap-livemap" target="_blank">repository</a>.
 */
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

  /**
   * Open an event on the map. This can only be used for maps which use events.
   * @param {number} id the id of the event to open
   */
  openEvent = (id) => {
    this.sendCommand('openEventViaManager', [id]);
  };

  /**
   * Close the current opened event. Go to the search view.
   */
  closeEvent = () => {
    this.sendCommand('closeEventViaManager');
  };

  /**
   * Open a pinpoint on the map.
   * @param {number} id the id of the pinpoint to open
   */
  openPinpoint = (id) => {
    this.sendCommand('openPinpointViaManager', [id]);
  };

  /**
   * Close the current opened pinpoint. Go to the search view.
   */
  closePinpoint = () => {
    this.sendCommand('closePinpointViaManager');
  };

  /**
   * Update search filters (dates, tags, text).
   * @param {string} startDate start date at YYYY-MM-DD format
   * @param {string} endDate end date at YYYY-MM-DD format
   * @param {string} query text query
   * @param {string[]} tags array of string tags
   */
  setFilters = (startDate, endDate, query, tags) => {
    this.sendCommand('setFiltersViaManager', [startDate, endDate, query, tags]);
  };

  /**
   * Start navigation to a pinpoint.
   * Can be an absolute navigation (start location based on phone sensors) or a relative navigation (given start location & heading).
   * If start location and initialHeading are not provided, the navigation will start with the user location
   * @param {number} id the pinpoint id to navigate to
   */
  navigateToPinpoint = (id) => {
    this.sendCommand('navigateToPinpointViaManager', [id]);
  };

  /**
   * Stop the currently running navigation.
   */
  stopNavigation = () => {
    this.sendCommand('stopNavigationViaManager');
  };

  /**
   * Sign in to the UFE with a Wemap token.
   * @param {string} access_token the acces_token property of your Wemap token
   * @param {string} refresh_token the refresh_token property of your Wemap token
   */
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

Livemap.defaultProps = {
  onMapReady: () => {},
  onPinpointOpen: ({ id }) => {},
  onPinpointClose: () => {},
  onUserLogin: () => {},
  onUserLogout: () => {},
  onEventOpen: ({ id }) => {},
  onEventClose: () => {},
  onGuidingStarted: () => {},
  onGuidingStopped: () => {},
  style: { flex: 1 },
};

Livemap.propTypes = {
  /**
   * The map is ready.
   */
  onMapReady: PropTypes.func,
  /**
   * A pinpoint is opening.
   */
  onPinpointOpen: PropTypes.func,
  /**
   * A pinpoint is closing.
   */
  onPinpointClose: PropTypes.func,
  /**
   * An user log-in.
   */
  onUserLogin: PropTypes.func,
  /**
   * An user log-out.
   */
  onUserLogout: PropTypes.func,
  /**
   * An event is opening.
   */
  onEventOpen: PropTypes.func,
  /**
   * An event is closing.
   */
  onEventClose: PropTypes.func,
  /**
   * The navigation started.
   */
  onGuidingStarted: PropTypes.func,
  /**
   * The navigation stopped.
   */
  onGuidingStopped: PropTypes.func,
  /**
   * Your Livemap config. You have the choice between UFE and emmid mode.
   * If you don't provide any emmid, the default mode will be UFE.
   * If you want to display your map via an emmid, your config will need your personal token.
   */
  mapConfig: PropTypes.shape({
    /** a boolean to display in ufe mode */
    ufe: PropTypes.bool,
    /** the Wemap endpoint you want to request */
    webappEndpoint: PropTypes.string,
    /** the emmid of your map */
    emmid: PropTypes.number,
    /** your personal token which is needed if you want to display your map */
    token: PropTypes.string,
  }).isRequired,
  /**
   * By default, your Livemap's instance fill with its container.
   */
  style: ViewPropTypes.style,
};

export default Livemap;
