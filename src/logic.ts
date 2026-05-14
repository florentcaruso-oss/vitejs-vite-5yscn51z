import { EX, RANGS, ROMS, ACHIEVEMENTS, WEEKLY } from './data';

// ─── CYCLES FIXES QUI TOURNENT ───────────────────────────
const CYCLES: Record<string, any[]> = {
mass: [
{ name:'Pecs · Triceps', icon:'🏋️', muscleGroups:['chest','triceps'], isRest:false },
{ name:'Dos · Biceps', icon:'🌊', muscleGroups:['back','biceps'], isRest:false },
{ name:'Repos', icon:'😴', isRest:true, note:'Le muscle grandit pendant le repos.' },
{ name:'Épaules', icon:'🔥', muscleGroups:['shoulders'], isRest:false },
{ name:'Jambes', icon:'🦵', muscleGroups:['legs'], isRest:false },
{ name:'Repos', icon:'😴', isRest:true, note:'Récupération complète.' },
{ name:'Pecs · Triceps', icon:'🏋️', muscleGroups:['chest','triceps'], isRest:false },
],
cut: [
{ name:'Pecs · Triceps', icon:'🏋️', muscleGroups:['chest','triceps'], isRest:false },
{ name:'Dos · Biceps', icon:'🌊', muscleGroups:['back','biceps'], isRest:false },
{ name:'Repos', icon:'😴', isRest:true, note:'Récupération.' },
{ name:'Épaules · Abdos', icon:'🔥', muscleGroups:['shoulders','abs'], isRest:false },
{ name:'Jambes', icon:'🦵', muscleGroups:['legs'], isRest:false },
{ name:'Repos', icon:'😴', isRest:true, note:'Récupération complète.' },
{ name:'Dos · Biceps', icon:'🌊', muscleGroups:['back','biceps'], isRest:false },
],
force: [
{ name:'Squat · Jambes', icon:'🦵', muscleGroups:['legs'], isRest:false },
{ name:'Développé · Pecs', icon:'🏋️', muscleGroups:['chest','triceps'], isRest:false },
{ name:'Repos', icon:'😴', isRest:true, note:'Récupération neuromusculaire.' },
{ name:'Soulevé · Dos', icon:'⚡', muscleGroups:['back','biceps'], isRest:false },
{ name:'Militaire · Épaules', icon:'🔥', muscleGroups:['shoulders'], isRest:false },
{ name:'Repos', icon:'😴', isRest:true, note:'Récupération complète.' },
{ name:'Repos', icon:'😴', isRest:true, note:'Repos actif, mobilité.' },
],
fit: [
{ name:'Full Body A', icon:'💪', muscleGroups:['chest','back','legs'], isRest:false },
{ name:'Repos', icon:'😴', isRest:true, note:'Récupération.' },
{ name:'Full Body B', icon:'⚡', muscleGroups:['shoulders','legs','abs'], isRest:false },
{ name:'Repos', icon:'😴', isRest:true, note:'Récupération.' },
{ name:'Full Body C', icon:'🔥', muscleGroups:['back','chest','arms'], isRest:false },
{ name:'Repos', icon:'😴', isRest:true, note:'Récupération complète.' },
{ name:'Repos', icon:'😴', isRest:true, note:'Repos total.' },
],
};

// ─── EXERCICES FIXES PAR GROUPE ──────────────────────────
const PROGRAMS: Record<string, Record<string, string[]>> = {
mass: {
chest: ['bench','incline','dbBench','flyes'],
triceps: ['skullcrush','triceppush','diamondPushup'],
back: ['deadlift','pullup','row','latpull'],
biceps: ['curl','dbCurl','hammercurl'],
shoulders: ['ohp','lateral','rearDelt','facePull','frontRaise'],
legs: ['squat','rdl','legpress','lunge','calf'],
abs: ['plank','crunch','legRaise','russianTwist'],
},
cut: {
chest: ['pushup','dbBench','incline','flyes'],
triceps: ['triceppush','diamondPushup','skullcrush'],
back: ['pullup','row','latpull','australianRow'],
biceps: ['dbCurl','hammercurl','curl'],
shoulders: ['lateral','facePull','rearDelt','ohp'],
abs: ['plank','crunch','legRaise','russianTwist','sidePlank'],
legs: ['squat','lunge','rdl','bwSquat','calf'],
},
force: {
legs: ['squat','rdl','legpress','calf'],
chest: ['bench','incline','dip'],
triceps: ['skullcrush','triceppush'],
back: ['deadlift','row','pullup'],
biceps: ['curl','hammercurl'],
shoulders: ['ohp','lateral','rearDelt'],
},
fit: {
chest: ['pushup','dbBench'],
back: ['australianRow','latpull'],
legs: ['bwSquat','lunge','gluteBridge'],
shoulders: ['dbOhp','lateral'],
abs: ['plank','crunch','legRaise'],
arms: ['dbCurl','diamondPushup'],
},
};

