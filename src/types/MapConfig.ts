import type MapBounds from './MapBounds';
import type OfflineOptions from './OfflineOptions';

export default interface MapConfig {
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
  /** the offline configuration */
  offlineOptions?: OfflineOptions
}
