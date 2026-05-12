import { useState, useEffect, useRef } from 'react';
import { D, F, EX, GA, GG, GENDERS, GOALS, FEMALE_GOALS, TEEN_GOALS, LEVELS, FREQS, ENVS, EQUIPMENTS, ACHIEVEMENTS, RANGS } from './data';
import { buildCycle, getPalier, getPalierSuiv, getPct, getUnlocked, getChallenge, getStreak, calc1RM } from './logic';
import { Card, Btn, Chip, Ring, Sparkline, Chart, WeekBars, BadgeDiv, BarXP } from './components';


const ROMS = ["I","II","III","IV","V"];

// ─── ONBOARDING ───────────────────────────────────────────
export function Onboarding({ onDone }: { onDone: (p:any)=>void }) {
const [step, setStep] = useState(0);
const [od, setOd] = useState({ firstName:'', gender:'', goal:'', level:'', frequency:4, height:'', weight:'', environment:'', equipment:[] as string[] });
const set = (k:string, v:any) => setOd(p => ({ ...p, [k]:v }));
const toggleEq = (id:string) => set('equipment', od.equipment.includes(id) ? od.equipment.filter(e=>e!==id) : [...od.equipment, id]);
const availGoals = od.gender==='female' ? FEMALE_GOALS : od.gender==='teen' ? TEEN_GOALS : GOALS;
const eff = od.gender==='teen' ? 'teen' : (od.goal||'mass');
const AC = GA[eff] || D.lime;
const SC = ({ on, c, onClick, children }:any) => (
<div onClick={onClick} style={{ border:`1.5px solid ${on?(c||AC)+'55':'rgba(255,255,255,.05)'}`, borderRadius:14, padding:'12px 14px', cursor:'pointer', background:on?`${c||AC}07`:'rgba(255,255,255,.02)', marginBottom:8, transition:'all .2s' }}>
{children}
</div>
);
const steps = [
<div key={0} className="si" style={{ textAlign:'center', paddingTop:16 }}>
<div style={{ marginBottom:20 }}>
<div style={{ fontFamily:F.d, fontSize:60, letterSpacing:-3, color:AC, lineHeight:.9, marginBottom:6 }}>SURGE</div>
<div style={{ color:D.sub, fontSize:13, fontFamily:F.b }}>Ton coach de musculation IA</div>
</div>
<div style={{ fontSize:60, marginBottom:20 }}>⚡</div>
<h2 style={{ fontFamily:F.b, fontSize:24, fontWeight:700, marginBottom:4 }}>Bienvenue !</h2>
<p style={{ color:D.sub, fontSize:12, marginBottom:20, lineHeight:1.7, fontFamily:F.b }}>Programme sur-mesure en 2 minutes.</p>
<div style={{ fontFamily:F.m, fontSize:9, color:D.sub, letterSpacing:1.5, marginBottom:7 }}>TON PRÉNOM</div>
<input autoFocus style={{ width:'100%', background:'rgba(255,255,255,.04)', border:`1.5px solid ${od.firstName?AC+'55':'rgba(255,255,255,.07)'}`, borderRadius:13, padding:'12px', fontSize:19, textAlign:'center', fontWeight:600, color:'#fff', outline:'none', marginBottom:18, fontFamily:F.b, transition:'border-color .2s' }} placeholder="Thomas…" value={od.firstName} onChange={e=>set('firstName',e.target.value)} onKeyDown={e=>e.key==='Enter'&&od.firstName.trim()&&setStep(1)}/>
<Btn full disabled={!od.firstName.trim()} onClick={()=>setStep(1)} AC={AC}>Commencer →</Btn>
</div>,

<div key={1} className="si">
<h2 style={{ fontFamily:F.b, fontWeight:700, fontSize:22, marginBottom:4 }}>Tu es ?</h2>
<p style={{ color:D.sub, fontSize:12, marginBottom:16, fontFamily:F.b }}>Le programme s'adapte à ton profil.</p>
{GENDERS.map(g => (
<SC key={g.id} on={od.gender===g.id} onClick={()=>set('gender',g.id)}>
<div style={{ display:'flex', alignItems:'center', gap:12 }}>
<span style={{ fontSize:26 }}>{g.emoji}</span>
<div style={{ flex:1 }}>
<div style={{ fontWeight:600, fontSize:13, color:od.gender===g.id?AC:'rgba(255,255,255,.82)', fontFamily:F.b }}>{g.label}</div>
<div style={{ fontSize:11, color:D.sub, fontFamily:F.b, marginTop:1 }}>{g.desc}</div>
</div>
{od.gender===g.id && <div style={{ width:17, height:17, borderRadius:'50%', background:AC, display:'flex', alignItems:'center', justifyContent:'center', color:'#000', fontSize:10, fontWeight:800 }}>✓</div>}
</div>
</SC>
))}
<Btn full disabled={!od.gender} onClick={()=>setStep(2)} AC={AC} style={{ marginTop:5 }}>Continuer →</Btn>
</div>,

<div key={2} className="si">
<h2 style={{ fontFamily:F.b, fontWeight:700, fontSize:22, marginBottom:4 }}>Ton objectif ?</h2>
<p style={{ color:D.sub, fontSize:12, marginBottom:16, fontFamily:F.b }}>Tout le programme sera construit autour.</p>
{availGoals.map((g:any) => (
<SC key={g.id} on={od.goal===g.id} c={g.color} onClick={()=>set('goal',g.id)}>
<div style={{ display:'flex', alignItems:'center', gap:12 }}>
<div style={{ width:42, height:42, borderRadius:11, background:`${g.color}15`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:19, flexShrink:0 }}>{g.emoji}</div>
<div style={{ flex:1 }}>
<div style={{ fontWeight:600, fontSize:12, color:od.goal===g.id?g.color:'rgba(255,255,255,.82)', fontFamily:F.b }}>{g.label}</div>
<div style={{ fontSize:11, color:D.sub, fontFamily:F.b, marginTop:1 }}>{g.desc}</div>
</div>
{od.goal===g.id && <div style={{ width:17, height:17, borderRadius:'50%', background:g.color, display:'flex', alignItems:'center', justifyContent:'center', color:'#000', fontSize:10, fontWeight:800 }}>✓</div>}
</div>
</SC>
))}
<Btn full disabled={!od.goal} onClick={()=>setStep(3)} AC={AC} style={{ marginTop:5 }}>Continuer →</Btn>
</div>,

<div key={3} className="si">
<h2 style={{ fontFamily:F.b, fontWeight:700, fontSize:22, marginBottom:4 }}>Ton niveau ?</h2>
{LEVELS.map(l => (
<SC key={l.id} on={od.level===l.id} onClick={()=>set('level',l.id)}>
<div style={{ display:'flex', alignItems:'center', gap:11 }}>
<span style={{ fontSize:24 }}>{l.emoji}</span>
<div style={{ flex:1 }}>
<div style={{ fontWeight:600, fontSize:13, color:od.level===l.id?AC:'rgba(255,255,255,.82)', fontFamily:F.b }}>{l.label}</div>
<div style={{ fontSize:11, color:D.sub, fontFamily:F.b, marginTop:1 }}>{l.desc}</div>
</div>
{od.level===l.id && <div style={{ marginLeft:'auto', width:17, height:17, borderRadius:'50%', background:AC, display:'flex', alignItems:'center', justifyContent:'center', color:'#000', fontSize:10, fontWeight:800 }}>✓</div>}
</div>
</SC>
))}
<Btn full disabled={!od.level} onClick={()=>setStep(4)} AC={AC} style={{ marginTop:5 }}>Continuer →</Btn>
</div>,

<div key={4} className="si">
<h2 style={{ fontFamily:F.b, fontWeight:700, fontSize:22, marginBottom:4 }}>Combien de jours ?</h2>
<p style={{ color:D.sub, fontSize:12, marginBottom:16, fontFamily:F.b }}>La régularité bat l'intensité.</p>
{FREQS.map(fr => (
<SC key={fr.id} on={od.frequency===fr.id} c={fr.color} onClick={()=>set('frequency',fr.id)}>
<div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
<div style={{ fontWeight:600, fontSize:13, color:od.frequency===fr.id?fr.color:'rgba(255,255,255,.82)', fontFamily:F.b }}>{fr.label} / semaine</div>
<span style={{ fontSize:10, background:`${fr.color}15`, color:fr.color, borderRadius:7, padding:'2px 9px', fontWeight:700, fontFamily:F.m }}>{fr.badge}</span>
</div>
</SC>
))}
<Btn full onClick={()=>setStep(5)} AC={AC} style={{ marginTop:5 }}>Continuer →</Btn>
</div>,

<div key={5} className="si">
<h2 style={{ fontFamily:F.b, fontWeight:700, fontSize:22, marginBottom:4 }}>Où tu t'entraînes ?</h2>
{ENVS.map(env => (
<SC key={env.id} on={od.environment===env.id} onClick={()=>set('environment',env.id)}>
<div style={{ display:'flex', alignItems:'center', gap:12 }}>
<div style={{ width:42, height:42, borderRadius:11, background:'rgba(255,255,255,.04)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:19 }}>{env.emoji}</div>
<div style={{ fontWeight:600, fontSize:13, color:od.environment===env.id?AC:'rgba(255,255,255,.82)', fontFamily:F.b, flex:1 }}>{env.label}</div>
{od.environment===env.id && <div style={{ width:17, height:17, borderRadius:'50%', background:AC, display:'flex', alignItems:'center', justifyContent:'center', color:'#000', fontSize:10, fontWeight:800 }}>✓</div>}
</div>
</SC>
))}
<Btn full disabled={!od.environment} onClick={()=>{
if (od.environment==='gym') { set('equipment', EQUIPMENTS.filter(e=>e.id!=='nothing').map(e=>e.id)); setStep(7); }
else if (od.environment==='outdoor') { set('equipment', ['pullupbar','dip_bar']); setStep(7); }
else setStep(6);
}} AC={AC} style={{ marginTop:5 }}>Continuer →</Btn>
</div>,

<div key={6} className="si">
<h2 style={{ fontFamily:F.b, fontWeight:700, fontSize:22, marginBottom:4 }}>Ton matériel ?</h2>
<p style={{ color:D.sub, fontSize:12, marginBottom:12, fontFamily:F.b }}>Sélectionne tout ce que tu as.</p>
<div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:16 }}>
{EQUIPMENTS.map(eq => {
const on = od.equipment.includes(eq.id);
return (
<div key={eq.id} onClick={()=>toggleEq(eq.id)} style={{ border:`1.5px solid ${on?AC+'50':'rgba(255,255,255,.05)'}`, borderRadius:12, padding:'10px 8px', cursor:'pointer', background:on?`${AC}07`:'rgba(255,255,255,.02)', display:'flex', alignItems:'center', gap:8, transition:'all .2s' }}>
<span style={{ fontSize:17 }}>{eq.emoji}</span>
<div style={{ fontWeight:500, fontSize:11, color:on?AC:'rgba(255,255,255,.6)', flex:1, fontFamily:F.b }}>{eq.label}</div>
{on && <div style={{ width:12, height:12, borderRadius:'50%', background:AC, display:'flex', alignItems:'center', justifyContent:'center', color:'#000', fontSize:7, fontWeight:800, flexShrink:0 }}>✓</div>}
</div>
);
})}
</div>
<Btn full onClick={()=>setStep(7)} AC={AC}>Continuer →</Btn>
</div>,

<div key={7} className="si">
<h2 style={{ fontFamily:F.b, fontWeight:700, fontSize:22, marginBottom:4 }}>Tes mensurations</h2>
<p style={{ color:D.sub, fontSize:12, marginBottom:20, fontFamily:F.b }}>Pour l'IMC et les recommandations.</p>
<div style={{ fontFamily:F.m, fontSize:9, color:D.sub, letterSpacing:1.5, marginBottom:6 }}>TAILLE (cm)</div>
<input style={{ width:'100%', background:'rgba(255,255,255,.04)', border:'1.5px solid rgba(255,255,255,.07)', borderRadius:13, padding:'12px', marginBottom:12, fontSize:20, textAlign:'center', fontWeight:700, color:'#fff', outline:'none', fontFamily:F.b }} type="number" inputMode="numeric" placeholder="175" value={od.height} onChange={e=>set('height',e.target.value)}/>
<div style={{ fontFamily:F.m, fontSize:9, color:D.sub, letterSpacing:1.5, marginBottom:6 }}>POIDS (kg)</div>
<input style={{ width:'100%', background:'rgba(255,255,255,.04)', border:'1.5px solid rgba(255,255,255,.07)', borderRadius:13, padding:'12px', marginBottom:24, fontSize:20, textAlign:'center', fontWeight:700, color:'#fff', outline:'none', fontFamily:F.b }} type="number" inputMode="decimal" placeholder="75" value={od.weight} onChange={e=>set('weight',e.target.value)}/>
<Btn full variant="grad" grad={GG[eff]} onClick={()=>onDone({ ...od, createdAt: new Date().toISOString().slice(0,10) })}>🚀 Créer mon programme</Btn>
</div>,
];

return (
<div style={{ background:D.bg, minHeight:'100vh', color:D.text, maxWidth:430, margin:'0 auto' }}>
<div style={{ height:2, background:'rgba(255,255,255,.03)' }}>
<div style={{ height:'100%', background:AC, width:`${((step+1)/8)*100}%`, transition:'width .4s ease', borderRadius:2 }}/>
</div>
<div style={{ padding:'12px 18px 0', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
{step > 0 ? <button onClick={()=>setStep(s=>Math.max(0,s-1))} style={{ background:'none', border:'none', color:D.sub, fontSize:12, cursor:'pointer', fontFamily:F.b }}>← Retour</button> : <div/>}
<div style={{ fontFamily:F.m, fontSize:9, color:D.sub, letterSpacing:1 }}>{step+1}/8</div>
</div>
<div style={{ padding:'16px 18px 60px' }}>{steps[step]}</div>
</div>
);
}

// ─── HOME ─────────────────────────────────────────────────
export function HomeView({ profile, logs, cycle, cycleIdx, customSessionExos, setCustomSessionExos, startSession, AC, grad, xpUser }: any) {
const totalSeances = new Set(Object.values(logs).flat().map((x:any) => x.sid||x.date)).size;
const serieJours = getStreak(logs);
const curDay = cycle.length ? cycle[cycleIdx % cycle.length] : null;
const challenge = getChallenge();
const totalVol = Math.round(Object.values(logs).flat().reduce((acc:number,x:any) => acc+(x.series||[]).reduce((a:number,r:any)=>a+(r.weight||0)*(r.reps||0),0),0)/1000);
const challengeProgress = challenge.type==='sessions' ? Math.min(totalSeances,challenge.target) : challenge.type==='streak' ? Math.min(serieJours,challenge.target) : Math.min(totalVol*1000,challenge.target);

return (
<div style={{ background:D.bg, minHeight:'100vh', color:D.text, maxWidth:430, margin:'0 auto', paddingBottom:90 }}>
<div style={{ padding:'48px 16px 0', position:'relative' }}>
<div style={{ position:'absolute', top:0, right:-20, width:180, height:180, background:`radial-gradient(circle,${AC}0D,transparent 65%)`, pointerEvents:'none' }}/>
<div className="fu" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
<div>
<div style={{ fontFamily:F.m, fontSize:9, color:D.sub, letterSpacing:2, marginBottom:3 }}>BONJOUR</div>
<div style={{ fontFamily:F.b, fontSize:30, fontWeight:800, letterSpacing:-.5, lineHeight:1 }}>{profile.firstName}</div>
</div>
<div style={{ display:'flex', alignItems:'center', gap:8 }}>
<BadgeDiv xp={xpUser} size="sm"/>
{serieJours > 0 && <div style={{ background:`${AC}12`, border:`1px solid ${AC}20`, borderRadius:9, padding:'4px 9px', fontFamily:F.m, fontSize:10, color:AC, fontWeight:700 }}>{serieJours}🔥</div>}
</div>
</div>
<div className="fu fu1" style={{ marginBottom:14 }}><BarXP xp={xpUser} AC={AC} compact/></div>
</div>

<div style={{ padding:'0 12px 12px' }}>
<div className="fu fu2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6, marginBottom:10 }}>
{[{v:totalSeances,l:'Séances',i:'⚡'},{v:`${serieJours}j`,l:'Série',i:'🔥'},{v:`${totalVol}T`,l:'Volume',i:'🏋️'}].map((s,i) => (
<Card key={i} style={{ padding:'9px 7px', textAlign:'center' }}>
<div style={{ fontSize:14, marginBottom:2 }}>{s.i}</div>
<div style={{ fontFamily:F.b, fontSize:17, fontWeight:700, color:'#fff', lineHeight:1 }}>{s.v}</div>
<div style={{ fontFamily:F.m, fontSize:8, color:D.sub, marginTop:2 }}>{s.l.toUpperCase()}</div>
</Card>
))}
</div>

<div className="fu fu3" style={{ background:`${AC}07`, border:`1px solid ${AC}12`, borderRadius:14, padding:'10px 13px', marginBottom:10 }}>
<div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
<span style={{ fontSize:19 }}>{challenge.icon}</span>
<div style={{ flex:1 }}>
<div style={{ fontFamily:F.m, fontSize:8, color:AC, letterSpacing:.8, marginBottom:1 }}>DÉFI HEBDOMADAIRE</div>
<div style={{ fontFamily:F.b, fontSize:12, fontWeight:600, color:'rgba(255,255,255,.85)' }}>{challenge.name}</div>
</div>
<div style={{ background:`${AC}18`, borderRadius:7, padding:'2px 8px', fontFamily:F.m, fontSize:9, color:AC, fontWeight:700 }}>+{challenge.xp} XP</div>
</div>
<div style={{ height:3, background:'rgba(255,255,255,.05)', borderRadius:10, overflow:'hidden' }}>
<div style={{ height:'100%', width:`${Math.min((challengeProgress/challenge.target)*100,100)}%`, background:AC, borderRadius:10, transition:'width 1s ease' }}/>
</div>
<div style={{ fontFamily:F.m, fontSize:8, color:D.sub, marginTop:3 }}>{challengeProgress} / {challenge.target}</div>
</div>

<div style={{ fontFamily:F.m, fontSize:8, color:D.sub, letterSpacing:2, marginBottom:7 }}>SÉANCE DU JOUR</div>
{curDay?.isRest ? (
<Card style={{ marginBottom:10 }}>
<div style={{ padding:'20px', textAlign:'center' }}>
<div style={{ fontSize:40, marginBottom:7 }}>{curDay.icon||'😴'}</div>
<div style={{ fontFamily:F.b, fontWeight:700, fontSize:18, color:'rgba(255,255,255,.75)', marginBottom:3 }}>{curDay.name}</div>
<div style={{ color:D.sub, fontSize:12, lineHeight:1.6, fontFamily:F.b }}>{curDay.note}</div>
</div>
</Card>
) : curDay ? (
<Card style={{ marginBottom:10 }} glow AC={AC}>
<div style={{ background:`linear-gradient(${grad})`, padding:'13px' }}>
<div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:8 }}>
<span style={{ fontSize:20 }}>{curDay.icon}</span>
<div>
<div style={{ fontFamily:F.b, fontWeight:700, fontSize:17, color:'rgba(0,0,0,.88)' }}>{curDay.name}</div>
<div style={{ fontSize:11, color:'rgba(0,0,0,.5)', fontFamily:F.b }}>{curDay.exos.length} exercices</div>
</div>
</div>
<div style={{ display:'flex', flexWrap:'wrap', gap:4 }}>
{curDay.exos.slice(0,4).map((id:string) => { const ex=EX[id]; return ex ? <div key={id} style={{ background:'rgba(0,0,0,.14)', borderRadius:6, padding:'3px 8px', fontSize:10, color:'rgba(0,0,0,.65)', fontFamily:F.b }}>{ex.emoji} {ex.name.split(' ').slice(0,2).join(' ')}</div> : null; })}
{curDay.exos.length > 4 && <div style={{ background:'rgba(0,0,0,.14)', borderRadius:6, padding:'3px 8px', fontSize:10, color:'rgba(0,0,0,.55)', fontFamily:F.b }}>+{curDay.exos.length-4}</div>}
</div>
</div>
<div style={{ padding:'10px 12px' }}>
<Btn full variant="grad" grad={grad} onClick={()=>startSession(curDay, customSessionExos)}>▶ Démarrer{customSessionExos?` · ${customSessionExos.length} perso`:''}</Btn>
{customSessionExos && <button onClick={()=>setCustomSessionExos(null)} style={{ background:'none', border:'none', color:D.sub, fontSize:10, cursor:'pointer', width:'100%', fontFamily:F.b, marginTop:3 }}>Réinitialiser</button>}
</div>
</Card>
) : null}

<div style={{ fontFamily:F.m, fontSize:8, color:D.sub, letterSpacing:2, marginBottom:7 }}>À VENIR</div>
{Array.from({ length:4 }).map((_,i) => {
const idx = (cycleIdx+1+i) % cycle.length;
const day = cycle[idx];
if (!day) return null;
return (
<div key={i} onClick={!day.isRest?()=>startSession(day):undefined} className={!day.isRest?'ch':''} style={{ background:D.card, border:`1px solid ${day.isRest?D.border:`${AC}18`}`, borderRadius:13, padding:'9px 11px', marginBottom:6, display:'flex', alignItems:'center', gap:9, cursor:day.isRest?'default':'pointer', opacity:day.isRest?.45:1 }}>
<div style={{ width:34, height:34, borderRadius:9, background:day.isRest?'rgba(255,255,255,.03)':`${AC}12`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:15, flexShrink:0 }}>{day.icon}</div>
<div style={{ flex:1, minWidth:0 }}>
<div style={{ fontWeight:600, fontSize:12, color:'rgba(255,255,255,.82)', fontFamily:F.b }}>{day.name}</div>
{!day.isRest ? (
<div style={{ display:'flex', gap:4, marginTop:1, flexWrap:'wrap' }}>
{day.exos.slice(0,3).map((id:string) => { const ex=EX[id]; return ex?<span key={id} style={{ fontSize:10, color:D.sub, fontFamily:F.b }}>{ex.emoji} {ex.name.split(' ').slice(0,2).join(' ')}</span>:null; })}
{day.exos.length>3&&<span style={{ fontSize:10, color:D.sub }}>+{day.exos.length-3}</span>}
</div>
) : <div style={{ fontSize:10, color:D.sub, fontFamily:F.b, marginTop:1 }}>{day.note}</div>}
</div>
{!day.isRest && <div style={{ fontFamily:F.m, fontSize:10, color:AC }}>{day.exos.length} ›</div>}
</div>
);
})}
</div>
</div>
);
}

