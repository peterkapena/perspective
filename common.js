const red = [1.0, 0.0, 0.0, 1.0];
const blue = [0.0, 0.0, 1.0, 1.0];
const green = [0.0, 1.0, 0.0, 1.0];
const white = [1.0, 1.0, 1.0, 1.0];
const black = [0.0, 0.0, 0.0, 1.0];
const yellow = [1.0, 1.0, 0.0, 1.0];
const orange = [1.0, 0.5, 0.0, 1.0];
const magenta = [1.0, 0.0, 1.0, 1.0];
const violet = [0.386, 0.119, 0.44, 1.0];
const cyan = [0, 1.0, 1.0, 1.0];

function compileShader(type, src, gl) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader));
  }
  return shader;
}

function setProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program));
  }
  gl.enable(gl.DEPTH_TEST);
  return program;
}

function setBuffer(gl, data) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  return buffer;
}

function createIdentityMat4() {
  return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
}

function rotateY(radians) {
  const c = Math.cos(radians);
  const s = Math.sin(radians);
  return new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]);
}

function rotateX(radians) {
  const c = Math.cos(radians);
  const s = Math.sin(radians);
  return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]);
}

function rotateZ(radians) {
  const c = Math.cos(radians);
  const s = Math.sin(radians);
  return new Float32Array([c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
}

function rotate(out, a, rotationMatrix) {
  out = multiply4x4Matrices(a, rotationMatrix);
}

function rotate(a, rotationMatrix) {
  return multiply4x4Matrices(a, rotationMatrix);
}

function translate(x, y, z) {
  return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1]);
}

function multiply4x4Matrices(A, B) {
  const result = [];
  for (let k = 0; k <= 12; k += 4) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0, bCount = 0; j < 4; j++, bCount += 4) {
        if (result[k + i])
          result[k + i] += A[k + (j % 4)] * B[bCount + (i % 4)];
        else result[k + i] = A[k + (j % 4)] * B[bCount + (i % 4)];
      }
    }
  }
  return result;
}
