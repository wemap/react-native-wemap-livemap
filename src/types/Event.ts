import type Pinpoint from './Pinpoint';

export default interface Event {
  id: number;
  name: string;
  description: string;
  pinpoint: Pinpoint;
  created: string;
  updated: string;
}
