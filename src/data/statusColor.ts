import { IIncident } from "@/types/Incidents/incidents";
import { IReservation } from "@/types/reserve/reserve";

export const statusColorIncident: { [key in IIncident["state"]]: any } = {
  Aprobado: "primary",
  Completado: "success",
  Pendiente: "warning",
  Rechazado: "error",
};

export const statusColorReservation: { [key in IReservation["state"]]: any } = {
  Aprobado: "success",
  Finalizado: "primary",
  Pendiente: "warning",
  Rechazado: "error",
};
