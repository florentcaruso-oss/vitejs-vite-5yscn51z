import { EX, RANGS, ROMS, ACHIEVEMENTS, WEEKLY } from './data';

// ─── PROGRAMMES FIXES PAR OBJECTIF ───────────────────────

const MASS_EXOS = {
chest_triceps: ['bench','incline','flyes','dip','skullcrush','triceppush','overheadExt'],
back_biceps: ['deadlift','pullup','row','latpull','curl','dbCurl','hammercurl'],
shoulders: ['ohp','dbOhp','lateral','rearDelt','facePull','frontRaise'],
legs: ['squat','legpress','rdl','lunge','legcurl','calf'],
};

const CUT_EXOS = {
chest_triceps: ['pushup','incline','flyes','dip','triceppush','diamondPushup','overheadExt'],
back_biceps: ['pullup','row','latpull','australianRow','dbCurl','hammercurl','curl'],
shoulders: ['dbOhp','lateral','rearDelt','facePull','frontRaise'],
legs: ['squat','lunge','rdl','bwSquat','legcurl','bwCalf'],
};

const FORCE_EXOS = {
legs: ['squat','legpress','rdl','lunge'],
chest_triceps: ['bench','incline','dip','skullcrush'],
back_biceps: ['deadlift','row','pullup','curl'],
shoulders: ['ohp','lateral','rearDelt','facePull'],
};

const FIT_EXOS = {
fullbody_a: ['bwSquat','pushup','australianRow','lunge','plank','crunch'],
fullbody_b: ['gobletSquat','diamondPushup','dbRow','gluteBridge','russianTwist','lateral'],
fullbody_c: ['lunge','pushup','australianRow','bwHipThrust','sidePlank','mountainClimber'],
};

// ─── CYCLES 7 JOURS ──────────────────────────────────────

