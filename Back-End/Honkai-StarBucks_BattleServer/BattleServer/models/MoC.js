const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mocSchema = new Schema({
    MOC: { type: String, required: true },
    name: { type: String, required: true },
    buff: { type: String, required: true },
    firstHalf: { 
        firstWave: [{ type: Schema.Types.ObjectId, ref: "Enemy", required: true }],
        secondWave: [{ type: Schema.Types.ObjectId, ref: "Enemy", required: true }],
    },
    secondtHalf: { 
        firstWave: [{ type: Schema.Types.ObjectId, ref: "Enemy", required: true }],
        secondWave: [{ type: Schema.Types.ObjectId, ref: "Enemy", required: true }],
    },
});

// Export model
module.exports = mongoose.model("MoC", mocSchema);