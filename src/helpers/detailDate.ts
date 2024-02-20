import { IDetailDate } from "@/types/reserve/reserve";

export const detailDate = (date: Date): IDetailDate => ({
  year: date.getFullYear(),
  month: date.getMonth(),
  day: date.getDate(),
  hours: date.getHours(),
  minutes: date.getMinutes(),
  seconds: date.getSeconds(),
});
