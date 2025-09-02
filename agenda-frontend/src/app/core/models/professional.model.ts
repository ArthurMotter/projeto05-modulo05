import { Area } from "./area.model";

export interface Professional {
  id: number;
  name: string;
  phone: string;
  email: string;
  active: boolean;
  areas: Area[];
}