const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name: { type: String, required: true },
    trailBlazers: [{ type: Schema.Types.ObjectId, ref: "TrailBlazer", required: true }],
});

// Export model
module.exports = mongoose.model("Team", teamSchema);