const CYCLES: Record<string, any[]> = {
mass: [
{name:'Pecs · Triceps', icon:'🏋️', key:'chest_triceps', isRest:false,
info:'Polyarticulaires d\'abord, isolation ensuite. Les triceps sont déjà chauds après les pecs.'},
{name:'Dos · Biceps', icon:'🌊', key:'back_biceps', isRest:false,
info:'Les biceps sont sollicités sur tous les tirages. On les finit en isolation.'},
{name:'Repos', icon:'😴', isRest:true,
note:'Après 2 jours intenses, ton corps a besoin de récupérer pour progresser.'},
{name:'Épaules', icon:'🔥', key:'shoulders', isRest:false,
info:'Séance dédiée aux 3 faisceaux. Antérieur, latéral et postérieur — aucun oublié.'},
{name:'Jambes', icon:'🦵', key:'legs', isRest:false,
info:'La séance la plus difficile. Quadriceps, ischio-jambiers et mollets.'},
{name:'Repos', icon:'😴', isRest:true,
note:'Récupération complète. Le muscle grandit pendant le repos, pas pendant l\'entraînement.'},
{name:'Pecs · Triceps', icon:'🏋️', key:'chest_triceps', isRest:false,
info:'Le cycle repart. Même séance, objectif : surpasser ses perfs de la semaine dernière.'},
],
cut: [
{name:'Pecs · Triceps', icon:'🏋️', key:'chest_triceps', isRest:false,
info:'Mêmes mouvements qu\'en masse. Le déficit calorique fait maigrir, pas changer les exos.'},
{name:'Dos · Biceps', icon:'🌊', key:'back_biceps', isRest:false,
info:'Plus de reps, moins de repos. La densité musculaire se construit avec le volume.'},
{name:'Repos', icon:'😴', isRest:true,
note:'En sèche, la récupération est plus importante car tu manges moins.'},
{name:'Épaules', icon:'🔥', key:'shoulders', isRest:false,
info:'Les épaules sèchent bien et se dessinent rapidement. Focus sur la contraction.'},
{name:'Jambes', icon:'🦵', key:'legs', isRest:false,
info:'Les jambes brûlent le plus de calories. Séance clé pour la sèche.'},
{name:'Repos', icon:'😴', isRest:true,
note:'Récupération complète. En déficit calorique, le corps récupère moins vite.'},
{name:'Dos · Biceps', icon:'🌊', key:'back_biceps', isRest:false,
info:'7ème jour actif pour maximiser la dépense calorique de la semaine.'},
],
force: [
{name:'Squat · Jambes', icon:'🦵', key:'legs', isRest:false,
info:'Le squat en force se travaille lourd et peu de reps. Récupération longue entre séries.'},
{name:'Développé · Pecs', icon:'🏋️', key:'chest_triceps', isRest:false,
info:'Le développé couché est le mouvement de force N°1 pour le haut du corps.'},
{name:'Repos', icon:'😴', isRest:true,
note:'La force neuromusculaire demande plus de récupération que l\'hypertrophie.'},
{name:'Soulevé · Dos', icon:'⚡', key:'back_biceps', isRest:false,
info:'Le soulevé de terre en force pure. Le mouvement le plus complet qui existe.'},
{name:'Militaire · Épaules', icon:'🔥', key:'shoulders', isRest:false,
info:'Le développé militaire est le roi des épaules en force.'},
{name:'Repos', icon:'😴', isRest:true,
note:'2 jours de repos consécutifs pour une récupération neuromusculaire complète.'},
{name:'Repos', icon:'😴', isRest:true,
note:'Le système nerveux a besoin de plus de temps pour récupérer en entraînement de force.'},
],
fit: [
{name:'Full Body A', icon:'💪', key:'fullbody_a', isRest:false,
info:'Full body = tous les muscles en une séance. Idéal pour débuter et brûler des calories.'},
{name:'Repos', icon:'😴', isRest:true,
note:'Un jour de repos entre chaque full body pour récupérer.'},
{name:'Full Body B', icon:'⚡', key:'fullbody_b', isRest:false,
info:'Variation des exercices pour stimuler différemment les mêmes groupes musculaires.'},
{name:'Repos', icon:'😴', isRest:true,
note:'Récupération active recommandée — marche, étirements, mobilité.'},
{name:'Full Body C', icon:'🔥', key:'fullbody_c', isRest:false,
info:'3ème variation pour éviter l\'adaptation. Le corps progresse grâce à la variété.'},
{name:'Repos', icon:'😴', isRest:true,
note:'Week-end de récupération complète.'},
{name:'Repos', icon:'😴', isRest:true,
note:'Le repos fait partie du programme. C\'est là que tu progresses vraiment.'},
],
};

// ─── BUILD CYCLE ─────────────────────────────────────────

function getAvail(equipment: string[], environment: string): string[] {
return Object.entries(EX).filter(([, ex]) => {
if (environment === 'outdoor') return ex.bodyweight || ex.req.includes('pullupbar');
if (ex.req.length === 0) return true;
return ex.req.every(r => equipment.includes(r));
}).map(([id]) => id);
}

function filterAvail(list: string[], avail: string[]): string[] {
return list.filter(id => avail.includes(id) && EX[id]);
}

function getExosForKey(goal: string, key: string, avail: string[]): string[] {
const maps: Record<string, Record<string, string[]>> = {
mass: MASS_EXOS,
cut: CUT_EXOS,
force: FORCE_EXOS,
fit: FIT_EXOS,
};
const map = maps[goal] || maps.mass;
const list = map[key] || [];
return filterAvail(list, avail);
}

export function buildCycle(
goal: string,
frequency: number,
gender: string,
equipment: string[],
environment: string
) {
const avail = getAvail(equipment, environment);
const eff = goal || 'mass';
const baseCycle = CYCLES[eff] || CYCLES.mass;

return baseCycle.map(day => {
if (day.isRest) return { ...day, exos: [] };
const exos = getExosForKey(eff, day.key, avail);
return { ...day, exos };
});
}

// ─── PARAMÈTRES PAR OBJECTIF ─────────────────────────────

