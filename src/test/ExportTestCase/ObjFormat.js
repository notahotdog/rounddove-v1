// //Workshop Content
const jsonObjTest = {
  workshopName: "BatteryWorkshop",
  nodes: [
    {
      nodeName: " Tank Space",
      subnodes: [
        {
          subnodeName: "H2 Tanks (on exposed deck) 27kg hydrogen per tank",
          hazards: [
            {
              hazardName:
                "Gas development in tank area High volume leakage from tank bank (12 tanks)",
              causes: [
                "Tank Rupture",
                "Valve Failure",
                "Regulator Failure",
                "Pipe Rupture",
              ],
              consequences: [
                "Rapid release of hydrogen,fire would be occurred if ignited",
                "Explosion due to tank rupture",
              ],
              preventativeSafeguards: [
                "Pressure testing of tanks and piping system",
                "Advantage of type 4 hydrogen pressure to prevent from leakage",
              ],
              mitigatingSafeguards: [
                "Pressure indicator is in place",
                "Isolation valve will be used for each tank bank and potential ruptured piping system",
              ],
            },
            {
              hazardName: "Long duration Leakage",
              causes: ["Pipe fitting failure", "Human error during assembly"],
              consequences: [
                "Rapid release of hydrogen",
                "Jet fire due to high pressure",
              ],
              preventativeSafeguards: [
                "Size of the piping is designed to ensure mechanical integrity",
                "metal mesh to provide mechanical barriers",
              ],
              mitigatingSafeguards: [
                "Flame detector system in place",
                "Tank pressure monitoring with alarms",
              ],
            },
          ],
        },
        {
          subnodeName: "subnode B",
          hazards: [
            {
              hazardName: "Fire Hazard",
              causes: ["hot water"],
              consequences: ["something"],
              preventativeSafeguards: ["something"],
              mitigatingSafeguards: ["something"],
            },
            {
              hazardName: "water Hazard",
              causes: ["improper use of xItem"],
              consequences: ["something"],
              preventativeSafeguards: ["something"],
              mitigatingSafeguards: ["something"],
            },
          ],
        },
      ],
    },
    {
      nodeName: " Fuel Space",
      subnodes: [
        {
          subnodeName: "subnode B",
          hazards: [
            {
              hazardName: "Fire Hazard",
              causes: ["no water"],
              consequences: ["something"],
              preventativeSafeguards: ["something"],
              mitigatingSafeguards: ["something"],
            },
            {
              hazardName: "water Hazard",
              causes: ["loll "],
              consequences: ["something"],
              preventativeSafeguards: ["something"],
              mitigatingSafeguards: ["something"],
            },
          ],
        },
      ],
    },
    {
      nodeName: " PEM Fuel Cell System",
      subnodes: [
        {
          subnodeName: "subnode C",
          hazards: [
            {
              hazardName: "Fire Hazard",
              causes: ["a", "b", "c"],
              consequences: ["something"],
              preventativeSafeguards: ["something"],
              mitigatingSafeguards: ["something"],
            },
            {
              hazardName: "water Hazard",
              causes: ["a", "b", "c"],
              consequences: ["something"],
              preventativeSafeguards: ["something"],
              mitigatingSafeguards: ["something"],
            },
          ],
        },
      ],
    },
  ],
};
