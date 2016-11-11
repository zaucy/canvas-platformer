"use strict";

// Stylesheets
var mainStylesheet = require("./styles/main.scss");

// Assets
var crateUrl = require("./assets/crate.png");

// Variables
var canvasElement = document.createElement("canvas");
var gl = null;

function initWebGl() {
	gl = canvasElement.getContext("webgl")

	if(!gl) {
		gl = canvasElement.getContext("experimental-webgl");
	}

	if(!gl) {

		return false;
	}

	document.body.appendChild(canvasElement);

	return true;

}

function errorMessage(msg) {
	var preEl = document.createElement("pre");
	preEl.classList.add("error");
	preEl.textContent = msg;

	document.body.appendChild(preEl);
}

function createCharacter() {

}

function initCanvasPlatformer() {

	var requestAnimationFrame =
		window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame;

	function _doTick() {
		requestAnimationFrame(function() {
			mainTick();
		});
	}

	function init() {
		gl.clearColor(0, 0, 0, 1);
		window.gl = gl;

		var program = gl.createProgram();
		var vs = gl.createShader(gl.VERTEX_SHADER);
		var fs = gl.createShader(gl.FRAGMENT_SHADER);

		gl.shaderSource(vs, require("./shaders/vertex.glsl"));
		gl.shaderSource(fs, require("./shaders/fragment.glsl"));

		var compileError = "";

		gl.compileShader(vs);

		compileError = gl.getShaderInfoLog(vs);
		if(compileError.length > 0) {
			errorMessage(compileError);
		}

		gl.compileShader(fs);

		compileError = gl.getShaderInfoLog(fs);
		if(compileError.length > 0) {
			errorMessage(compileError);
		}

		gl.attachShader(program, vs)
		gl.attachShader(program, fs);

		gl.linkProgram(program);

		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			var info = gl.getProgramInfoLog(program);
			throw "Could not compile WebGL program. \n\n" + info;
		}

		gl.useProgram(program);

		var viewportUniformLocation = gl.getUniformLocation(program, "viewport");

		if(!viewportUniformLocation) {
			errorMessage("Missing uniform 'viewport'");
		}

		window.addEventListener("resize", viewportCalc);

		viewportCalc();

		function viewportCalc() {
			var canvasRect = canvasElement.getBoundingClientRect();

			var viewportWidth = Math.round(canvasRect.width);
			var viewportHeight = Math.round(canvasRect.viewportHeight);

			gl.viewport(
				0, 0,
				viewportWidth,
				viewportHeight
			);

			if(viewportUniformLocation) {
				gl.uniform2f(viewportUniformLocation, viewportWidth, viewportHeight);
			}
		}

	}

	function mainTick() {

		inputTick();
		renderTick();

		_doTick();
	}

	function renderTick() {
		gl.clear(gl.COLOR_BUFFER_BIT);
	}

	function inputTick() {

	}

	// Begins here
	init();
	mainTick();
}



if(initWebGl()) {
	initCanvasPlatformer();
} else {
	errorMessage("Your browser doesn't support WebGL. Make sure you have the latest update or try another browser.");
}