// ─── CATALOG ──────────────────────────────────────────────
export function CatalogView({ profile, logs, cycle, setActiveExo, setView, customSessionExos, setCustomSessionExos, AC }: any) {
const [filter, setFilter] = useState('Tous');
const [search, setSearch] = useState('');
const muscles = ['Tous','Pectoraux','Dos','Épaules','Biceps','Triceps','Jambes','Fessiers','Abdos'];
const muscleMap: Record<string,string> = { Pectoraux:'chest', Dos:'back', Épaules:'shoulders', Biceps:'biceps', Triceps:'triceps', Jambes:'legs', Fessiers:'glutes', Abdos:'abs' };
const bestOf = (id:string) => { const x=logs[id]||[]; return x.length?Math.max(...x.map((y:any)=>y.maxWeight||0)):null; };
const inProgram = cycle.filter((x:any)=>!x.isRest).flatMap((x:any)=>x.exos);
const filtered = Object.keys(EX).filter(id => {
const ex = EX[id];
if (filter!=='Tous' && ex.muscleGroup!==muscleMap[filter]) return false;
if (search.trim() && !ex.name.toLowerCase().includes(search.toLowerCase())) return false;
return true;
});
const grouped: Record<string,string[]> = {};
filtered.forEach(id => { const g=EX[id].muscleGroup; if(!grouped[g])grouped[g]=[]; grouped[g].push(id); });
const gLabels: Record<string,string> = { chest:'Pectoraux 🏋️', back:'Dos 🌊', shoulders:'Épaules 🔥', biceps:'Biceps 💥', triceps:'Triceps 🔩', legs:'Jambes 🦵', glutes:'Fessiers 🍑', abs:'Abdos 🎯' };

return (
<div style={{ background:D.bg, minHeight:'100vh', color:D.text, maxWidth:430, margin:'0 auto', paddingBottom:90 }}>
<div style={{ padding:'48px 16px 0' }}>
<div style={{ fontFamily:F.b, fontWeight:800, fontSize:32, letterSpacing:-.5, marginBottom:12 }}>Exercices</div>
<div style={{ position:'relative', marginBottom:9 }}>
<span style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', color:D.sub, fontSize:13 }}>🔍</span>
<input style={{ width:'100%', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.05)', borderRadius:12, padding:'10px 11px 10px 36px', fontSize:13, color:'#fff', outline:'none', fontFamily:F.b }} placeholder="Rechercher…" value={search} onChange={e=>setSearch(e.target.value)}/>
</div>
<div className="scroll-x" style={{ display:'flex', gap:6, paddingBottom:6, marginBottom:16 }}>
{muscles.map(m => <Chip key={m} active={filter===m} color={AC} onClick={()=>setFilter(m)}>{m}</Chip>)}
</div>
{Object.entries(grouped).map(([group, ids]) => (
<div key={group} style={{ marginBottom:20 }}>
<div style={{ fontFamily:F.m, fontSize:8, color:D.sub, letterSpacing:2, marginBottom:9 }}>{(gLabels[group]||group).toUpperCase()}</div>
{ids.map(id => { const ex=EX[id], isInProg=inProgram.includes(id), best=bestOf(id); return (
<Card key={id} onClick={()=>{ setActiveExo(id); setView('catalogDetail'); }} style={{ padding:'10px 12px', marginBottom:6, display:'flex', alignItems:'center', gap:10 }}>
<div style={{ width:38, height:38, borderRadius:10, background:`${AC}10`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:19, flexShrink:0 }}>{ex.emoji}</div>
<div style={{ flex:1, minWidth:0 }}>
<div style={{ fontWeight:600, fontSize:12, color:'rgba(255,255,255,.85)', fontFamily:F.b, marginBottom:2 }}>{ex.name}</div>
<div style={{ display:'flex', gap:4, alignItems:'center' }}>
<span style={{ fontSize:10, color:D.sub, fontFamily:F.b }}>{ex.muscle}</span>
{isInProg && <span style={{ fontSize:8, background:`${AC}15`, color:AC, borderRadius:5, padding:'1px 5px', fontWeight:700, fontFamily:F.m }}>PROG</span>}
</div>
</div>
<div style={{ textAlign:'right', flexShrink:0 }}>
{best ? <div style={{ fontFamily:F.b, fontWeight:700, fontSize:14, color:AC }}>{best}kg</div> : <div style={{ fontSize:11, color:D.sub2 }}>—</div>}
<div style={{ fontSize:12, color:D.sub }}>›</div>
</div>
</Card>
); })}
</div>
))}
{filtered.length===0 && <div style={{ textAlign:'center', padding:'40px 0', color:D.sub, fontFamily:F.b }}><div style={{ fontSize:32, marginBottom:8, opacity:.3 }}>🔍</div>Aucun exercice trouvé</div>}
</div>
</div>
);
}

export function CatalogDetailView({ activeExo, profile, logs, cycle, customSessionExos, setCustomSessionExos, setView, toast_, AC }: any) {
const ex = EX[activeExo]; if (!ex) return null;
const allH = logs[activeExo] || [];
const best = allH.length ? Math.max(...allH.map((y:any)=>y.maxWeight||0)) : null;
const inProgram = cycle.filter((x:any)=>!x.isRest).flatMap((x:any)=>x.exos).includes(activeExo);
const curDay = cycle.find((x:any)=>!x.isRest);
const currentCustom = customSessionExos || (curDay?.exos||[]);
const isInCustom = currentCustom.includes(activeExo);
const toggleInSession = () => {
if (!curDay) return;
const base = customSessionExos || [...curDay.exos];
if (isInCustom) { setCustomSessionExos(base.filter((id:string)=>id!==activeExo)); toast_('✕ Retiré'); }
else { setCustomSessionExos([...base, activeExo]); toast_('✅ Ajouté !'); }
};
const hist = allH.filter((x:any)=>{ const m=new Date(); m.setMonth(m.getMonth()-1); return new Date(x.date)>=m; });

return (
<div style={{ background:D.bg, minHeight:'100vh', color:D.text, maxWidth:430, margin:'0 auto', padding:'48px 16px 90px' }}>
<button style={{ background:'none', border:'none', color:D.sub, fontSize:12, cursor:'pointer', fontFamily:F.b, marginBottom:12 }} onClick={()=>setView('catalog')}>← Retour</button>
<Card style={{ padding:14, marginBottom:10 }}>
<div style={{ display:'flex', gap:11, alignItems:'center', marginBottom:11 }}>
<div style={{ width:54, height:54, borderRadius:15, background:`${AC}12`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, flexShrink:0 }}>{ex.emoji}</div>
<div style={{ flex:1 }}>
<div style={{ fontFamily:F.b, fontWeight:700, fontSize:18, marginBottom:4, color:'rgba(255,255,255,.9)' }}>{ex.name}</div>
<div style={{ display:'flex', gap:4, flexWrap:'wrap' }}>
<span style={{ fontSize:10, background:'rgba(255,255,255,.05)', color:D.sub, borderRadius:6, padding:'2px 7px', fontFamily:F.b }}>{ex.muscle}</span>
{inProgram && <span style={{ fontSize:9, background:`${AC}15`, color:AC, borderRadius:6, padding:'2px 7px', fontWeight:700, fontFamily:F.m }}>PROGRAMME ✓</span>}
</div>
</div>
</div>
<p style={{ fontSize:12, color:'rgba(255,255,255,.55)', lineHeight:1.75, marginBottom:11, fontFamily:F.b }}>{ex.why}</p>
<div style={{ display:'flex', gap:5, marginBottom:11 }}>
{[{l:'Descente',v:ex.tempo.d,c:'#5B8DEE'},{l:'Pause',v:ex.tempo.h,c:D.orange},{l:'Montée',v:ex.tempo.u,c:D.green}].map((t,i) => (
<div key={i} style={{ flex:1, background:`${t.c}0D`, border:`1px solid ${t.c}18`, borderRadius:10, padding:'8px 5px', textAlign:'center' }}>
<div style={{ fontFamily:F.b, fontWeight:700, fontSize:17, color:t.c }}>{t.v}s</div>
<div style={{ fontSize:8, color:D.sub, fontFamily:F.b, marginTop:2 }}>{t.l}</div>
</div>
))}
</div>
<div style={{ background:'rgba(255,255,255,.025)', borderRadius:10, padding:'9px', marginBottom:11 }}>
<div style={{ fontFamily:F.m, fontSize:7, color:D.sub, letterSpacing:1, marginBottom:4 }}>POINTS CLÉS</div>
{ex.tips.map((t:string,i:number) => <div key={i} style={{ display:'flex', gap:6, marginBottom:4, fontSize:12, color:'rgba(255,255,255,.7)', fontFamily:F.b }}><span style={{ color:AC, fontWeight:700, flexShrink:0 }}>·</span>{t}</div>)}
</div>
{curDay && <Btn full AC={AC} variant={isInCustom?'danger':'primary'} onClick={toggleInSession} style={{ marginTop:11 }}>{isInCustom?'✕ Retirer de ma séance':'＋ Ajouter à ma séance'}</Btn>}
</Card>
{hist.length > 0 && (
<Card style={{ padding:14, marginBottom:10 }}>
<div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:9 }}>
<div style={{ fontFamily:F.m, fontSize:8, color:D.sub, letterSpacing:1 }}>PROGRESSION (30j)</div>
{best && <span style={{ fontFamily:F.b, fontWeight:700, fontSize:15, color:AC }}>{best}kg</span>}
</div>
<Chart hist={hist} color={AC}/>
</Card>
)}
</div>
);
}

