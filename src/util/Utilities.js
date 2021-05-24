export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isEmptyString(str) {
  return str === "" || str === null;
}
