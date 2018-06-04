function sphereGeometry(latitudeBands, longitudeBands, radius) {
  const vertexPositionData = [];
  const normalData = [];
  const textureCoordData = [];
  for (let latNumber = 0; latNumber <= latitudeBands; latNumber += 1) {
    const theta = latNumber * (Math.PI / latitudeBands);
    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);
    for (let longNumber = 0; longNumber <= longitudeBands; longNumber += 1) {
      const phi = longNumber * ((2 * Math.PI) / longitudeBands);
      const sinPhi = Math.sin(phi);
      const cosPhi = Math.cos(phi);
      const x = cosPhi * sinTheta;
      const y = cosTheta;
      const z = sinPhi * sinTheta;
      const u = 1 - (longNumber / longitudeBands);
      const v = 1 - (latNumber / latitudeBands);
      normalData.push(x);
      normalData.push(y);
      normalData.push(z);
      textureCoordData.push(u);
      textureCoordData.push(v);
      vertexPositionData.push(radius * x);
      vertexPositionData.push(radius * y);
      vertexPositionData.push(radius * z);
    }
  }

  const indexData = [];
  for (let latNumber = 0; latNumber < latitudeBands; latNumber += 1) {
    for (let longNumber = 0; longNumber < longitudeBands; longNumber += 1) {
      const first = (latNumber * (longitudeBands + 1)) + longNumber;
      const second = first + longitudeBands + 1;
      indexData.push(first);
      indexData.push(second);
      indexData.push(first + 1);
      indexData.push(second);
      indexData.push(second + 1);
      indexData.push(first + 1);
    }
  }

  return {
    vertexPositions: vertexPositionData,
    vertexNormals: normalData,
    textureCoords: textureCoordData,
    indices: indexData,
  };
}
