export type Day = "월" | "화" | "수" | "목" | "금" | "토" | "일";

export interface OfficeHour {
  openTime: string;
  closeTime: string;
  breakTime?: { startTime: string; endTime: string };
  lastOrder?: string;
}

type OfficeHours = Record<Day, OfficeHour>;

export default OfficeHours;
