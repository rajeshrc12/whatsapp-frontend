import moment from "moment-timezone";
export const getTimeInAmPM = (date) => {
  if (!date) return "";
  else if (date.toLowerCase() === "online") return date;
  else
    return moment
      .tz(date, Intl.DateTimeFormat().resolvedOptions().timeZone)
      .format("hh:mm a");
};
