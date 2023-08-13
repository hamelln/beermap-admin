export interface OfficeHour {
  openTime: string;
  closeTime: string;
  breakTime?: { startTime: string; endTime: string };
  lastOrder?: string;
}

export default interface OfficeHours {
  [K: string]: OfficeHour;
}
