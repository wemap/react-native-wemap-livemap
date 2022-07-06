export default interface Pinpoint {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  external_data?: {};
  image_url?: string;
  media_url?: string;
  media_type?: string;
  geo_entity_shape?: {};
  tags?: string[];
}
