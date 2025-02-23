export interface TracesLevel {
  basic: number;
  skill: number;
  ultimate: number;
  talent: number;
  bonusAbility1: number;
  bonusAbility2: number;
  bonusAbility3: number;
}

export interface LightCone {
  name: string;
  level: number;
  superimposition: number;
}

export interface MainStat {
  name: string;
  value: string;
}

export interface SubStat {
  name: string;
  value: string;
}

export interface Relic {
  set: string;
  level: number;
  mainStat: MainStat;
  subStats: SubStat[];
}

export interface FinalStats {
  FinalHP: number;
  FinalAttack: number;
  FinalDefence: number;
  FinalSpeed: number;
  FinalSPRatio: number;
  MaxSP: number;
  CriticalChanceBase: number;
  CriticalDamageBase: number;
  BreakDamageAddedRatioBase: number;
  HealRatioBase: number;
  StatusProbabilityBase: number;
  StatusResistanceBase: number;
  ThunderAddedRatio: number;
  FireAddedRatio: number;
  IceAddedRatio: number;
  WindAddedRatio: number;
  QuantomAddedRatio: number;
  PhysicalAddedRatio: number;
  ImaginaryAddedRatio: number;
}

export interface BaseStats {
  BaseHP: number;
  BaseAttack: number;
  BaseDefence: number;
  BaseSpeed: number;
}

export interface AddedStats {
  HPDelta: number;
  AttackDelta: number;
  DefenceDelta: number;
  SpeedDelta: number;
}

export interface MultipliersStats {
  HPAddedRatio: number;
  AttackAddedRatio: number;
  DefenceAddedRatio: number;
  SpeedAddedRatio: number;
}

export interface TrailBlazer {
  _id: string;
  usernames: string[];
  username: string;
  name: string;
  type: string;
  path: string;
  level: number;
  eidolon: number;
  tracesLevel: TracesLevel;
  lightCone: LightCone;
  relics: Relic[];
  finalStats: FinalStats;
  baseStats: BaseStats;
  addedStats: AddedStats;
  multipliersStats: MultipliersStats;
  showDetails?: boolean; // Add this property
}

export interface Teams {
  _id: string;
  teamName: string;
  team: TrailBlazer[];
}