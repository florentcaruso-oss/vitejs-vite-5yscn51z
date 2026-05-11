import { EX, RANGS, ROMS, ACHIEVEMENTS, WEEKLY } from './data';

export function getAvail(equipment: string[], environment: string): string[] {
return Object.entries(EX).filter(([, ex]) => {
if (environment === 'outdoor') return ex.bodyweight || ex.req.includes('pullupbar');
if (ex.req.length === 0) return true;
return ex.req.every(r => equipment.includes(r));
}).map(([id]) => id);
}

export function buildCycle(goal: string, frequency: number, gender: string, equipment: string[], environment: string) {
const avail = getAvail(equipment, environment);
const has = (id: string) => avail.includes(id);
const pick = (...opts: string[]) => opts.find(has) || null;
const pickAll = (...opts: string[]) => opts.filter(has);

const chest = pickAll('bench','dbBench','incline','pushup').slice(0,3);
const back = pickAll('deadlift','pullup','row','dbRow','latpull','australianRow').slice(0,4);
const shoulders = [...pickAll('ohp','dbOhp').slice(0,1), ...pickAll('lateral').slice(0,1), ...pickAll('rearDelt','facePull').slice(0,1)].filter(Boolean);
const biceps = pickAll('curl','dbCurl','hammercurl').slice(0,2);
const triceps = pickAll('skullcrush','triceppush','diamondPushup').slice(0,2);
const legs = pickAll('squat','gobletSquat','bwSquat','rdl','lunge','bwCalf').slice(0,5);
const glutes = pickAll('hipThrust','bwHipThrust','sumoSquat','gluteBridge').slice(0,4);
const abs = [pick('plank'), pick('crunch'), pick('legRaise'), pick('russianTwist')].filter(Boolean) as string[];
const fullBody = [pick('squat','gobletSquat','bwSquat'), pick('bench','dbBench','pushup'), pick('pullup','australianRow'), pick('dbOhp','ohp','lateral'), pick('dbCurl','hammercurl'), pick('plank','crunch')].filter(Boolean) as string[];

const R = { name:'Repos', icon:'😴', exos:[] as string[], isRest:true, note:'Le muscle grandit pendant le repos.' };
const RA = { name:'Repos actif', icon:'🧘', exos:[] as string[], isRest:true, note:'Mobilité, étirements, marche.' };

const eff = gender === 'teen' ? 'teen' : (goal || 'mass');

const T: Record<string, Record<number, any[]>> = {
mass: {
3: [{name:'Pecs · Triceps',icon:'🏋️',exos:[...chest,...triceps],isRest:false}, R, {name:'Dos · Biceps',icon:'🌊',exos:[...back,...biceps],isRest:false}, R, {name:'Jambes · Épaules · Abdos',icon:'🦵',exos:[...legs.slice(0,3),...shoulders,...abs.slice(0,2)],isRest:false}, R, R],
4: [{name:'Pecs · Triceps',icon:'🏋️',exos:[...chest,...triceps],isRest:false}, {name:'Dos · Biceps',icon:'🌊',exos:[...back,...biceps],isRest:false}, {name:'Jambes',icon:'🦵',exos:legs,isRest:false}, R, {name:'Épaules · Abdos',icon:'🔥',exos:[...shoulders,...abs],isRest:false}, R, R],
5: [{name:'Pecs · Triceps',icon:'🏋️',exos:[...chest,...triceps],isRest:false}, {name:'Dos · Biceps',icon:'🌊',exos:[...back,...biceps],isRest:false}, {name:'Jambes',icon:'🦵',exos:legs,isRest:false}, R, {name:'Épaules · Abdos',icon:'🔥',exos:[...shoulders,...abs],isRest:false}, R],
6: [{name:'Pecs · Triceps',icon:'🏋️',exos:[...chest,...triceps],isRest:false}, {name:'Dos · Biceps',icon:'🌊',exos:[...back,...biceps],isRest:false}, {name:'Jambes',icon:'🦵',exos:legs,isRest:false}, {name:'Épaules · Abdos',icon:'🔥',exos:[...shoulders,...abs],isRest:false}, R, R],
},
glute: {
3: [{name:'Fessiers A',icon:'🍑',exos:glutes,isRest:false}, R, {name:'Haut du corps',icon:'💪',exos:[pick('dbBench','pushup'),...back.slice(0,2)].filter(Boolean) as string[],isRest:false}, R, {name:'Fessiers B · Abdos',icon:'🍑',exos:[...legs.slice(2,4),...glutes.slice(2),...abs],isRest:false}, R, R],
4: [{name:'Fessiers A',icon:'🍑',exos:glutes,isRest:false}, {name:'Haut A',icon:'💪',exos:[pick('dbBench','pushup'),...back.slice(0,2)].filter(Boolean) as string[],isRest:false}, R, {name:'Fessiers B · Abdos',icon:'🍑',exos:[...legs.slice(1,3),...glutes.slice(2),...abs],isRest:false}, {name:'Haut B',icon:'🌊',exos:[...back.slice(2),...biceps],isRest:false}, R],
},
fit: {
3: [{name:'Full Body A',icon:'💪',exos:fullBody,isRest:false}, R, {name:'Full Body B',icon:'⚡',exos:[...back.slice(0,2),...legs.slice(0,2),...shoulders.slice(0,1)].filter(Boolean) as string[],isRest:false}, R, {name:'Full Body C',icon:'🔥',exos:[...chest.slice(0,2),...legs.slice(2,4),...abs].filter(Boolean) as string[],isRest:false}, R, R],
4: [{name:'Haut du corps',icon:'🏋️',exos:[...chest.slice(0,2),...back.slice(0,2),...shoulders].filter(Boolean) as string[],isRest:false}, {name:'Bas du corps',icon:'🦵',exos:legs,isRest:false}, RA, {name:'Haut B · Abdos',icon:'🌊',exos:[...back.slice(2),...biceps,...triceps.slice(0,1),...abs].filter(Boolean) as string[],isRest:false}, R],
},
teen: {
3: [{name:'Full Body A',icon:'💪',exos:[pick('bwSquat','gobletSquat'),pick('pushup'),pick('australianRow','pullup'),pick('lateral','dbOhp'),pick('hammercurl','dbCurl'),pick('plank')].filter(Boolean) as string[],isRest:false}, R, {name:'Full Body B',icon:'⚡',exos:[pick('lunge','bwSquat'),pick('pushup'),pick('australianRow'),pick('dbOhp'),pick('dbCurl'),pick('crunch')].filter(Boolean) as string[],isRest:false}, R, {name:'Full Body C',icon:'🔥',exos:[pick('bwHipThrust','gluteBridge'),pick('pushup'),pick('australianRow'),pick('lateral'),pick('hammercurl'),pick('plank')].filter(Boolean) as string[],isRest:false}, R, R],
},
};

const goalT = T[eff] || T.fit;
const freqT = goalT[frequency] || goalT[4] || goalT[3];
return freqT.filter((s: any) => s.isRest || (s.exos && s.exos.length > 0));
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

