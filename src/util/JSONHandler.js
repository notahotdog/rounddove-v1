// const fs = require("fs");

import { render } from "@testing-library/react";

// export function readJson(readObj){

//     fs.readFile(,"utf-8", (err,jsonString) => {
//         console.log(jsonString);
//     });
// }

export function printJSON(jsonObj) {
  console.log(JSON.stringify(jsonObj));
}

export function displayJSON(props) {
  // console.log("DISPLAY JSON DATA");
  return (
    <div>
      <h1>DISPLAY JSON DATA</h1>
      {/* <h1> Workshop Name: {jsonObj.workshopName}</h1> */}
    </div>
  );
}

// export class DisplayJson