// ─── STATS ────────────────────────────────────────────────
export function StatsView({ profile, logs, AC, xpUser }: any) {
const [tab, setTab] = useState('overview');
const [weightLogs, setWeightLogs] = useState<any[]>(() => { try { return JSON.parse(localStorage.getItem('surge_weights')||'[]'); } catch { return []; } });
const [newWeight, setNewWeight] = useState('');
const [orm1W, setOrm1W] = useState('');
const [orm1R, setOrm1R] = useState('');

const totalSeances = new Set(Object.values(logs).flat().map((x:any)=>x.sid||x.date)).size;
const serieJours = getStreak(logs);
const totalVol = Math.round(Object.values(logs).flat().reduce((acc:number,x:any)=>acc+(x.series||[]).reduce((a:number,r:any)=>a+(r.weight||0)*(r.reps||0),0),0)/1000);
const allTracked = Object.keys(logs).filter(k=>logs[k]?.length>0);
const bestOf = (id:string) => { const x=logs[id]||[]; return x.length?Math.max(...x.map((y:any)=>y.maxWeight||0)):null; };
const days = ['L','M','M','J','V','S','D'];
const weeklyVol = days.map((_,i) => { const d=new Date(); d.setDate(d.getDate()-(6-i)); d.setHours(0,0,0,0); const vol=Object.values(logs).flat().filter((x:any)=>new Date(x.date).toDateString()===d.toDateString()).reduce((a:number,x:any)=>a+(x.series||[]).reduce((acc:number,r:any)=>acc+(r.weight||0)*(r.reps||0),0),0); return { day:days[i], vol }; });
const muscleVol: Record<string,number> = {};
allTracked.forEach(id => { const ex=EX[id]; if(!ex)return; muscleVol[ex.muscleGroup]=(muscleVol[ex.muscleGroup]||0)+(logs[id]||[]).length; });
const maxMV = Math.max(...Object.values(muscleVol),1);
const muscLabels: Record<string,string> = { chest:'Pectoraux', back:'Dos', shoulders:'Épaules', biceps:'Biceps', triceps:'Triceps', legs:'Jambes', glutes:'Fessiers', abs:'Abdos' };
const muscCols: Record<string,string> = { chest:D.lime, back:D.blue, shoulders:D.orange, biceps:D.purple, triceps:D.pink, legs:D.red, glutes:D.pink, abs:D.green };
const taille = parseFloat(profile.height)||175;
const poidsInit = parseFloat(profile.weight)||75;
const allWeights = [{ date:profile.createdAt||new Date().toISOString().slice(0,10), weight:poidsInit }, ...weightLogs].sort((a,b)=>a.date.localeCompare(b.date));
const poidsActuel = allWeights[allWeights.length-1]?.weight || poidsInit;
const imc = parseFloat((poidsActuel/Math.pow(taille/100,2)).toFixed(1));
const imcColor = imc<18.5?D.blue:imc<25?D.green:imc<30?D.orange:D.red;
const unlocked = getUnlocked(logs, serieJours);
const orm = orm1W&&orm1R ? calc1RM(parseFloat(orm1W),parseInt(orm1R)) : 0;
const tabList = [{id:'overview',l:'Général'},{id:'corps',l:'Corps'},{id:'records',l:'Records'},{id:'muscles',l:'Muscles'},{id:'succes',l:'Succès'},{id:'orm',l:'1RM'}];

return (
<div style={{ background:D.bg, minHeight:'100vh', color:D.text, maxWidth:430, margin:'0 auto', paddingBottom:90 }}>
<div style={{ padding:'48px 16px 12px' }}>
<div className="fu" style={{ fontFamily:F.b, fontWeight:800, fontSize:32, letterSpacing:-.5, marginBottom:12 }}>{profile.firstName}</div>
<div className="fu fu1" style={{ background:D.card, border:`1px solid ${D.border}`, borderRadius:16, padding:'12px 14px', display:'flex', alignItems:'center', gap:11, marginBottom:12 }}>
<Ring value={Math.min(serieJours*8,100)} color={D.blue} size={54} stroke={4} label={serieJours} sub="streak"/>
<Ring value={Math.min(totalSeances*2,100)} color={AC} size={54} stroke={4} label={totalSeances} sub="séances"/>
<div style={{ flex:1 }}>
<div style={{ fontWeight:600, fontSize:11, color:'rgba(255,255,255,.82)', fontFamily:F.b, marginBottom:2 }}>{serieJours>5?'Forme excellente 🔥':serieJours>2?'Bonne régularité 💪':'Continue comme ça 🌱'}</div>
<div style={{ fontSize:10, color:D.sub, fontFamily:F.b }}>{totalVol}T soulevées</div>
</div>
</div>
</div>
<div className="scroll-x" style={{ padding:'0 16px 9px', display:'flex', gap:5 }}>
{tabList.map(t => <button key={t.id} onClick={()=>setTab(t.id)} style={{ flexShrink:0, background:tab===t.id?'rgba(255,255,255,.07)':'transparent', border:`1px solid ${tab===t.id?'rgba(255,255,255,.1)':'transparent'}`, borderRadius:9, padding:'5px 11px', cursor:'pointer', fontFamily:F.b, fontSize:11, fontWeight:tab===t.id?600:400, color:tab===t.id?'rgba(255,255,255,.88)':D.sub, transition:'all .2s' }}>{t.l}</button>)}
</div>

{tab==='overview' && (
<div style={{ padding:'0 12px 20px' }}>
<div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:12 }}>
{[{l:'Séances',v:totalSeances,i:'⚡'},{l:'Volume',v:totalVol+'T',i:'🏋️'},{l:'Records',v:allTracked.length,i:'🏆'},{l:'Série',v:serieJours+'j',i:'🔥'}].map((k,i) => (
<Card key={i} style={{ padding:'12px' }}>
<div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
<div style={{ fontFamily:F.m, fontSize:8, color:D.sub, letterSpacing:.7 }}>{k.l.toUpperCase()}</div>
<span style={{ fontSize:13 }}>{k.i}</span>
</div>
<div style={{ fontFamily:F.b, fontWeight:800, fontSize:30, color:'rgba(255,255,255,.88)', lineHeight:1, letterSpacing:-1 }}>{k.v}</div>
</Card>
))}
</div>
<Card style={{ padding:'14px', marginBottom:9 }}>
<div style={{ fontFamily:F.m, fontSize:8, color:D.sub, letterSpacing:1, marginBottom:12 }}>VOLUME — CETTE SEMAINE</div>
<WeekBars data={weeklyVol} AC={AC}/>
</Card>
{allTracked.slice(0,3).map(id => { const ex=EX[id]; if(!ex)return null; const b=bestOf(id); return (
<Card key={id} style={{ padding:'10px 12px', marginBottom:6, display:'flex', alignItems:'center', gap:9 }}>
<span style={{ fontSize:16 }}>{ex.emoji}</span>
<div style={{ flex:1 }}><div style={{ fontWeight:600, fontSize:11, fontFamily:F.b, color:'rgba(255,255,255,.78)' }}>{ex.name}</div></div>
<Sparkline data={(logs[id]||[]).slice(-8).map((x:any)=>x.maxWeight||0)} color={AC} width={56} height={20}/>
{b && <div style={{ fontFamily:F.b, fontWeight:700, fontSize:15, color:AC }}>{b}<span style={{ fontSize:7, color:D.sub }}>kg</span></div>}
</Card>
); })}
{totalSeances===0 && <div style={{ textAlign:'center', padding:'32px 0', color:D.sub, fontFamily:F.b }}><div style={{ fontSize:36, marginBottom:12, opacity:.25 }}>📊</div>Lance ta première séance !</div>}
</div>
)}

