// all formulas are based on the information provided by: https://honkai-star-rail.fandom.com/wiki/Damage
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const asyncHandler = require("express-async-handler");
const Enemy = require('../models/Enemy');

const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

exports.testTeamDamage = asyncHandler(async (req, res, next) => {
    console.log("Testing trailblazer damage...");
    const {uidTeam} = req.body;
    const {uidEnemy} = req.body;

    let enemy = await Enemy.findById({ _id : uidEnemy });
    let team = null;

    try { // Send the get team request to the TrailBlazer server
        team = await axios.get(`http://localhost:9000/team/id?id=${uidTeam}`);
    } catch (error) {
        console.error('Error finding team:', error);
        return res.status(500).json({ error: 'Failed to delete team' });
    }
    
    if (!team || !team.data) {
        console.error('Team not found or invalid response:', team);
        return res.status(404).json({ error: 'Team not found' });
    }

    team = team.data;
    console.log("Team found:", team);
    const trailblazers = team.trailBlazers;
    if (!trailblazers || trailblazers.length === 0) {
        console.error('No trailblazers found in the team:', trailblazers);
        return res.status(404).json({ error: 'No trailblazers found in the team' });
    }
    console.log("Trailblazers found:", trailblazers);

    res.json(enemy);
});

function calculateFinalDamage(BaseDMG, CritMultiplier, DmgBoostMultiplier, WeakenMultiplier, DefMultiplier, ResMultiplier, DmgMitigationMultiplier, BrokenMultiplier) {
    return BaseDMG * CritMultiplier * DmgBoostMultiplier * WeakenMultiplier * DefMultiplier * ResMultiplier * VulnerabilityMultiplier * DmgMitigationMultiplier * BrokenMultiplier;
}

function calculateBaseDMG(abilityMultiplier, stat, extraDmg) {
    return abilityMultiplier * stat + extraDmg;
}

// Already includes the Crit chance calculation
function calculateCritMultiplier(CRITRate, CRITDamage) {
    rnd = Math.random();
    if (rnd < CRITRate) {
        return 1 + CRITDamage;
    }
    return 1;
}

function calculateDMGBoostMultiplier(AllDmgBoost, ElemDmgMultiplier, DoTDMG) {
    return 1 + AllDMG + ElemDMGP + DoTDMG;
}

function calculateWeakenMultiplier(Weaken) {
    return 1 - Weaken;
}

function calculateDefMultiplier(LevelAttacker, LevelEnemy, DefBonus, DefReduction, Defignore) {
    let defMultiplier = 1 + DefBonus - DefReduction - Defignore;
    defMultiplier = Math.max(0, defMultiplier);
    return (LevelAttacker + 20) / ((LevelEnemy + 20) * defMultiplier + LevelAttacker + 20);
}

function calculateResistMultiplier(restarget, resPenetration) {
    return 1 - (restarget - resPenetration);
}

function calculateVulnerabilityMultiplier(elementalVulnerability, allTypeVulnerability, dotVulnerability) {
    return 1 + elementalVulnerability + allTypeVulnerability + dotVulnerability;
}

// Needs to be tested 
function calculateDmgMitigationMultiplier(DmgMitigation) {
    return DmgMitigation.reduce((dmg, mitigation) => dmg * (1 - mitigation), 1);
}

function calculateBrokenMultiplier(Broken) {
    return Broken ? 1 : 0.9;
}

function calculateBreakDmg() {
    // TODO: Implement the logic for calculating break damage
}

function calculateBreakDot() {
    // TODO: Implement the logic for calculating break DoT
}