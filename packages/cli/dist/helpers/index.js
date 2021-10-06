"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printError = exports.printInfo = void 0;
var colors_1 = __importDefault(require("colors"));
var printInfo = function (message) {
    console.log(colors_1.default.green(message));
};
exports.printInfo = printInfo;
var printError = function (message) {
    console.log(colors_1.default.red(message));
};
exports.printError = printError;
