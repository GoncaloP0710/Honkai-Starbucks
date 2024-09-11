const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const enemySchema = new Schema({
    MOC: { type: String, required: true },
    name: { type: String, required: true },
    level: { type: Number, required: true },
    health: { type: Number, required: true },
    defense: { type: Number, required: true },
    speed: { type: Number, required: true },
    paths: [{
        name: { type: String, required: true },
        percentage: { type: Number, required: true },
    }],
    statusResistance: { type: Number, required: true },
    statusProbability: { type: Number, required: true },
    imagePath: { type: String, required: true },
    //TODO: ataque do inimigo e a sua rotation
});

// Export model
module.exports = mongoose.model("Enemy", enemySchema);