// ─── EXERCICES FULL BODY ─────────────────────────────────
const FULLBODY: Record<string, string[][]> = {
A: [['bench','pushup'],['pullup','australianRow'],['squat','bwSquat'],['dbOhp'],['dbCurl'],['plank']],
B: [['dbBench'],['row','latpull'],['lunge','rdl'],['lateral'],['hammercurl'],['crunch','legRaise']],
C: [['incline','pushup'],['pullup','dbRow'],['bwSquat','gluteBridge'],['rearDelt'],['curl'],['russianTwist']],
};

function getAvail(equipment: string[], environment: string): string[] {
return Object.entries(EX).filter(([, ex]) => {
if (environment === 'outdoor') return ex.bodyweight || ex.req.includes('pullupbar');
if (ex.req.length === 0) return true;
return ex.req.every(r => equipment.includes(r));
}).map(([id]) => id);
}

function pickBest(list: string[], avail: string[]): string[] {
return list.filter(id => avail.includes(id));
}

function buildSession(muscleGroups: string[], goal: string, avail: string[]): string[] {
const prog = PROGRAMS[goal] || PROGRAMS.mass;
const exos: string[] = [];

// Si c'est un Full Body
if (muscleGroups.includes('arms') || muscleGroups.length >= 3) {
const key = muscleGroups.includes('chest') ? 'A' : muscleGroups.includes('shoulders') ? 'B' : 'C';
FULLBODY[key].forEach(opts => {
const found = opts.find(id => avail.includes(id));
if (found) exos.push(found);
});
return exos;
}

muscleGroups.forEach(group => {
const list = prog[group] || [];
const available = pickBest(list, avail);
exos.push(...available);
});

return exos;
}

export function buildCycle(goal: string, frequency: number, gender: string, equipment: string[], environment: string) {
const avail = getAvail(equipment, environment);
const baseCycle = CYCLES[goal] || CYCLES.mass;

return baseCycle.map(day => {
if (day.isRest) return day;
const exos = buildSession(day.muscleGroups || [], goal, avail);
return { ...day, exos };
});
}

export function calc1RM(w: number, r: number): number {
if (r === 1) return w;
return Math.round((w * (1 + r / 30) + w * (36 / (37 - r))) / 2);
}

export function calculXP(s: { duree_sec:number; exercices:number; series:number; serie_jours:number; nouveaux_records:number; premier_jour:boolean }): number {
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
const dates = [...new Set(Object.values(logs).flat().map((x: any) => x.date))].sort().reverse();
if (!dates.length) return 0;
let sk = 0;
let cur = new Date(); cur.setHours(0, 0, 0, 0);
for (const d of dates) {
const dt = new Date(d as string); dt.setHours(0, 0, 0, 0);
if (Math.round((cur.getTime() - dt.getTime()) / 86400e3) <= 1) { sk++; cur = dt; } else break;
}
return sk;
}

export function getChallenge() {
return WEEKLY[Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000)) % WEEKLY.length];
}

const PALIERS = (() => {
const p: any[] = []; let c = 0;
RANGS.forEach(r => r.xpDiv.forEach((xn, di) => {
p.push({ rang: r, division: di + 1, label: r.nom + ' ' + ROMS[di], xpMin: c, xpNeeded: xn, index: p.length });
c += xn === 99999 ? 0 : xn;
}));
return p;
})();

export function getPalier(xp: number) {
for (let i = PALIERS.length - 1; i >= 0; i--) if (xp >= PALIERS[i].xpMin) return { ...PALIERS[i] };
return { ...PALIERS[0] };
}
export function getPalierSuiv(xp: number) {
const c = getPalier(xp); return PALIERS[c.index + 1] ? { ...PALIERS[c.index + 1] } : null;
}
export function getPct(xp: number): number {
const c = getPalier(xp); if (c.xpNeeded === 99999) return 100;
return Math.min(Math.round(((xp - c.xpMin) / c.xpNeeded) * 100), 100);
}

export function getUnlocked(logs: Record<string, any[]>, streak: number): string[] {
const s = new Set(Object.values(logs).flat().map((x: any) => x.sid || x.date)).size;
const totalVol = Object.values(logs).flat().reduce((a: number, x: any) => a + (x.series || []).reduce((b: number, r: any) => b + (r.weight || 0) * (r.reps || 0), 0), 0);
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
