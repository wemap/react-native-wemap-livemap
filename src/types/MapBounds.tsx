import type Coordinates from './Coordinates';

export default interface MapBounds {
  northEast: Coordinates;
  southWest: Coordinates;
}
