"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var definition_1 = require("./definition");
var seeds_1 = require("./seeds");
exports.seeds = seeds_1.seeds;
var create = function () {
    var schema = new mongoose_1.Schema(definition_1.definition, {
        collection: 'company',
        toObject: { virtuals: true }
    });
    schema.virtual('at', {
        ref: 'at',
        localField: 'at_id',
        foreignField: '_id',
        justOne: true
    });
    return schema;
};
exports.schema = create();
