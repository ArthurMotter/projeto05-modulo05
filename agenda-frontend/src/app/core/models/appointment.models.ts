import { Area } from "./area.model";
import { Client } from "./client.model";
import { Professional } from "./professional.model";

export interface Appointment {
  id: number;
  date: Date;
  startTime: string;
  endTime: string;
  comments?: string;
  type: AppointmentType;
  area: Area;
  professional: Professional; 
  client: Client;
}

export interface AppointmentRequest {
  date: Date;
  startTime: string;
  endTime: string;
  comments?: string;
  type: { id: number };
  area: { id: number };
  professional: { id: number };
  client: { id: number };
}

export interface AppointmentType {
  id: number;
  type: string;
}

