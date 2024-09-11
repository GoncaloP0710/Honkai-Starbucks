

function calculateDamage(BaseDMG, CRIT, DMGMultiplier, DEFMultiplier, RESMultiplier, DMGTakenMultiplier, ToughnessMultiplier) {
    return BaseDMG * DMGMultiplier * CRIT * DEFMultiplier * RESMultiplier * DMGTakenMultiplier * ToughnessMultiplier;
}

function calculateBaseDMG(scaler, ExtraDMG, SkillMV, ExtraMV) {
    return scaler * ExtraDMG * (SkillMV + ExtraMV);
}

function calculateCritDMG(CRITRate, CRITDamage) {
    return 1 + CRITRate * CRITDamage;
}

// TODO: is DoTDMG correct?
function calculateDMGBonuses(AllDMG, ElemDMGP, DoTDMG) {
    return 1 + AllDMG + ElemDMGP + DoTDMG;
}

function calculateEnemyDEF(LvlChar, LvlEnemy) {
    return (LvlChar + 20) / ((LvlChar + 20) + (LvlEnemy + 20));
}

function calculateEnemyRES(RES, RESPen) {
    return 100 - (RES - RESPen);
}

function calculateDMGTakenMultiplier(AllDMGTaken, ElemDMGTakenP) {
    return 1 + ElemDMGTakenP + AllDMGTaken;
}

function calculateToughnessMultiplier(Broken) {
    if (Broken == true) {
        return 1;
    } else {
        return 0.9;
    }
}

