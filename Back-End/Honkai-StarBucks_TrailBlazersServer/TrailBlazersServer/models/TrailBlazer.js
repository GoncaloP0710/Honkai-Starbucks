const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// TODO: Check if i want to remove values like MaxSP cause its the same for the same character
const trailblazerSchema = new Schema({

    // TrailBlazer Info
    username: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    path: { type: String, required: true },
    level: { type: Number, required: true },

    // Equipment
    eidolon: { type: Number, required: true },
    lightCone: {
        name: { type: String, required: true },
        level: { type: Number, required: true },
        superimposition: { type: Number, required: true },
    },
    relics: [{
        set: { type: String, required: true },
        level: { type: Number, required: true },
        mainStat: {
            name: { type: String, required: true },
            value: { type: String, required: true }
        },
        subStats: [{
            name: { type: String, required: true },
            value: { type: String, required: true }}]
    }],

    // Stats
    finalStats: {
        FinalHP: { type: Number, required: true },
        FinalAttack: { type: Number, required: true },
        FinalDefence: { type: Number, required: true },
        FinalSpeed: { type: Number, required: true },
        FinalSPRatio: { type: Number, required: true },
        MaxSP: { type: Number, required: true },
        CriticalChanceBase: { type: Number, required: true },
        CriticalDamageBase: { type: Number, required: true },
        BreakDamageAddedRatioBase: { type: Number, required: true },
        HealRatioBase: { type: Number, required: true },
        StatusProbabilityBase: { type: Number, required: true },
        StatusResistanceBase: { type: Number, required: true },
        ThunderAddedRatio: { type: Number, required: true, default: 0},
        FireAddedRatio: { type: Number, required: true, default: 0},
        IceAddedRatio: { type: Number, required: true, default: 0},
        WindAddedRatio: { type: Number, required: true, default: 0},
        QuantomAddedRatio: { type: Number, required: true, default: 0},
        PhysicalAddedRatio: { type: Number, required: true, default: 0},
        ImaginaryAddedRatio: { type: Number, required: true, default: 0},
    },
    baseStats: {
        BaseHP: { type: Number, required: true },
        BaseAttack: { type: Number, required: true },
        BaseDefence: { type: Number, required: true },
        BaseSpeed: { type: Number, required: true },    
    },
    addedStats: {
        HPDelta: { type: Number, required: true },
        AttackDelta: { type: Number, required: true },
        DefenceDelta: { type: Number, required: true },
        SpeedDelta: { type: Number, required: true },
    },
    multipliersStats: {
        HPAddedRatio: { type: Number, required: true },
        AttackAddedRatio: { type: Number, required: true },
        DefenceAddedRatio: { type: Number, required: true },
        SpeedAddedRatio: { type: Number, required: true },
    },
});

// Export model
module.exports = mongoose.model("TrailBlazer", trailblazerSchema);