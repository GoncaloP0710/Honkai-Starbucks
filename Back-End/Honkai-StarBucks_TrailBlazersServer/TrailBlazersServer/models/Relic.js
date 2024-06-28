const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statSchema = new Schema({
    stat: { type: String, required: true },
    value: { type: Number, required: true }
}, { _id: false });

const relicSchema = new Schema({
    level: { type: Number, required: true },
    name: { type: String, required: true },
    mainStat: statSchema,
    subStats: [statSchema]
});

// Export model
module.exports = mongoose.model("Relic", relicSchema);