"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.seeds = [
    {
        _id: mongoose_1.Types.ObjectId('000000000000000000000001'),
        name: 'First Company',
        at_id: mongoose_1.Types.ObjectId('000000000000000000000001'),
    },
    {
        _id: mongoose_1.Types.ObjectId('000000000000000000000002'),
        name: 'Second Company',
        at_id: mongoose_1.Types.ObjectId('000000000000000000000001'),
    }
];
