"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var definition_1 = require("./definition");
var seeds_1 = require("./seeds");
exports.seeds = seeds_1.seeds;
exports.schema = new mongoose_1.Schema(definition_1.definition, { collection: 'at' });