{tab==='corps' && (
<div style={{ padding:'0 12px 20px' }}>
<Card style={{ padding:'14px', marginBottom:9 }}>
<div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:11 }}>
<div>
<div style={{ fontFamily:F.m, fontSize:8, color:D.sub, letterSpacing:1, marginBottom:2 }}>POIDS ACTUEL</div>
<div style={{ fontFamily:F.b, fontWeight:800, fontSize:42, color:'rgba(255,255,255,.9)', lineHeight:1 }}>{poidsActuel}<span style={{ fontFamily:F.m, fontSize:11, color:D.sub }}> kg</span></div>
</div>
<div style={{ textAlign:'right' }}>
<div style={{ fontFamily:F.m, fontSize:8, color:D.sub, letterSpacing:1, marginBottom:2 }}>TAILLE</div>
<div style={{ fontFamily:F.b, fontWeight:700, fontSize:22, color:'rgba(255,255,255,.82)' }}>{taille}<span style={{ fontFamily:F.m, fontSize:10, color:D.sub }}> cm</span></div>
</div>
</div>
<div style={{ display:'flex', gap:6 }}>
<input type="number" inputMode="decimal" value={newWeight} onChange={e=>setNewWeight(e.target.value)} placeholder="75.5" style={{ flex:1, background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.07)', borderRadius:10, padding:'10px', fontSize:16, fontWeight:700, color:'#fff', outline:'none', fontFamily:F.b, textAlign:'center' }}/>
<Btn AC={AC} onClick={()=>{ const w=parseFloat(newWeight); if(isNaN(w)||w<30||w>300)return; const u=[...weightLogs,{date:new Date().toISOString().slice(0,10),weight:w}]; setWeightLogs(u); localStorage.setItem('surge_weights',JSON.stringify(u)); setNewWeight(''); }}>Peser</Btn>
</div>
</Card>
{allWeights.length>1 && <Card style={{ padding:14, marginBottom:9 }}><div style={{ fontFamily:F.m, fontSize:8, color:D.sub, letterSpacing:1, marginBottom:9 }}>ÉVOLUTION DU POIDS</div><Chart hist={allWeights.map(w=>({date:w.date,maxWeight:w.weight}))} color={AC}/></Card>}
<Card style={{ padding:'14px' }}>
<div style={{ fontFamily:F.m, fontSize:8, color:D.sub, letterSpacing:1, marginBottom:11 }}>IMC</div>
<div style={{ display:'flex', alignItems:'center', gap:13 }}>
<div style={{ width:58, height:58, borderRadius:'50%', background:`${imcColor}12`, border:`2px solid ${imcColor}`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
<div style={{ fontFamily:F.b, fontWeight:800, fontSize:18, color:imcColor, lineHeight:1 }}>{imc}</div>
</div>
<div style={{ flex:1 }}>
<div style={{ fontFamily:F.b, fontWeight:700, fontSize:16, color:imcColor, marginBottom:2 }}>{imc<18.5?'Sous-poids':imc<25?'Normal':imc<30?'Surpoids':'Obésité'}</div>
<div style={{ fontFamily:F.b, fontSize:11, color:D.sub, lineHeight:1.6 }}>{imc<18.5?'Augmente l\'apport calorique.':imc<25?'Composition idéale.':imc<30?'Déficit calorique conseillé.':'Programme sèche recommandé.'}</div>
</div>
</div>
</Card>
</div>
)}

{tab==='records' && (
<div style={{ padding:'0 12px 20px' }}>
{allTracked.length===0 ? <div style={{ textAlign:'center', padding:'40px 0', color:D.sub, fontFamily:F.b }}><div style={{ fontSize:32, marginBottom:8, opacity:.25 }}>🏆</div>Aucun record encore</div> : (
<Card style={{ padding:14 }}>
<div style={{ fontFamily:F.m, fontSize:8, color:D.sub, letterSpacing:1, marginBottom:12 }}>RECORDS PERSONNELS</div>
{allTracked.map((id,i) => { const ex=EX[id]; if(!ex)return null; const hist=logs[id]||[]; const b=bestOf(id); return (
<div key={id} style={{ padding:'9px 0', borderBottom:i<allTracked.length-1?`1px solid ${D.border}`:'none' }}>
<div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
<span style={{ fontSize:16 }}>{ex.emoji}</span>
<div style={{ flex:1 }}><div style={{ fontWeight:600, fontSize:11, fontFamily:F.b, color:'rgba(255,255,255,.82)' }}>{ex.name}</div></div>
<div style={{ textAlign:'right' }}>
<span style={{ fontFamily:F.b, fontWeight:800, fontSize:18, color:AC }}>{b}</span>
<span style={{ fontFamily:F.m, fontSize:8, color:D.sub }}>kg</span>
</div>
</div>
<Sparkline data={hist.slice(-10).map((x:any)=>x.maxWeight||0)} color={AC} width="100%" height={20}/>
</div>
); })}
</Card>
)}
</div>
)}

{tab==='muscles' && (
<div style={{ padding:'0 12px 20px' }}>
<Card style={{ padding:14 }}>
<div style={{ fontFamily:F.m, fontSize:8, color:D.sub, letterSpacing:1, marginBottom:12 }}>VOLUME PAR GROUPE</div>
{Object.keys(muscleVol).length===0 ? <div style={{ textAlign:'center', padding:'16px 0', color:D.sub, fontFamily:F.b }}>Pas encore de données</div> :
Object.entries(muscleVol).sort((a,b)=>b[1]-a[1]).map(([g,v]) => (
<div key={g} style={{ marginBottom:10 }}>
<div style={{ display:'flex', justifyContent:'space-between', marginBottom:3 }}>
<span style={{ fontFamily:F.b, fontSize:11, fontWeight:500, color:'rgba(255,255,255,.78)' }}>{muscLabels[g]||g}</span>
<span style={{ fontFamily:F.m, fontSize:10, color:muscCols[g]||AC }}>{v} séances</span>
</div>
<div style={{ height:3, background:'rgba(255,255,255,.05)', borderRadius:3, overflow:'hidden' }}>
<div style={{ height:'100%', width:`${(v/maxMV)*100}%`, background:muscCols[g]||AC, borderRadius:3, transition:'width 1.2s ease' }}/>
</div>
</div>
))
}
</Card>
</div>
)}

{tab==='succes' && (
<div style={{ padding:'0 12px 20px' }}>
<div style={{ fontFamily:F.m, fontSize:8, color:D.sub, letterSpacing:1, marginBottom:9 }}>SUCCÈS — {unlocked.length}/{ACHIEVEMENTS.length}</div>
<div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
{ACHIEVEMENTS.map(a => { const isU=unlocked.includes(a.id); return (
<Card key={a.id} style={{ padding:'12px 10px', opacity:isU?1:0.38 }}>
<div style={{ fontSize:24, marginBottom:6 }}>{a.icon}</div>
<div style={{ fontWeight:600, fontSize:11, fontFamily:F.b, color:isU?'rgba(255,255,255,.88)':D.sub, marginBottom:2, lineHeight:1.3 }}>{a.name}</div>
<div style={{ fontSize:10, color:D.sub, fontFamily:F.b, lineHeight:1.4, marginBottom:6 }}>{a.desc}</div>
<div style={{ background:isU?`${AC}18`:'rgba(255,255,255,.03)', borderRadius:7, padding:'2px 7px', fontFamily:F.m, fontSize:8, color:isU?AC:D.sub2, display:'inline-block' }}>+{a.xp} XP {isU?'✓':''}</div>
</Card>
); })}
</div>
</div>
)}

{tab==='orm' && (
<div style={{ padding:'0 12px 20px' }}>
<Card style={{ padding:'14px' }}>
<div style={{ fontFamily:F.m, fontSize:8, color:D.sub, letterSpacing:1, marginBottom:12 }}>CALCULATEUR 1RM</div>
<div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:9, marginBottom:12 }}>
<div>
<div style={{ fontFamily:F.m, fontSize:8, color:D.sub, letterSpacing:1, marginBottom:4 }}>POIDS (kg)</div>
<input style={{ width:'100%', background:'rgba(255,255,255,.04)', border:'1.5px solid rgba(255,255,255,.07)', borderRadius:10, padding:'11px', textAlign:'center', fontSize:20, fontWeight:700, color:'#fff', outline:'none', fontFamily:F.b }} type="number" inputMode="decimal" placeholder="100" value={orm1W} onChange={e=>setOrm1W(e.target.value)}/>
</div>
<div>
<div style={{ fontFamily:F.m, fontSize:8, color:D.sub, letterSpacing:1, marginBottom:4 }}>REPS</div>
<input style={{ width:'100%', background:'rgba(255,255,255,.04)', border:'1.5px solid rgba(255,255,255,.07)', borderRadius:10, padding:'11px', textAlign:'center', fontSize:20, fontWeight:700, color:'#fff', outline:'none', fontFamily:F.b }} type="number" inputMode="numeric" placeholder="8" value={orm1R} onChange={e=>setOrm1R(e.target.value)}/>
</div>
</div>
{orm>0 && <>
<div style={{ textAlign:'center', marginBottom:12 }}>
<div style={{ fontFamily:F.m, fontSize:8, color:D.sub, letterSpacing:1, marginBottom:2 }}>1 REP MAX ESTIMÉ</div>
<div style={{ fontFamily:F.b, fontWeight:800, fontSize:48, color:AC, lineHeight:1 }}>{orm}<span style={{ fontSize:16, color:D.sub }}>kg</span></div>
</div>
<div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6 }}>
{[{pct:90,z:'Force'},{pct:80,z:'Masse'},{pct:70,z:'Hyper.'},{pct:65,z:'Volume'},{pct:60,z:'Endur.'},{pct:50,z:'Échauff.'}].map(z => (
<div key={z.pct} style={{ background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.05)', borderRadius:10, padding:'8px 5px', textAlign:'center' }}>
<div style={{ fontFamily:F.m, fontSize:7, color:D.sub, marginBottom:2 }}>{z.pct}% · {z.z}</div>
<div style={{ fontFamily:F.b, fontWeight:700, fontSize:15, color:AC }}>{Math.round(orm*z.pct/100/2.5)*2.5}kg</div>
</div>
))}
</div>
</>}
</Card>
</div>
)}
</div>
);
}

