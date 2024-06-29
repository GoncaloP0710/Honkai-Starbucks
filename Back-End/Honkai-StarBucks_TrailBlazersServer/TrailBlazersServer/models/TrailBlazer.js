const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trailblazerSchema = new Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    path: { type: String, required: true },
    level: { type: Number, required: true },
    eidolon: { type: Number, required: true },
    lightCone: lightConeSchema,
    relics: [relicSchema]
});

const lightConeSchema = new Schema({
    name: { type: String, required: true },
    level: { type: Number, required: true },
    superimposition: { type: Number, required: true },
});

const relicSchema = new Schema({
    set: { type: String, required: true },
    level: { type: Number, required: true },
    mainStat: {
        name: { type: String, required: true },
        value: { type: String, required: true }
    },
    subStats: [{
        name: { type: String, required: true },
        value: { type: String, required: true }
    }]
});

// Export model
module.exports = mongoose.model("TrailBlazer", trailblazerSchema);