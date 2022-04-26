import type { SyntheticEvent } from 'react';

/**
 * @ignore
 */
export default interface LivemapEvent extends Omit<SyntheticEvent, 'nativeEvent'> {
  nativeEvent: {
    value: any;
  };
}
