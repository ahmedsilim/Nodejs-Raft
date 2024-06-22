"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __importDefault(require("./consensus/node"));
const Node = [
    new node_1.default('node1'),
    new node_1.default('node2'),
    new node_1.default('node3')
];
