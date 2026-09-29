const fs = require('fs');
const zlib = require('zlib');

const buf = fs.readFileSync('public/sprites/void/environment-pack/Foozle_2DS0015_Void_EnvironmentPack/Planets/Aseprite/Earth-Like planet.aseprite');

// Let's parse all frames and cels from the aseprite file
let offset = 128;
const frameCount = buf.readUInt16LE(6);
const width = buf.readUInt16LE(8);
const height = buf.readUInt16LE(10);
console.log(`Canvas: ${width}x${height}, Frames: ${frameCount}`);

const frame0Bytes = buf.readUInt32LE(offset);
let chunkOffset = offset + 16;
const chunkCountOld = buf.readUInt16LE(offset + 6);
const chunkCountNew = buf.readUInt32LE(offset + 12);
const chunks = chunkCountNew > 0 ? chunkCountNew : chunkCountOld;

const layers = [];
for (let c = 0; c < chunks; c++) {
  const cSize = buf.readUInt32LE(chunkOffset);
  const cType = buf.readUInt16LE(chunkOffset + 4);
  if (cType === 0x2004) { // Layer
    const flags = buf.readUInt16LE(chunkOffset + 6);
    const nameLen = buf.readUInt16LE(chunkOffset + 18);
    const name = buf.toString('utf8', chunkOffset + 20, chunkOffset + 20 + nameLen);
    layers.push({ name, flags, visible: (flags & 1) !== 0 });
  } else if (cType === 0x2005) { // Cel
    const layerIndex = buf.readUInt16LE(chunkOffset + 6);
    const x = buf.readInt16LE(chunkOffset + 8);
    const y = buf.readInt16LE(chunkOffset + 10);
    const opacity = buf.readUInt8(chunkOffset + 12);
    const celType = buf.readUInt16LE(chunkOffset + 13);
    console.log(`Cel for layer ${layerIndex} (${layers[layerIndex]?.name}): at (${x},${y}) celType: ${celType} size: ${cSize}`);
    if (celType === 2) { // Compressed image
      const celW = buf.readUInt16LE(chunkOffset + 22);
      const celH = buf.readUInt16LE(chunkOffset + 24);
      console.log(`  Dimensions: ${celW}x${celH}`);
    }
  }
  chunkOffset += cSize;
}
console.log('Layers:', layers);
