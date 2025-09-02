import { Area } from "./area.model";
import { Client } from "./client.model";
import { Professional } from "./professional.model";

export interface Appointment {
  id: number;
  client: Client;
  area: Area;
  professional: Professional;
  type: AppointmentType;
  date: Date;
  startTime: string;
  endTime: string;
  comments: string;
}

export interface AppointmentType {
  id: number;
  type: string;
}

