import { IIncident } from "@/types/Incidents/incidents";

export const statusColorIncident: { [key in IIncident["state"]]: any } = {
  Aprobado: "primary",
  Completado: "success",
  Pendiente: "warning",
  Rechazado: "error",
};
