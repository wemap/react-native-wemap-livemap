
export default interface OfflineOptions {
  /** Enable the offline feature */
  enable?: Boolean;
  /**  Mbtiles file to load for offline tiles */
  tiles?: String;
  /** Array of list to not use for offline  */
  blacklist?: Int16Array;
}