// ─── COACH IA ─────────────────────────────────────────────
export function CoachView({ profile, logs, AC, grad }: any) {
const [msgs, setMsgs] = useState<any[]>([]);
const [input, setInput] = useState('');
const [loading, setLoading] = useState(false);
const [streamTxt, setStreamTxt] = useState('');
const [error, setError] = useState<string|null>(null);
const endRef = useRef<HTMLDivElement>(null);
const abortRef = useRef<AbortController|null>(null);

const totalSeances = new Set(Object.values(logs).flat().map((x:any)=>x.sid||x.date)).size;
const serieJours = getStreak(logs);
const allTracked = Object.keys(logs).filter(k=>logs[k]?.length>0);
const totalVol = Math.round(Object.values(logs).flat().reduce((acc:number,x:any)=>acc+(x.series||[]).reduce((a:number,r:any)=>a+(r.weight||0)*(r.reps||0),0),0)/1000);
const gL: Record<string,string> = { mass:'prise de masse', cut:'sèche', force:'force pure', fit:'remise en forme', glute:'fessiers', tone:'tonicité', teen:'programme ado' };
const SYSTEM = `Tu es SURGE Coach, expert musculation. Réponds en français, 2-3 paragraphes max. PROFIL: ${profile.firstName}, objectif ${gL[profile.goal]||'masse'}, niveau ${profile.level||'intermédiaire'}, ${profile.environment||'salle'}. STATS: ${totalSeances} séances, ${serieJours}j streak, ${totalVol}T volume, ${allTracked.length} exercices trackés.`;
const SUGGESTIONS = [
{q:'Comment progresser plus vite ?',i:'⚡'},
{q:'Analyse mes stats et dis-moi où m\'améliorer',i:'📊'},
{q:'Combien de protéines je dois manger ?',i:'🥩'},
{q:'J\'ai pas envie de m\'entraîner, aide-moi',i:'😩'},
];

useEffect(() => { endRef.current?.scrollIntoView({ behavior:'smooth' }); }, [msgs, streamTxt, loading]);

const send = async (txt?: string) => {
const q = (txt||input).trim();
if (!q || loading) return;
setError(null);
const newMsgs = [...msgs, { role:'user', content:q }];
setMsgs(newMsgs); setInput(''); setLoading(true); setStreamTxt('');
if (abortRef.current) abortRef.current.abort();
const ctrl = new AbortController(); abortRef.current = ctrl;
try {
const res = await fetch('/api/chat', { method:'POST', signal:ctrl.signal, headers:{'Content-Type':'application/json'}, body: JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:1024, stream:true, system:SYSTEM, messages:newMsgs.map(m=>({role:m.role,content:m.content})) }) });
if (!res.ok) { const e=await res.json().catch(()=>({})); throw new Error(e?.error?.message||`HTTP ${res.status}`); }
const reader = res.body!.getReader(); const dec = new TextDecoder(); let full = '';
while (true) {
const { done, value } = await reader.read(); if (done) break;
const chunk = dec.decode(value, { stream:true });
for (const line of chunk.split('\n')) {
if (!line.startsWith('data:')) continue;
const data = line.slice(5).trim(); if (data==='[DONE]') continue;
try { const p=JSON.parse(data); if (p.type==='content_block_delta'&&p.delta?.type==='text_delta') { full+=p.delta.text; setStreamTxt(full); } } catch {}
}
}
setMsgs(m => [...m, { role:'assistant', content:full.trim()||'Erreur.' }]); setStreamTxt('');
} catch(e: any) { if (e.name==='AbortError') return; setError(`Erreur : ${e.message}`); setStreamTxt(''); }
setLoading(false);
};

