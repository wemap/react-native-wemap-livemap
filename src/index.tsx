import React, { PureComponent } from 'react';
import {
  requireNativeComponent,
  HostComponent,
  UIManager,
  findNodeHandle,
  ViewStyle,
} from 'react-native';

interface Coordinates {
  longitude: number;
  latitude: number;
}

interface MapBounds {
  northEast: Coordinates;
  southWest: Coordinates;
}

interface MapView extends Coordinates {
  zoom: number;
  bounds: MapBounds;
}

interface Pinpoint {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  external_data?: {};
}

interface MapConfig {
  /** the emmid of your map */
  emmid?: number;
  /** your personal token which is needed if you want to display your map */
  token: string;
  /** maxbounds defines the map boundaries */
  maxbounds?: MapBounds;
  /** a boolean to display in ufe mode */
  ufe?: boolean;
  /** the Wemap endpoint you want to request */
  webappEndpoint?: string;
}

interface LivemapProps {
  /**
   * Your Livemap config. You have the choice between UFE and emmid mode.
   * If you don't provide any emmid, the default mode will be UFE.
   * If you want to display your map via an emmid, your config will need your personal token.
   */
  mapConfig: MapConfig;

  /**
   * By default, your Livemap's instance fill with its container.
   */
  style: ViewStyle;

  /**
   * The map is ready.
   */
  onMapReady?: () => void;
  /**
   * A pinpoint is opening.
   */
  onPinpointOpen?: (pinpoint: Pinpoint) => void;
  /**
   * A pinpoint is closing.
   */
  onPinpointClose?: () => void;
  /**
   * An user log-in.
   */
  onUserLogin?: () => void;
  /**
   * An user log-out.
   */
  onUserLogout?: () => void;
  /**
   * An event is opening.
   */
  onEventOpen?: (event: { id: number }) => void;
  /**
   * An event is closing.
   */
  onEventClose?: () => void;
  /**
   * The navigation started.
   */
  onGuidingStarted?: () => void;
  /**
   * The navigation stopped.
   */
  onGuidingStopped?: () => void;

  onUrlChange?: (event: { previousUrl: string; nextUrl: string }) => void;
  /**
   * Dispatched when the map is moved.
   */
  onMapMoved?: (event: MapView) => void;
  /**
   * Dispatched when the map is clicked.
   */
  onMapClick?: (event: Coordinates) => void;
  /**
   * Dispatched when the map is long clicked
   */
  onMapLongClick?: (event: Coordinates) => void;
}

type LivemapState = {};

const NativeLivemap: HostComponent<LivemapProps> = requireNativeComponent('WemapLivemap');

/**
 * This component represents a React Native embed of the [IOS](https://developers.getwemap.com/docs/ios/getting-started) and the [Android](https://developers.getwemap.com/docs/android/Livemap/) SDK.
 * It allows the developper to interact with it. This document mainly presents the props of the Livemap as well as its methods.
 */
class Livemap extends PureComponent<LivemapProps, LivemapState> {
  sendCommand = (command: string, params?: any) => {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this), command, params);
  };

  /**
   * Open an event on the map. This can only be used for maps which use events.
   * @param {number} id the id of the event to open
   */
  openEvent = (id: number): void => {
    this.sendCommand('openEventViaManager', [id]);
  };

  /**
   * Close the current opened event. Go to the search view.
   */
  closeEvent = (): void => {
    this.sendCommand('closeEventViaManager');
  };

  /**
   * Open a pinpoint on the map.
   * @param {number} id the id of the pinpoint to open
   */
  openPinpoint = (id: number): void => {
    this.sendCommand('openPinpointViaManager', [id]);
  };

  /**
   * Close the current opened pinpoint. Go to the search view.
   */
  closePinpoint = (): void => {
    this.sendCommand('closePinpointViaManager');
  };

  /**
   * Update search filters (dates, tags, text).
   * @param {string} startDate start date at YYYY-MM-DD format
   * @param {string} endDate end date at YYYY-MM-DD format
   * @param {string} query text query
   * @param {string[]} tags array of string tags
   */
  setFilters = (startDate: string, endDate: string, query: string, tags: string[]): void => {
    this.sendCommand('setFiltersViaManager', [startDate, endDate, query, tags]);
  };

  /**
   * Start navigation to a pinpoint.
   * Can be an absolute navigation (start location based on phone sensors) or a relative navigation (given start location & heading).
   * If start location and initialHeading are not provided, the navigation will start with the user location
   * @param {number} id the pinpoint id to navigate to
   */
  navigateToPinpoint = (id: number): void => {
    this.sendCommand('navigateToPinpointViaManager', [id]);
  };

  /**
   * Stop the currently running navigation.
   */
  stopNavigation = (): void => {
    this.sendCommand('stopNavigationViaManager');
  };

  /**
   * Activate the bar with several rows of content (of events, pinpoints, list, etc).
   */
  enableSidebar = (): void => {
    this.sendCommand('enableSidebarViaManager');
  };

  /**
   * Deactivate the bar with several rows of content (of events, pinpoints, list, etc).
   */
  disableSidebar = (): void => {
    this.sendCommand('disableSidebarViaManager');
  };

  /**
   * Load the map in the webview using default parameters.
   */
  loadMapUrl = (): void => {
    this.sendCommand('loadMapUrlViaManager');
  };

  /**
   * Sign in to the Livemap with a Wemap token.
   * @param {string} access_token the acces_token property of your Wemap token
   */
  signInByToken = (access_token: string): void => {
    this.sendCommand('signInByTokenViaManager', [access_token]);
  };

  /**
   * Sign out the current user.
   */
  signOut = (): void => {
    this.sendCommand('signOutViaManager');
  };

  /**
   * Populates the map with given pinpoints.
   * @param {Pinpoint[]} pinpoints Pinpoints to populate the map.
   */
  setPinpoints = (pinpoints: Array<Pinpoint>): void => {
    this.sendCommand('setPinpointsViaManager', [pinpoints]);
  };

  /**
   * Define one or more lists to be displayed on the map in addition of the current pinpoints of the map.
   * @param {integer[]} sourceLists id of lists to be added to the map.
   */
  setSourceLists = (sourceLists: number[]): void => {
    this.sendCommand('setSourceListsViaManager', [sourceLists]);
  };

  render() {
    const {
      mapConfig = {
        token: '',
        webappEndpoint: 'https://livemap.getwemap.com',
      },
      style = { flex: 1 },
      onMapReady,
      onPinpointOpen,
      onPinpointClose,
      onUserLogin,
      onUserLogout,
      onEventOpen,
      onEventClose,
      onGuidingStarted,
      onGuidingStopped,
      onUrlChange,
      onMapMoved,
      onMapClick,
      onMapLongClick,
    } = this.props;

    return (
      <NativeLivemap
        // ref={this.nativeLivemap}
        mapConfig={{ ...mapConfig, ufe: !mapConfig.emmid }}
        style={style}
        onMapReady={onMapReady}
        onPinpointOpen={onPinpointOpen}
        onPinpointClose={onPinpointClose}
        onUserLogin={onUserLogin}
        onUserLogout={onUserLogout}
        onEventOpen={onEventOpen}
        onEventClose={onEventClose}
        onGuidingStarted={onGuidingStarted}
        onGuidingStopped={onGuidingStopped}
        onUrlChange={onUrlChange}
        onMapMoved={onMapMoved}
        onMapClick={onMapClick}
        onMapLongClick={onMapLongClick}
      />
    );
  }
}

export default Livemap;
