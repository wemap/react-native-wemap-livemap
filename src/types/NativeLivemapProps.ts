import type { ViewStyle } from 'react-native';

import type MapConfig from './MapConfig';
import type LivemapEvent from './LivemapEvent';

export default interface LivemapProps {
  /**
   * Your Livemap config. You have the choice between UFE and emmid mode.
   * If you don't provide any emmid, the default mode will be UFE.
   * If you want to display your map via an emmid, your config will need your personal token.
   */
  mapConfig: MapConfig;

  /**
   * Regular View style.
   */
  style: ViewStyle;

  /**
   * The map is ready.
   *
   * @event
   */
  onMapReady?: (livemapEvent: LivemapEvent) => void;

  /**
   * A pinpoint is opening.
   *
   * @event
   */
  onPinpointOpen?: (livemapEvent: LivemapEvent) => void;

  /**
   * A pinpoint is closing.
   *
   * @event
   */
  onPinpointClose?: (livemapEvent: LivemapEvent) => void;

  /**
   * An user log-in.
   *
   * @event
   */
  onUserLogin?: (livemapEvent: LivemapEvent) => void;

  /**
   * An user log-out.
   *
   * @event
   */
  onUserLogout?: (livemapEvent: LivemapEvent) => void;

  /**
   * An event is opening.
   *
   * @event
   */
  onEventOpen?: (livemapEvent: LivemapEvent) => void;

  /**
   * An event is closing.
   *
   * @event
   */
  onEventClose?: (livemapEvent: LivemapEvent) => void;

  /**
   * The navigation started.
   *
   * @event
   */
  onGuidingStarted?: (livemapEvent: LivemapEvent) => void;

  /**
   * The navigation stopped.
   *
   * @event
   */
  onGuidingStopped?: (livemapEvent: LivemapEvent) => void;

  /**
   * The webview's URL changes.
   *
   * @ignore
   */
  onUrlChange?: (livemapEvent: LivemapEvent) => void;

  /**
   * Dispatched when the map is moved.
   *
   * @event
   */
  onMapMoved?: (livemapEvent: LivemapEvent) => void;

  /**
   * Dispatched when the map is clicked.
   *
   * @event
   */
  onMapClick?: (livemapEvent: LivemapEvent) => void;

  /**
   * Dispatched when the map is long clicked
   *
   * @event
   */
  onMapLongClick?: (livemapEvent: LivemapEvent) => void;

  /**
   * TODO:
   *
   * @event
   */
  onContentUpdated?: (livemapEvent: LivemapEvent) => void;

  /**
   * TODO:
   *
   * @event
   */
  onActionButtonClick?: (livemapEvent: LivemapEvent) => void;
}
