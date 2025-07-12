// all formulas are based on the information provided by: https://honkai-star-rail.fandom.com/wiki/Damage

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