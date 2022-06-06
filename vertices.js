const triangleVertices = new Float32Array([
  //x,y,z
  -0.5, -0.5, 0.0, 0.5, -0.5, 0.0, 0.0, 0.5, 0.0,
]);

const r = 0.25;

const box = new Float32Array([
  //x,y,z,     r, g, b
  //Front face
  -r,
  r,
  -r,
  ...violet,
  -r,
  -r,
  -r,
  ...violet,
  r,
  -r,
  -r,
  ...violet,
  r,
  r,
  -r,
  ...violet,
  -r,
  r,
  -r,
  ...violet,
  r,
  -r,
  -r,
  ...violet,

  //Back face
  -r,
  r,
  r,
  ...red,
  -r,
  -r,
  r,
  ...red,
  r,
  -r,
  r,
  ...red,
  r,
  r,
  r,
  ...red,
  -r,
  r,
  r,
  ...red,
  r,
  -r,
  r,
  ...red,

  //Right face
  r,
  r,
  r,
  ...green,
  r,
  -r,
  r,
  ...green,
  r,
  r,
  -r,
  ...green,
  r,
  -r,
  r,
  ...green,
  r,
  r,
  -r,
  ...green,
  r,
  -r,
  -r,
  ...green,

  //Left face
  -r,
  r,
  r,
  ...yellow,
  -r,
  -r,
  r,
  ...yellow,
  -r,
  r,
  -r,
  ...yellow,
  -r,
  -r,
  r,
  ...yellow,
  -r,
  r,
  -r,
  ...yellow,
  -r,
  -r,
  -r,
  ...yellow,

  //Bottom face
  -r,
  -r,
  r,
  ...blue,
  r,
  -r,
  r,
  ...blue,
  -r,
  -r,
  -r,
  ...blue,
  -r,
  -r,
  -r,
  ...blue,
  r,
  -r,
  -r,
  ...blue,
  r,
  -r,
  r,
  ...blue,

  //Top face
  -r,
  r,
  r,
  ...cyan,
  r,
  r,
  r,
  ...cyan,
  -r,
  r,
  -r,
  ...cyan,
  -r,
  r,
  -r,
  ...cyan,
  r,
  r,
  -r,
  ...cyan,
  r,
  r,
  r,
  ...cyan,
]);

const textureVertices = new Float32Array([
  //x,y,z,     r, g, b
 //Front face
 -r,
 r,
 -r,

 -r,
 -r,
 -r,

 r,
 -r,
 -r,

 r,
 r,
 -r,

 -r,
 r,
 -r,

 r,
 -r,
 -r,

 //Back face
 -r,
 r,
 r,

 -r,
 -r,
 r,

 r,
 -r,
 r,

 r,
 r,
 r,

 -r,
 r,
 r,

 r,
 -r,
 r,

 //Right face
 r,
 r,
 r,

 r,
 -r,
 r,

 r,
 r,
 -r,

 r,
 -r,
 r,

 r,
 r,
 -r,

 r,
 -r,
 -r,

 //Left face
 -r,
 r,
 r,

 -r,
 -r,
 r,

 -r,
 r,
 -r,

 -r,
 -r,
 r,

 -r,
 r,
 -r,

 -r,
 -r,
 -r,

 
 //Bottom face
 -r,
 -r,
 r,

 r,
 -r,
 r,

 -r,
 -r,
 -r,

 -r,
 -r,
 -r,

 r,
 -r,
 -r,

 r,
 -r,
 r,

  //Top face
 -r,
 r,
 r,

 r,
 r,
 r,

 -r,
 r,
 -r,

 -r,
 r,
 -r,

 r,
 r,
 -r,

 r,
 r,
 r,
]);

const textureCoords = new Float32Array([
  //u,v
  0,0, 1,0, 0,1, 0,1, 1,0, 1,1,
  0,0, 1,0, 0,1, 0,1, 1,0, 1,1,
  0,0, 1,0, 0,1, 0,1, 1,0, 1,1,
  0,0, 1,0, 0,1, 0,1, 1,0, 1,1,
  0,0, 1,0, 0,1, 0,1, 1,0, 1,1,
  0,0, 1,0, 0,1, 0,1, 1,0, 1,1,



 ]);
