import type PolylineOptions from './PolylineOptions';
import type Coordinates from './Coordinates';
import type Pinpoint from './Pinpoint';

export default interface LivemapRef {
  /**
   * Open an event on the map. This can only be used for maps which use events.
   * @param {number} id the id of the event to open
   */
  openEvent: (id: number) => void;

  /**
   * Close the current opened event. Go to the search view.
   *
   * @callback HelloCallback
   */
  closeEvent: () => void;

  /**
   * Open a pinpoint on the map.
   * @param {number} id the id of the pinpoint to open
   */
  openPinpoint: (id: number) => void;

  /**
   * Close the current opened pinpoint. Go to the search view.
   */
  closePinpoint: () => void;

  /**
   * Update search filters (dates, tags, text).
   * @param {string} startDate start date at YYYY-MM-DD format
   * @param {string} endDate end date at YYYY-MM-DD format
   * @param {string} query text query
   * @param {string[]} tags array of string tags
   */
  setFilters: (startDate: string, endDate: string, query: string, tags: string[]) => void;

  /**
   * Start navigation to a pinpoint.
   * Can be an absolute navigation (start location based on phone sensors) or a relative navigation (given start location & heading).
   * If start location and initialHeading are not provided, the navigation will start with the user location
   * @param {number} id the pinpoint id to navigate to
   */
  navigateToPinpoint: (id: number) => void;

  /**
   * Stop the currently running navigation.
   */
  stopNavigation: () => void;

  /**
   * Activate the bar with several rows of content (of events, pinpoints, list, etc).
   */
  enableSidebar: () => void;

  /**
   * Deactivate the bar with several rows of content (of events, pinpoints, list, etc).
   */
  disableSidebar: () => void;

  /**
   * Load the map in the webview using default parameters.
   */
  loadMapUrl: () => void;

  /**
   * Sign in to the Livemap with a Wemap token.
   * @param {string} access_token the acces_token property of your Wemap token
   */
  signInByToken: (access_token: string) => void;

  /**
   * Sign out the current user.
   */
  signOut: () => void;

  /**
   * Populates the map with given pinpoints.
   * @param {Pinpoint[]} pinpoints the pinpoints to populate the map.
   */
  setPinpoints: (pinpoints: Pinpoint[]) => void;

  /**
   * Define one or more lists to be displayed on the map in addition of the current pinpoints of the map.
   * @param {[number]} sourceLists id of lists to be added to the map.
   */
  setSourceLists: (sourceLists: [number]) => void;

  /**
   * Draw a polyline on the map between multiple coordinates.
   * You can either draw a raw array of coordinates or use our itinerary service to draw a route between multiple points.
   * @param {[Coordinates]} coordinatesList id of lists to be added to the map.
   * @param {PolylineOptions} options the polyline options. Please refer to the [JS documentation](/docs/javascript/livemap#livemapdrawpolyline) to check its default values.
   */
  drawPolyline: (coordinatesList: [Coordinates], options: PolylineOptions) => Promise<String>;

  /**
   * Remove a polyline from the map.
   * @param {string} id id of polyline.
   */
  removePolyline: (id: string) => void;

  /**
   * Center the map on the given position.
   * @param center the new center.
   */
  setCenter: (center: Coordinates) => void;

  /**
   * Center the map on the given position and set the zoom level.
   * @param center the new center.
   * @param zoom the new zoom level.
   */
  centerTo: (center: Coordinates, zoom: Number) => void;
}