return (
<div style={{ background:D.bg, minHeight:'100vh', color:D.text, maxWidth:430, margin:'0 auto', display:'flex', flexDirection:'column' }}>
<div style={{ padding:'48px 16px 11px', background:'rgba(5,5,7,.98)', borderBottom:'1px solid rgba(255,255,255,.04)' }}>
<div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:9 }}>
<div style={{ position:'relative' }}>
<div style={{ width:42, height:42, borderRadius:12, background:`linear-gradient(${grad})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:21 }}>🤖</div>
<div style={{ position:'absolute', bottom:-2, right:-2, width:10, height:10, borderRadius:'50%', background:D.green, border:`2px solid ${D.bg}` }}/>
</div>
<div style={{ flex:1 }}>
<div style={{ fontFamily:F.b, fontWeight:700, fontSize:19, letterSpacing:-.2 }}>SURGE Coach</div>
<div style={{ fontFamily:F.m, fontSize:9, color:D.green, letterSpacing:.8 }}>● EN LIGNE</div>
</div>
{msgs.length>0 && <button onClick={()=>{ setMsgs([]); setStreamTxt(''); setError(null); }} style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.06)', borderRadius:8, padding:'4px 8px', color:D.sub, fontSize:10, cursor:'pointer', fontFamily:F.b }}>Effacer</button>}
</div>
</div>
<div style={{ flex:1, overflowY:'auto', padding:'12px 14px 108px' }}>
{msgs.length===0 && (
<div>
<div style={{ textAlign:'center', padding:'16px 0 14px' }}>
<div style={{ fontFamily:F.b, fontWeight:700, fontSize:24, marginBottom:3 }}>Bonjour {profile.firstName} 👋</div>
<div style={{ color:D.sub, fontSize:12, fontFamily:F.b, lineHeight:1.7 }}>Je connais ton programme et tes stats.</div>
</div>
<div style={{ display:'flex', flexDirection:'column', gap:6 }}>
{SUGGESTIONS.map((s,i) => (
<button key={i} onClick={()=>send(s.q)} style={{ background:D.card, border:`1px solid ${D.border}`, borderRadius:12, padding:'10px 11px', color:'rgba(255,255,255,.75)', fontSize:12, cursor:'pointer', textAlign:'left', fontFamily:F.b, display:'flex', alignItems:'center', gap:8 }}>
<div style={{ width:28, height:28, borderRadius:7, background:`${AC}12`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, flexShrink:0 }}>{s.i}</div>
<div style={{ flex:1, lineHeight:1.4 }}>{s.q}</div>
<div style={{ color:D.sub, flexShrink:0 }}>›</div>
</button>
))}
</div>
</div>
)}
{msgs.map((m,i) => (
<div key={i} style={{ marginBottom:11, display:'flex', justifyContent:m.role==='user'?'flex-end':'flex-start', gap:6, alignItems:'flex-end' }}>
{m.role==='assistant' && <div style={{ width:24, height:24, borderRadius:7, background:`linear-gradient(${grad})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, flexShrink:0 }}>🤖</div>}
<div style={{ maxWidth:'83%', background:m.role==='user'?AC:D.card, border:`1px solid ${m.role==='user'?AC:D.border}`, borderRadius:m.role==='user'?'15px 15px 3px 15px':'15px 15px 15px 3px', padding:'9px 12px', color:m.role==='user'?'rgba(0,0,0,.88)':D.text, fontSize:13, fontFamily:F.b, lineHeight:1.7, whiteSpace:'pre-wrap', wordBreak:'break-word' }}>{m.content}</div>
</div>
))}
{loading && (
<div style={{ marginBottom:11, display:'flex', gap:6, alignItems:'flex-end' }}>
<div style={{ width:24, height:24, borderRadius:7, background:`linear-gradient(${grad})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, flexShrink:0 }}>🤖</div>
<div style={{ maxWidth:'83%', background:D.card, border:`1px solid ${D.border}`, borderRadius:'15px 15px 15px 3px', padding:'9px 12px', fontSize:13, fontFamily:F.b, lineHeight:1.7, color:D.text }}>
{streamTxt || <div style={{ display:'flex', gap:3, padding:'2px 0' }}>{[0,1,2].map(i=><div key={i} style={{ width:6, height:6, borderRadius:'50%', background:AC, animation:`pulse 1.2s ${i*.25}s infinite` }}/>)}</div>}
</div>
</div>
)}
{error && <div style={{ background:'rgba(255,64,64,.08)', border:'1px solid rgba(255,64,64,.2)', borderRadius:10, padding:'8px 11px', marginBottom:9, fontSize:12, color:D.red, fontFamily:F.b }}>{error}</div>}
<div ref={endRef}/>
</div>
<div style={{ position:'fixed', bottom:0, left:'50%', transform:'translateX(-50%)', width:'100%', maxWidth:430, background:'rgba(5,5,7,.97)', backdropFilter:'blur(20px)', borderTop:'1px solid rgba(255,255,255,.04)', padding:'8px 12px 80px' }}>
<div style={{ display:'flex', gap:6, alignItems:'flex-end' }}>
<textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); send(); } }} placeholder="Pose ta question…" rows={1} style={{ flex:1, background:D.card, border:`1.5px solid ${input.trim()?AC+'50':'rgba(255,255,255,.05)'}`, borderRadius:12, padding:'10px 11px', fontSize:13, color:'#fff', outline:'none', fontFamily:F.b, resize:'none', lineHeight:1.5, maxHeight:100, transition:'border-color .2s' }}></textarea>
{loading
? <button onClick={()=>abortRef.current?.abort()} style={{ width:40, height:40, borderRadius:11, background:'rgba(255,64,64,.1)', border:'1px solid rgba(255,64,64,.25)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0, color:D.red, fontSize:14 }}>✕</button>
: <button className="press" onClick={()=>send()} disabled={!input.trim()} style={{ width:40, height:40, borderRadius:11, background:input.trim()?AC:'rgba(255,255,255,.04)', border:`1px solid ${input.trim()?AC:'rgba(255,255,255,.05)'}`, display:'flex', alignItems:'center', justifyContent:'center', cursor:input.trim()?'pointer':'default', flexShrink:0, transition:'all .2s' }}><span style={{ fontSize:17, fontWeight:700, color:input.trim()?'#000':D.sub }}>↑</span></button>
}
</div>
</div>
</div>
);
}

// ─── CLASSEMENT ───────────────────────────────────────────
const AVTS = ['🐺','🦊','🦁','🐯','🦅','🐻','🦋','🦈','🎯','💎','🌙','👑','🏆','🔱','⚡','🦬','🔥','💠'];
const NOMS_MOCK: [string,string,string,number][] = [['Théo','🇫🇷','mass',42000],['Sofia','🇪🇸','cut',35000],['Maxime','🇫🇷','force',28000],['Léa','🇫🇷','fit',22000],['Lucas','🇧🇪','mass',18000],['Emma','🇨🇭','cut',15000],['Nathan','🇫🇷','fit',12000],['Hugo','🇫🇷','force',9500],['Camille','🇫🇷','mass',7800],['Antoine','🇧🇪','cut',6200],['Inès','🇫🇷','fit',5000],['Romain','🇨🇭','force',3900],['Tom','🇬🇧','force',3100],['Laura','🇩🇪','fit',2400],['Baptiste','🇫🇷','mass',1900],['Zoé','🇫🇷','cut',1500]];

export function VueClassement({ profile, xpUser, AC }: any) {
const palier = getPalier(xpUser);
const tousJ = [...NOMS_MOCK.map(([nom,flag,obj,xp],i)=>({ id:'j'+i, nom, flag, obj, xp, avatar:AVTS[i%AVTS.length], palier:getPalier(xp), estUser:false })), { id:'user', nom:profile.firstName||'Toi', flag:'🇫🇷', obj:profile.goal||'mass', xp:xpUser, avatar:'⚡', palier:getPalier(xpUser), estUser:true }].sort((a,b)=>b.xp-a.xp).map((x,i)=>({...x,rang:i+1}));
const userRang = tousJ.find(j=>j.estUser)?.rang;

return (
<div style={{ background:D.bg, minHeight:'100vh', color:D.text, maxWidth:430, margin:'0 auto', paddingBottom:90 }}>
<div style={{ padding:'48px 16px 11px' }}>
<div style={{ fontFamily:F.b, fontWeight:800, fontSize:32, letterSpacing:-.5, marginBottom:9 }}>Classement</div>
<Card style={{ padding:'13px 14px', marginBottom:9, border:`1px solid ${palier.rang.couleur}22` }}>
<div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:8 }}>
<BadgeDiv xp={xpUser} size="lg"/>
<div style={{ flex:1 }}>
<div style={{ fontFamily:F.m, fontSize:8, color:D.sub, letterSpacing:1, marginBottom:1 }}>TON RANG</div>
<div style={{ fontFamily:F.b, fontWeight:800, fontSize:36, color:palier.rang.couleur, lineHeight:1 }}>#{userRang||'—'}</div>
</div>
<div style={{ textAlign:'right' }}>
<div style={{ fontFamily:F.b, fontWeight:800, fontSize:24, color:'rgba(255,255,255,.82)', lineHeight:1 }}>{xpUser>=1000?(xpUser/1000).toFixed(1)+'k':xpUser}</div>
<div style={{ fontFamily:F.m, fontSize:8, color:D.sub, letterSpacing:1 }}>XP</div>
</div>
</div>
<BarXP xp={xpUser} AC={AC}/>
</Card>
<div style={{ padding:'0 0 11px' }}>
{tousJ.map(j => {
const top3 = j.rang <= 3;
const rc: Record<number,string> = {1:'#FFD700',2:'#C0C0C0',3:'#CD7F32'};
return (
<div key={j.id} style={{ background:j.estUser?`${AC}07`:D.card, border:`1px solid ${j.estUser?AC+'28':top3?rc[j.rang]+'22':D.border}`, borderRadius:12, padding:'8px 10px', marginBottom:5, display:'flex', alignItems:'center', gap:8 }}>
<div style={{ width:21, textAlign:'center', flexShrink:0 }}>
{top3 ? <span style={{ fontSize:14 }}>{j.rang===1?'👑':j.rang===2?'🥈':'🥉'}</span> : <div style={{ fontFamily:F.m, fontSize:9, color:j.estUser?AC:D.sub }}>#{j.rang}</div>}
</div>
<div style={{ width:30, height:30, borderRadius:8, background:j.estUser?`${AC}18`:'rgba(255,255,255,.04)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:15 }}>{j.avatar}</div>
<div style={{ flex:1, minWidth:0 }}>
<div style={{ display:'flex', alignItems:'center', gap:4, marginBottom:1 }}>
<div style={{ fontWeight:600, fontSize:12, fontFamily:F.b, color:j.estUser?AC:'rgba(255,255,255,.78)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{j.nom} {j.flag}</div>
{j.estUser && <div style={{ background:AC, color:'#000', fontSize:7, fontFamily:F.m, fontWeight:700, borderRadius:3, padding:'1px 4px', flexShrink:0 }}>TOI</div>}
</div>
<div style={{ fontFamily:F.m, fontSize:8, color:j.palier.rang.couleur }}>{j.palier.label}</div>
</div>
<div style={{ textAlign:'right', flexShrink:0 }}>
<div style={{ fontFamily:F.b, fontWeight:700, fontSize:15, color:top3?rc[j.rang]:j.estUser?AC:'rgba(255,255,255,.65)', lineHeight:1 }}>{j.xp>=1000?(j.xp/1000).toFixed(1)+'k':j.xp}</div>
<div style={{ fontFamily:F.m, fontSize:7, color:D.sub }}>XP</div>
</div>
</div>
);
})}
</div>
</div>
</div>
);
}

// ─── PROFIL ───────────────────────────────────────────────
export function VueProfil({ profile, xpUser, setXpUser, logs, AC, grad }: any) {
const [xpFloat, setXpFloat] = useState<number|null>(null);
const palier = getPalier(xpUser);
const serieJours = getStreak(logs);
const unlocked = getUnlocked(logs, serieJours);
const totalSeances = new Set(Object.values(logs).flat().map((x:any)=>x.sid||x.date)).size;
const simuler = () => { const xp=120; setXpUser((p:number)=>{ const n=p+xp; localStorage.setItem('surge_xp',JSON.stringify(n)); return n; }); setXpFloat(xp); setTimeout(()=>setXpFloat(null),1800); };
const gL: Record<string,string> = { mass:'Prise de masse', cut:'Sèche', force:'Force pure', fit:'Remise en forme', glute:'Fessiers', tone:'Tonicité', teen:'Programme ado' };

return (
<div style={{ background:D.bg, minHeight:'100vh', color:D.text, maxWidth:430, margin:'0 auto', paddingBottom:90 }}>
{xpFloat && <div className="xp-pop" style={{ top:'18%' }}>+{xpFloat} XP ⚡</div>}
<div style={{ padding:'48px 16px 16px' }}>
<div style={{ display:'flex', gap:12, alignItems:'center', marginBottom:12 }}>
<div style={{ position:'relative' }}>
<div style={{ width:60, height:60, borderRadius:18, background:`linear-gradient(${palier.rang.grad})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, border:`2px solid ${palier.rang.couleur}35` }}>⚡</div>
<div style={{ position:'absolute', bottom:-4, right:-4 }}><BadgeDiv xp={xpUser} size="sm"/></div>
</div>
<div style={{ flex:1 }}>
<div style={{ fontFamily:F.b, fontWeight:800, fontSize:28, letterSpacing:-.5, lineHeight:1 }}>{profile.firstName||'Alex'}</div>
<div style={{ fontFamily:F.m, fontSize:9, color:palier.rang.couleur, letterSpacing:1, marginTop:3, fontWeight:700 }}>{palier.label}</div>
</div>
</div>
<Card style={{ padding:'12px 14px', border:`1px solid ${palier.rang.couleur}18`, marginBottom:8 }}>
<div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
<div>
<div style={{ fontFamily:F.m, fontSize:8, color:D.sub, letterSpacing:1, marginBottom:2 }}>XP TOTAL</div>
<div style={{ fontFamily:F.b, fontWeight:800, fontSize:30, color:AC, lineHeight:1 }}>{xpUser.toLocaleString('fr-FR')}</div>
</div>
<BadgeDiv xp={xpUser} size="md"/>
</div>
<BarXP xp={xpUser} AC={AC}/>
</Card>
<div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6, marginBottom:8 }}>
{[{v:totalSeances,l:'Séances'},{v:serieJours+'🔥',l:'Streak'},{v:unlocked.length,l:'Succès'}].map((s,i) => (
<Card key={i} style={{ padding:'8px 6px', textAlign:'center' }}>
<div style={{ fontFamily:F.b, fontWeight:700, fontSize:18, color:'rgba(255,255,255,.88)', lineHeight:1 }}>{s.v}</div>
<div style={{ fontFamily:F.m, fontSize:7, color:D.sub, marginTop:2 }}>{s.l.toUpperCase()}</div>
</Card>
))}
</div>
<Card style={{ padding:'12px 14px', marginBottom:8 }}>
<div style={{ fontFamily:F.m, fontSize:8, color:D.sub, letterSpacing:1, marginBottom:8 }}>MON PROFIL</div>
{[{l:'Objectif',v:gL[profile.goal]||'—'},{l:'Niveau',v:profile.level||'—'},{l:'Environnement',v:profile.environment||'—'},{l:'Fréquence',v:`${profile.frequency||4}j / semaine`}].map((r,i) => (
<div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:i<3?`1px solid ${D.border}`:'none' }}>
<div style={{ fontFamily:F.b, fontSize:11, color:D.sub }}>{r.l}</div>
<div style={{ fontFamily:F.b, fontSize:11, fontWeight:600, color:'rgba(255,255,255,.78)' }}>{r.v}</div>
</div>
))}
</Card>
<button onClick={simuler} className="press" style={{ background:`${AC}0D`, border:`1px solid ${AC}18`, borderRadius:12, padding:'9px', color:AC, fontFamily:F.m, fontSize:9, cursor:'pointer', width:'100%', letterSpacing:1, fontWeight:700 }}>⚡ SIMULER UNE SÉANCE (+XP DÉMO)</button>
<div style={{ fontFamily:F.m, fontSize:8, color:D.sub, letterSpacing:1.5, marginBottom:9, marginTop:16 }}>FEUILLE DE ROUTE — 40 DIVISIONS</div>
{RANGS.map(rang => {
const xpMin = rang.xpDiv[0];
const atteint = xpUser >= xpMin;
const palierActuel = getPalier(xpUser);
const ROMS_L = ["I","II","III","IV","V"];
return (
<Card key={rang.id} style={{ padding:'10px 12px', marginBottom:6, opacity:atteint?1:0.38, border:`1px solid ${atteint?rang.couleur+'18':D.border}` }}>
<div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
<div style={{ width:24, height:24, borderRadius:7, background:`linear-gradient(${rang.grad})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12 }}>{rang.emoji}</div>
<div style={{ fontFamily:F.b, fontWeight:700, fontSize:14, color:rang.couleur }}>{rang.nom}</div>
<div style={{ marginLeft:'auto', fontFamily:F.m, fontSize:8, color:D.sub }}>{xpMin.toLocaleString('fr-FR')}+ XP</div>
</div>
<div style={{ display:'flex', gap:3 }}>
{ROMS_L.map((r,i) => {
const divXpMin = i===0 ? xpMin : xpMin + rang.xpDiv.slice(0,i).reduce((a,b)=>a+b,0);
const att = xpUser >= divXpMin;
const enc = palierActuel.rang.id===rang.id && palierActuel.division===i+1;
return (
<div key={i} style={{ flex:1, textAlign:'center' }}>
<div style={{ height:3, borderRadius:2, background:att?rang.couleur:'rgba(255,255,255,.05)', marginBottom:2 }}/>
<div style={{ fontFamily:F.m, fontSize:7, color:enc?rang.couleur:att?D.sub:D.sub2 }}>{r}{enc?' ◀':''}</div>
</div>
);
})}
</div>
</Card>
);
})}
</div>
</div>
);
}
