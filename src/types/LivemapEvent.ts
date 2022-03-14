import type { SyntheticEvent } from 'react';

export default interface LivemapEvent extends Omit<SyntheticEvent, 'nativeEvent'> {
  nativeEvent: {
    value: any;
  };
}
