/**
 * PrintJSON to console
 * @param {Object} jsonObj to be console logged
 */
export function printJSON(jsonObj) {
  console.log(JSON.stringify(jsonObj));
}

/**
 * Returns a unique Subnode ID
 * @param {string} nodeName
 * @param {string} subnodeName
 * @returns  unique subnode id
 */
export function getUniqueNodeID(nodeName, subnodeName) {
  console.log("GETTING NODE NAME");
  console.log(nodeName.concat(subnodeName));
  return nodeName.concat(subnodeName);
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
  subnodeName: "Default subnode",
  hazards: [
    {
      hazardName: "Default Hazard",
      causes: ["Default Cause"],
      consequences: ["Default Consquence"],
      preventativeSafeguards: ["Default preventative safeguard"],
      mitigatingSafeguards: ["Default mitigating safeguard"],
    },
  ],
};

/**
 * Hazard JSON Template
 */
export const hazardTemplate = {
  hazardName: "Default Hazard",
  causes: ["Default Cause"],
  consequences: ["Default Consquence"],
  preventativeSafeguards: ["Default preventative safeguard"],
  mitigatingSafeguards: ["Default mitigating safeguard"],
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
