import {Schema} from "mongoose";

export const itemSchema = new Schema({
    slot: {
        type: String,
        required: true
    },
    defense: {
        type: Number,
        required: true,
        default: 0
    },
    damage: {
        type: Number,
        required: true,
        default: 0
    }
})