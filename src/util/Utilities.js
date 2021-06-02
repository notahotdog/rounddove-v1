/**
 * Capitalizes the first letter of a String
 * @param {string} str string to capitalise
 * @returns  String with first letter capitalised
 */
export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Checks if the string is empty
 * @param {string} str to check if empty
 * @returns  bool
 */
export function isEmptyString(str) {
  return str === "" || str === null;
}

/**
 * Deletes Item from array at Index
 * @param {array} array
 * @param {number} index of item to be deleted
 * @returns array with item removed
 */
export function deleteItemFromIndex(array, index) {
  var tempArray = array;
  if (index > -1) {
    tempArray.splice(index, 1);
  }
  return tempArray;
}

/**
 *  Swaps from higherIndex to lowerIndex
 * @param {array} array - to be swapped
 * @param {number} index - of item to be swapped
 * @returns
 */
export function swapWithPrevious(array, index) {
  var tempArray = array;
  if (index > 0) {
    var temp = tempArray[index];
    tempArray[index] = tempArray[index - 1];
    tempArray[index - 1] = temp;
  }
  return tempArray;
}

/**
 *  Swaps from lowerIndex to higherIndex
 * @param {array} array - to be swapped
 * @param {number} index - of item to be swapped
 * @returns
 */
export function swapWithNext(array, index) {
  var tempArray = array;

  //check if boundary exceeded
  if (index < array.length - 1) {
    var temp = tempArray[index];
    tempArray[index] = tempArray[index + 1];
    tempArray[index + 1] = temp;
  }
  return tempArray;
}

//Not used for now
/**
 * Check if the filetype is an excel
 * @param {object} file
 * @returns
 */
export function checkFileTypeExcel(file) {
  let errorMessage = "";
  if (!file || !file[0]) {
    return;
  }
  const isExcel =
    file[0].type === "application/vnd.ms-excel" ||
    file[0].type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  if (!isExcel) {
    errorMessage = "You can only upload an excel file";
  }
  console.log("file", file[0].type);
  const isLt2m = file[0].size / 1024 / 1024 < 2;
  if (!isLt2m) {
    errorMessage = "File must be smaller than 2MB!";
  }
  console.log("errorMessage", errorMessage);
  return errorMessage;
}

/**
 * Checks if the jsonObject is in the correct format
 * @param {object} jsonObj to be evaluated
 * @returns
 */
export function checkFileFormat(jsonObj) {
  return true;
}
