import type Coordinates from './Coordinates';
import type MapBounds from './MapBounds';

export default interface MapView extends Coordinates {
  zoom: number;
  bounds: MapBounds;
}
