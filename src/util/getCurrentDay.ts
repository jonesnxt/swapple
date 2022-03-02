export function getCurrentDay() {
  return Math.floor(((new Date()).getTime() - 28800000) / 86400000) - 19049;
}