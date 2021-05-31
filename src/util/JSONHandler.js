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

export function getDefaultSubcomponentTemplate(name) {
  const obj = {
    subcomponentName: "default",
    hazards: [
      {
        hazardName: "default",
        cause: ["default"],
        consequence: ["default"],
        preventitiveSafeguards: ["default"],
        mitigatingSafeguards: ["default"],
      },
    ],
  };
  return obj;
}

// export class DisplayJson
