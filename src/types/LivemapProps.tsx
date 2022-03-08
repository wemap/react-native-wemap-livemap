import type { ViewStyle } from 'react-native';

import type MapConfig from './MapConfig';
import type Pinpoint from './Pinpoint';
import type MapView from './MapView';
import type Coordinates from './Coordinates';

export default interface LivemapProps {
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
   *
   * @event
   */
  onMapReady?: () => void;

  /**
   * A pinpoint is opening.
   *
   * @event
   */
  onPinpointOpen?: (pinpoint: Pinpoint) => void;

  /**
   * A pinpoint is closing.
   *
   * @event
   */
  onPinpointClose?: () => void;

  /**
   * An user log-in.
   *
   * @event
   */
  onUserLogin?: () => void;

  /**
   * An user log-out.
   *
   * @event
   */
  onUserLogout?: () => void;

  /**
   * An event is opening.
   *
   * @event
   */
  onEventOpen?: (event: { id: number }) => void;

  /**
   * An event is closing.
   *
   * @event
   */
  onEventClose?: () => void;

  /**
   * The navigation started.
   *
   * @event
   */
  onGuidingStarted?: () => void;

  /**
   * The navigation stopped.
   *
   * @event
   */
  onGuidingStopped?: () => void;

  /**
   * The webview's URL changes.
   *
   * @ignore
   */
  onUrlChange?: (event: { previousUrl: string; nextUrl: string }) => void;

  /**
   * Dispatched when the map is moved.
   *
   * @event
   */
  onMapMoved?: (event: MapView) => void;

  /**
   * Dispatched when the map is clicked.
   *
   * @event
   */
  onMapClick?: (event: Coordinates) => void;

  /**
   * Dispatched when the map is long clicked
   *
   * @event
   */
  onMapLongClick?: (event: Coordinates) => void;
}
