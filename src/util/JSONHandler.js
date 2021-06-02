/**
 * PrintJSON to console
 * @param {Object} jsonObj to be console logged
 */
export function printJSON(jsonObj) {
  console.log(JSON.stringify(jsonObj));
}

/**
 *  Returns an Node with proper format
 * @param {String} name
 * @param {Number} noSubnodes
 * @returns Node with template of n no Subnodes
 */
export function getNodeTemplate(name, noSubnodes) {
  var nodeObj = {
    nodeName: name,
    subnodes: [],
  };

  for (var i = 0; i < noSubnodes; i++) {
    nodeObj.subnodes.push(subnodeTemplate);
  }
  return nodeObj;
}

/**
 *  Subnode JSON Template
 */
export const subnodeTemplate = {
  subnodeName: "Default",
  hazards: [
    {
      hazardName: "Default",
      causes: ["Default"],
      consequences: ["Default"],
      preventativeSafeguards: ["Default"],
      mitigatingSafeguards: ["Default"],
    },
  ],
};

/**
 * Hazard JSON Template
 */
export const hazardTemplate = {
  hazardName: "Default",
  causes: ["Default"],
  consequences: ["Default"],
  preventativeSafeguards: ["Default"],
  mitigatingSafeguards: ["Default"],
};

//Outdated

export function getComponentTemplate(name, noSubcomponents) {
  var componentObj = {
    componentName: name,
    subcomponents: [],
  };

  for (var i = 0; i < noSubcomponents; i++) {
    componentObj.subcomponents.push(subcomponentTemplate);
  }
  return componentObj;
}

//Should return a json object
export const subcomponentTemplate = {
  subcomponentName: "Default",
  hazards: [
    {
      hazardName: "Default",
      causes: ["Default"],
      consequences: ["Default"],
      preventativeSafeguards: ["Default"],
      mitigatingSafeguards: ["Default"],
    },
  ],
};
