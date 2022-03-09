import type Pinpoint from './Pinpoint';
import type MapView from './MapView';
import type Coordinates from './Coordinates';

export default interface LivemapEventProps {
  /**
   * The map is ready.
   *
   * @event
   */
  onMapReady?: (value: undefined) => void;

  /**
   * A pinpoint is opening.
   *
   * @event
   */
  onPinpointOpen?: (value: Pinpoint) => void;

  /**
   * A pinpoint is closing.
   *
   * @event
   */
  onPinpointClose?: (value: undefined) => void;

  /**
   * An user log-in.
   *
   * @event
   */
  onUserLogin?: (value: undefined) => void;

  /**
   * An user log-out.
   *
   * @event
   */
  onUserLogout?: (value: undefined) => void;

  /**
   * An event is opening.
   *
   * @event
   */
  onEventOpen?: (value: { id: number }) => void;

  /**
   * An event is closing.
   *
   * @event
   */
  onEventClose?: (value: undefined) => void;

  /**
   * The navigation started.
   *
   * @event
   */
  onGuidingStarted?: (value: undefined) => void;

  /**
   * The navigation stopped.
   *
   * @event
   */
  onGuidingStopped?: (value: undefined) => void;

  /**
   * The webview's URL changes.
   *
   * @ignore
   */
  onUrlChange?: (value: { previousUrl: string; nextUrl: string }) => void;

  /**
   * Dispatched when the map is moved.
   *
   * @event
   */
  onMapMoved?: (value: MapView) => void;

  /**
   * Dispatched when the map is clicked.
   *
   * @event
   */
  onMapClick?: (value: Coordinates) => void;

  /**
   * Dispatched when the map is long clicked
   *
   * @event
   */
  onMapLongClick?: (value: Coordinates) => void;
}
