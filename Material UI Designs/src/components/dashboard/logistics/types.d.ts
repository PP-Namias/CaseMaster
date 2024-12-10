export interface Vehicle {
  id: string;
  location: string;
  latitude: number;
  longitude: number;
  temperature: number;
  startedAt?: Date;
  departedAt?: Date;
  arrivedAt?: Date;
}
