"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.definition = {
    name: { type: String, required: true },
    at_id: { type: mongoose_1.Types.ObjectId, required: true }
};