export const GOAL_PARAMS: Record<string, {reps:string; rest:number; sets:number; info:string}> = {
mass: { reps:'6-8', rest:120, sets:4, info:'6-8 reps avec charges lourdes = hypertrophie maximale. Si tu fais 9 reps facilement → augmente le poids.' },
cut: { reps:'12-15', rest:45, sets:3, info:'12-15 reps avec moins de repos = plus de dépense calorique tout en conservant le muscle.' },
force: { reps:'3-5', rest:180, sets:5, info:'3-5 reps très lourd = force neuromusculaire pure. Le repos long est obligatoire.' },
fit: { reps:'10-12', rest:60, sets:3, info:'10-12 reps à intensité modérée = progression progressive pour débutant.' },
};

// ─── XP ──────────────────────────────────────────────────

export function calc1RM(w: number, r: number): number {
if (r === 1) return w;
return Math.round((w * (1 + r / 30) + w * (36 / (37 - r))) / 2);
}

export function calculXP(s: {
duree_sec: number; exercices: number; series: number;
serie_jours: number; nouveaux_records: number; premier_jour: boolean;
}): number {
let xp = 60;
xp += Math.min(s.duree_sec / 60, 60) * 0.3;
xp += s.exercices * 5;
xp += s.series * 1;
xp += s.serie_jours * 8;
xp += s.nouveaux_records * 25;
if (s.premier_jour) xp += 20;
return Math.round(xp);
}

export function getStreak(logs: Record<string, any[]>): number {
const dates = [...new Set(
Object.values(logs).flat().map((x: any) => x.date)
)].sort().reverse();
if (!dates.length) return 0;
let sk = 0;
let cur = new Date(); cur.setHours(0, 0, 0, 0);
for (const d of dates) {
const dt = new Date(d as string); dt.setHours(0, 0, 0, 0);
if (Math.round((cur.getTime() - dt.getTime()) / 86400e3) <= 1) {
sk++; cur = dt;
} else break;
}
return sk;
}

export function getChallenge() {
return WEEKLY[Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000)) % WEEKLY.length];
}

// ─── XP PALIERS ──────────────────────────────────────────

const PALIERS = (() => {
const p: any[] = []; let c = 0;
RANGS.forEach(r => r.xpDiv.forEach((xn, di) => {
p.push({
rang: r, division: di + 1,
label: r.nom + ' ' + ROMS[di],
xpMin: c, xpNeeded: xn, index: p.length
});
c += xn === 99999 ? 0 : xn;
}));
return p;
})();

export function getPalier(xp: number) {
for (let i = PALIERS.length - 1; i >= 0; i--)
if (xp >= PALIERS[i].xpMin) return { ...PALIERS[i] };
return { ...PALIERS[0] };
}

export function getPalierSuiv(xp: number) {
const c = getPalier(xp);
return PALIERS[c.index + 1] ? { ...PALIERS[c.index + 1] } : null;
}

export function getPct(xp: number): number {
const c = getPalier(xp);
if (c.xpNeeded === 99999) return 100;
return Math.min(Math.round(((xp - c.xpMin) / c.xpNeeded) * 100), 100);
}

// ─── ACHIEVEMENTS ────────────────────────────────────────

export function getUnlocked(logs: Record<string, any[]>, streak: number): string[] {
const s = new Set(
Object.values(logs).flat().map((x: any) => x.sid || x.date)
).size;
const totalVol = Object.values(logs).flat().reduce((a: number, x: any) =>
a + (x.series || []).reduce((b: number, r: any) =>
b + (r.weight || 0) * (r.reps || 0), 0), 0);
const checks: Record<string, boolean> = {
first_session: s >= 1,
streak_3: streak >= 3,
streak_7: streak >= 7,
sessions_10: s >= 10,
sessions_50: s >= 50,
first_record: Object.values(logs).some(h => h.length > 1),
records_5: Object.values(logs).filter(h => h.length > 1).length >= 5,
bench_100: Math.max(...(logs.bench || []).map((x: any) => x.maxWeight || 0), 0) >= 100,
squat_100: Math.max(...(logs.squat || []).map((x: any) => x.maxWeight || 0), 0) >= 100,
volume_10t: totalVol >= 10000,
};
return ACHIEVEMENTS.filter(a => checks[a.id]).map(a => a.id);
}
