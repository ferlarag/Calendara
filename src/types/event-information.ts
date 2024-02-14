import { type EventColors } from "@prisma/client";

export enum AvailableLocations {
  zoom = "Zoom Call",
  phone = "Phone Call",
  googleMeets = "Googe Meets Call",
  inPerson = "In-Person",
}

export interface EventLocation {
  id: string;
  type: "zoom" | "phone" | "googleMeets" | "inPerson";
  location?: string;
  phoneCountryCode?: string;
  phoneNumber?: string;
  instructions?: string;
}

export interface EventInformation {
  color: EventColors;
  name: string;
  link: string;
  duration: string;
  description: string;
  locations: EventLocation[];
}
