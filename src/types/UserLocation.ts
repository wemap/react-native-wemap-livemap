import type Coordinates from './Coordinates';

export default interface UserLocation extends Coordinates {
  latitude: number;
  longitude: number;
  altitude?: number;
  accuracy?: number;
}