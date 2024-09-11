const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Mixed } = Schema.Types;

const replaySchema = new Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    data: { type: Mixed, required: true },
});

// Export model
module.exports = mongoose.model("Replay", replaySchema);