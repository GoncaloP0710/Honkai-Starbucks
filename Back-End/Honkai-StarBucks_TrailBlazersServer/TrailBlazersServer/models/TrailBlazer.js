const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trailblazerSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    path: { type: String, required: true },
    level: { type: Number, required: true },
    eidolon: { type: Number, required: true },
    lightCone: lightConeSchema,

});

const lightConeSchema = new Schema({
    name: { type: String, required: true },
    level: { type: Number, required: true },
    superimposition: { type: Number, required: true },
});

// Export model
module.exports = mongoose.model("TrailBlazer", trailblazerSchema);