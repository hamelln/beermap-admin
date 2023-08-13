function organizeDays(days: string) {
  if (days.length === 1) return days;
  if (days.length === 2) {
    if (days === "월일") return "일, 월";
    return `${(days[0], days[1])}`;
  }
  if (days.length === 7) return "매일";

  const allDay = "월화수목금토일월화수목금토";
  const areContinueDays = (days: string) => allDay.includes(days);
  const convertString = (days: string) =>
    `${days[0]} ~ ${days[days.length - 1]}`;

  if (areContinueDays(days)) return convertString(days);

  const arrangeDays = (days: string) => {
    const allDays = ["일", "월", "화", "수", "목", "금", "토"];
    let startIndex = -1;

    for (let i = 0; i < allDays.length - 1; i++) {
      if (days.includes(allDays[i]) && !days.includes(allDays[i + 1])) {
        startIndex = (i + 1) % allDays.length;
        break;
      }
    }

    if (startIndex === -1) return days;

    let rearranged = "";
    for (let i = startIndex; i < allDays.length; i++) {
      if (days.includes(allDays[i])) {
        rearranged += allDays[i];
      }
    }
    for (let i = 0; i < startIndex; i++) {
      if (days.includes(allDays[i])) {
        rearranged += allDays[i];
      }
    }

    return rearranged;
  };
  const arrangedDays = arrangeDays(days);
  if (areContinueDays(arrangedDays)) return convertString(arrangedDays);

  return days.split("").join(", ");
}

export default organizeDays;
