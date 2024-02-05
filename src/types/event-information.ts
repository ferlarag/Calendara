import { EventColors } from "@prisma/client";

export enum AvailableLocations {
  zoom = "Zoom Call",
  phone = "Phone Call",
  googleMeets = "Googe Meets Call",
  inPerson = "In-Person",
}

export interface EventLocation {
  id: string;
  type: AvailableLocations;
  location?: string;
  phoneCountryCode?: string;
  phoneNumber?: string;
  instructions?: string | null;
}

export interface EventInformation {
  color: EventColors;
  name: string;
  link: string;
  duration: number;
  description: string;
  locations: EventLocation[];
}
