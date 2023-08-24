export interface OfficeHour {
  openTime: string;
  closeTime: string;
  breakTime?: { startTime: string; endTime: string };
  lastOrder?: string;
}

type OfficeHours = Record<string, OfficeHour>;

export default OfficeHours;
