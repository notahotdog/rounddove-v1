export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

//Checks if empty string
export function isEmptyString(str) {
  return str === "" || str === null;
}

//Deletes Item from array at Index
export function deleteItemFromIndex(array, index) {
  var tempArray = array;
  if (index > -1) {
    tempArray.splice(index, 1);
  }
  return tempArray;
}

//Swaps from Higher Index to lowerIndex
export function swapWithPrevious(array, index) {
  var tempArray = array;
  if (index > 0) {
    var temp = tempArray[index];
    tempArray[index] = tempArray[index - 1];
    tempArray[index - 1] = temp;
  }
  return tempArray;
}

//Swaps from Higher Index to lowerIndex
export function swapWithNext(array, index) {
  var tempArray = array;
  if (index < array.length - 1) {
    //If it doesnt exceed theearswapable boundary
    var temp = tempArray[index];
    tempArray[index] = tempArray[index + 1];
    tempArray[index + 1] = temp;
  }
  return tempArray;
}
