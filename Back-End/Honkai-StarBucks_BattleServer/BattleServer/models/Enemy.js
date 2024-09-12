const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const enemySchema = new Schema({
    name: { type: String, required: true },
    enemyId: { type: Number, required: true },
    level: { type: Number, required: true },
    health: { type: Number, required: true },
    phases: { type: Number, required: true },
    defense: { type: Number, required: true },
    speed: { type: Number, required: true },
    paths: [{
        name: { type: String, required: true },
        percentage: { type: Number, required: true }, // Perceber o que o 150 significa
    }],
    statusResistance: { type: Number, required: true },
    statusProbability: { type: Number, required: true },
    imagePath: { type: String, required: true },
    //TODO: rotation do inimigo 
});

// Export model
module.exports = mongoose.model("Enemy", enemySchema);