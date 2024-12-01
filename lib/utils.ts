import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const formatDateTime = (dateString: Date | string, timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone) => {
  const dateTime: Intl.DateTimeFormatOptions = {
    // weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    year: "numeric", // numeric year (e.g., '2023')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false),
    timeZone: timeZone, // use the provided timezone
  };
  return dateTime
}

export const formatTheDate =(date: Date|string, timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone)=>{
  const data = new Date(date)
const formattedDate = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long', // Full month name
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true, // Optional: Set to `false` for 24-hour format
  timeZone: timeZone// Use 'UTC' or specify the user's timezone
}).format(data);
return formattedDate
}
export function encryptKey(passkey: string) {
  return btoa(passkey)
}
export function decryptKey(passkey: string) {
  return atob(passkey);
}