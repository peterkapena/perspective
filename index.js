const gl = document.querySelector("canvas").getContext("webgl");
const image = document.getElementById("sa_flag");

if (!gl) {
  throw new Error("WebGL not available/supported");
}

gl.clearColor(0, 0, 0, 0.25);
gl.clear(gl.COLOR_BUFFER_BIT);

const vertexShaderSrc = `
attribute vec3 pos;
attribute vec4 colours;
varying vec4 vcolours;
uniform float y;
uniform float x;
uniform mat4 model;
attribute vec2 vtexture;
varying vec2 fragtexture;

  void main(){
      gl_Position = model * vec4(pos, 1.0) + vec4(x, y, 0, 0);
      vcolours = colours;
      fragtexture = vtexture;
  }`;

const fragmentShaderSrc = `
precision mediump float;
varying vec4 vcolours;
varying vec2 fragtexture;
uniform sampler2D fragsampler;

    void main(){
        gl_FragColor = texture2D(fragsampler, fragtexture);
        // gl_FragColor = vec4(vcolours);    // red
    }`;

const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSrc, gl);
const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSrc, gl);

const program = setProgram(gl, vertexShader, fragmentShader);

setBuffer(gl, box);

const textureBuffer = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, textureBuffer);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

const positionLocation = gl.getAttribLocation(program, "pos");
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 7*4, 0);

// const coloursLocation = gl.getAttribLocation(program, "colours");
// gl.enableVertexAttribArray(coloursLocation);
// gl.vertexAttribPointer(coloursLocation, 3, gl.FLOAT, false, 7 * 4, 3 * 4);

const texCoordBuffer = setBuffer(gl, textureCoords);

const textureLocation = gl.getAttribLocation(program, "vtexture");
gl.enableVertexAttribArray(textureLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
gl.vertexAttribPointer(textureLocation, 2, gl.FLOAT, false, 0, 0);

gl.useProgram(program);

let x1 = 0;
let y1 = 0.7;

let isSpinning = false;

const incr = 0.025;

let model1 = translate(x1, y1, 0);
// model1 = rotate(model1, rotateY(Math.PI ));
// model1 = rotate(model1, rotateY(Math.PI ));
let model2 = createIdentityMat4();
let spinner = null;
let spinVelocity = 10;

draw();

function draw() {
  gl.activeTexture(gl.TEXTURE0);

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.uniformMatrix4fv(gl.getUniformLocation(program, "model"), false, model1);
  gl.drawArrays(gl.TRIANGLES, 0, box.length / 7);

  gl.uniformMatrix4fv(gl.getUniformLocation(program, "model"), false, model2);
  gl.uniform1f(gl.getUniformLocation(program, "y"), -0.25);
  gl.uniform1f(gl.getUniformLocation(program, "x"), 0);
  gl.drawArrays(gl.TRIANGLES, 0, box.length / 7);

  requestAnimationFrame(draw);
}

document.onkeydown = (event) => {
  switch (event.key) {
    case "ArrowDown":
      y1 -= incr;
      break;
    case "ArrowUp":
      y1 += incr;
      break;
    case "ArrowLeft":
      x1 -= incr;
      break;
    case "ArrowRight":
      x1 += incr;
      break;
  }
  model1 = translate(x1, y1, 0);
  model1 = rotate(model1, rotateX(Math.PI / 8));
  model1 = rotate(model1, rotateY(Math.PI / 8));
};

document.querySelectorAll("button").forEach((element) => {
  element.onclick = () => {
    if (element.dataset.rotation) rotation(element.dataset.rotation, Math.PI);

    if (element.dataset.spinning) spin(element.dataset.spinning);
    if (element.dataset.speed) {
      if (element.dataset.speed === "+") {
        spinVelocity += 0.5;
      } else if (element.dataset.speed === "-") {
        spinVelocity -= 0.5;
      }
    }
  };
});

function rotation(axis, radians) {
  switch (axis) {
    case "x":
      model2 = rotate(model2, rotateX(radians));
      break;
    case "y":
      model2 = rotate(model2, rotateY(radians));
      break;
    case "z":
      model2 = rotate(model2, rotateZ(radians));
      break;
  }
}

function spin(axis) {
  isSpinning = !isSpinning;
  if (isSpinning) {
    spinner = setInterval(() => {
      radians = convertToRad(spinVelocity);
      document.getElementById("spnSpeed").innerHTML = spinVelocity;
      switch (axis) {
        case "x":
          model2 = rotate(model2, rotateX(radians));
          break;
        case "y":
          model2 = rotate(model2, rotateY(radians));
          break;
        case "z":
          model2 = rotate(model2, rotateZ(radians));
          break;
      }
    }, 150);
  } else {
    clearInterval(spinner);
  }
}

function convertToRad(degrees) {
  return degrees * (Math.PI / 180);
}
