const gl = document.querySelector("canvas").getContext("webgl");
const image = document.getElementById("sa_flag");

if (!gl) {
  throw new Error("WebGL not available/supported");
}
const r = 0.5;

const vertices = new Float32Array([
  //x,y,z
  r,
  r,
  r,
  r,
  -r,
  r,
  -r,
  r,
  r,
  -r,
  r,
  r,
  r,
  -r,
  r,
  -r,
  -r,
  r,
]);

const texCoords = new Float32Array([
  //x,y
  1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0,
]);

gl.clearColor(0, 0, 0, 0.25);
gl.clear(gl.COLOR_BUFFER_BIT);

const program = gl.createProgram();

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const texCoordBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

const textureBuffer = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, textureBuffer);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(
  vertexShader,
  `attribute vec2 vtexture;
    attribute vec3 pos;
    varying vec2 fragtexture;

    void main() {
        fragtexture = vtexture;
        gl_Position = vec4(pos, 1.0);
    }`
);
gl.compileShader(vertexShader);
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
  throw new Error(gl.getShaderInfoLog(vertexShader));
}

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(
  fragmentShader,
  `
    precision mediump float;
    varying vec2 fragtexture;
    uniform sampler2D fragsampler;
    
    void main() {
        gl_FragColor = texture2D(fragsampler, fragtexture); //vec4(1.0, 0.0, 0.0, 1.0);
        }`
);
gl.compileShader(fragmentShader);
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
  throw new Error(gl.getShaderInfoLog(fragmentShader));
}

gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  throw new Error(gl.getProgramInfoLog(program));
}
gl.useProgram(program);
gl.enable(gl.DEPTH_TEST);

const positionLocation = gl.getAttribLocation(program, "pos");
gl.enableVertexAttribArray(positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

const textureLocation = gl.getAttribLocation(program, "vtexture");
gl.enableVertexAttribArray(textureLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
gl.vertexAttribPointer(textureLocation, 2, gl.FLOAT, false, 0, 0);

// gl.clear(gl.COLOR_BUFFER_BIT);
// gl.bindTexture(gl.TEXTURE_2D, textureBuffer);
gl.activeTexture(gl.TEXTURE0);
gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 3);
