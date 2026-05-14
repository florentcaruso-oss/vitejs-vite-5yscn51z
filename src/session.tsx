import { useState, useEffect } from 'react';
import { D, F, EX } from './data';
import { calc1RM, calculXP, getStreak, GOAL_PARAMS } from './logic';
import { Card, Btn, Chip } from './components';

function InfoModal({ ex, AC, onClose }: any) {
return (
<div className="modal-over" style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.9)', display:'flex', alignItems:'flex-end', zIndex:300 }} onClick={onClose}>
<div className="modal-sheet" style={{ background:D.card2, borderRadius:'20px 20px 0 0', padding:'24px 18px 40px', width:'100%', maxWidth:430, margin:'0 auto' }} onClick={e => e.stopPropagation()}>
<div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
<div style={{ width:48, height:48, borderRadius:14, background:`${AC}15`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24 }}>{ex.emoji}</div>
<div>
<div style={{ fontFamily:F.b, fontWeight:700, fontSize:18, color:'#fff' }}>{ex.name}</div>
<div style={{ fontFamily:F.m, fontSize:10, color:AC, marginTop:2 }}>{ex.muscle}</div>
</div>
</div>
<div style={{ background:'rgba(255,255,255,.04)', borderRadius:12, padding:'12px 14px', marginBottom:12 }}>
<div style={{ fontFamily:F.m, fontSize:9, color:AC, letterSpacing:1, marginBottom:6 }}>MUSCLES CIBLÉS</div>
<div style={{ fontFamily:F.b, fontSize:12, color:'rgba(255,255,255,.8)', lineHeight:1.6 }}>{ex.muscles_detail}</div>
</div>
<div style={{ background:'rgba(255,255,255,.04)', borderRadius:12, padding:'12px 14px', marginBottom:12 }}>
<div style={{ fontFamily:F.m, fontSize:9, color:D.orange, letterSpacing:1, marginBottom:6 }}>ERREURS COMMUNES</div>
{(ex.erreurs||[]).map((e:string, i:number) => (
<div key={i} style={{ display:'flex', gap:8, marginBottom:4, fontSize:12, color:'rgba(255,255,255,.7)', fontFamily:F.b }}>
<span style={{ color:D.red, fontWeight:700, flexShrink:0 }}>⚠</span>{e}
</div>
))}
</div>
<div style={{ background:`${AC}0A`, borderRadius:12, padding:'12px 14px', marginBottom:16 }}>
<div style={{ fontFamily:F.m, fontSize:9, color:AC, letterSpacing:1, marginBottom:6 }}>CONSEIL DU COACH</div>
<div style={{ fontFamily:F.b, fontSize:12, color:'rgba(255,255,255,.8)', lineHeight:1.7 }}>💡 {ex.conseil}</div>
</div>
<Btn full variant="secondary" onClick={onClose}>Fermer</Btn>
</div>
</div>
);
}

function SwapModal({ ex, sessionExos, exIdx, profile, setSessionExos, toast_, AC, onClose }: any) {
const alternatives = (ex.alternatives || []).filter((id:string) => EX[id] && !sessionExos.includes(id));
return (
<div className="modal-over" style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.9)', display:'flex', alignItems:'flex-end', zIndex:300 }} onClick={onClose}>
<div className="modal-sheet" style={{ background:D.card2, borderRadius:'20px 20px 0 0', padding:'24px 18px 40px', width:'100%', maxWidth:430, margin:'0 auto' }} onClick={e => e.stopPropagation()}>
<div style={{ fontFamily:F.b, fontWeight:700, fontSize:20, marginBottom:4 }}>Changer d'exercice</div>
<div style={{ fontFamily:F.b, fontSize:12, color:D.sub, marginBottom:16, lineHeight:1.6 }}>
Remplacer <strong style={{ color:AC }}>{ex.name}</strong> par :
</div>
{alternatives.length > 0 ? alternatives.map((id:string) => {
const alt = EX[id];
return (
<div key={id} onClick={() => {
const ne = [...sessionExos]; ne[exIdx] = id;
setSessionExos(ne); toast_('✅ Exercice remplacé !'); onClose();
}} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px', background:'rgba(255,255,255,.04)', border:`1px solid ${AC}25`, borderRadius:14, marginBottom:8, cursor:'pointer' }}>
<div style={{ width:42, height:42, borderRadius:11, background:`${AC}12`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>{alt.emoji}</div>
<div style={{ flex:1 }}>
<div style={{ fontWeight:600, fontSize:13, fontFamily:F.b, color:'rgba(255,255,255,.85)' }}>{alt.name}</div>
<div style={{ fontSize:11, color:D.sub, fontFamily:F.b, marginTop:2 }}>{alt.muscle}</div>
</div>
<div style={{ color:AC, fontSize:18, fontWeight:700 }}>›</div>
</div>
);
}) : (
<div style={{ textAlign:'center', padding:'20px 0', color:D.sub, fontFamily:F.b }}>
<div style={{ fontSize:32, marginBottom:8, opacity:.3 }}>🔄</div>
Pas d'alternative disponible
</div>
)}
<Btn full variant="ghost" onClick={onClose} style={{ marginTop:8 }}>Annuler</Btn>
</div>
</div>
);
}

function AddAbsModal({ sessionExos, setSessionExos, toast_, AC, onClose }: any) {
const absExos = ['plank','crunch','legRaise','russianTwist','sidePlank','mountainClimber'];
const available = absExos.filter(id => !sessionExos.includes(id));
return (
<div className="modal-over" style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.9)', display:'flex', alignItems:'flex-end', zIndex:300 }} onClick={onClose}>
<div className="modal-sheet" style={{ background:D.card2, borderRadius:'20px 20px 0 0', padding:'24px 18px 40px', width:'100%', maxWidth:430, margin:'0 auto' }} onClick={e => e.stopPropagation()}>
<div style={{ fontFamily:F.b, fontWeight:700, fontSize:20, marginBottom:4 }}>💪 Bonus Abdos</div>
<div style={{ fontFamily:F.b, fontSize:12, color:D.sub, marginBottom:16 }}>Ajoute un exercice d'abdos à ta séance</div>
{available.map((id:string) => {
const ex = EX[id];
return (
<div key={id} onClick={() => {
setSessionExos([...sessionExos, id]);
toast_('✅ Abdos ajoutés !'); onClose();
}} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px', background:'rgba(255,255,255,.04)', border:`1px solid ${AC}25`, borderRadius:14, marginBottom:8, cursor:'pointer' }}>
<div style={{ width:42, height:42, borderRadius:11, background:`${AC}12`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>{ex.emoji}</div>
<div style={{ flex:1 }}>
<div style={{ fontWeight:600, fontSize:13, fontFamily:F.b, color:'rgba(255,255,255,.85)' }}>{ex.name}</div>
<div style={{ fontSize:11, color:D.sub, fontFamily:F.b, marginTop:2 }}>{ex.reps}</div>
</div>
<div style={{ color:AC, fontSize:18 }}>+</div>
</div>
);
})}
<Btn full variant="ghost" onClick={onClose} style={{ marginTop:8 }}>Annuler</Btn>
</div>
</div>
);
}

export function SessionView({ profile, logs, setLogs, activeSession, sessionExos, setSessionExos, cycle, cycleIdx, setCycleIdx, setView, setAS, toast_, AC, grad, setXpUser }: any) {
const [exIdx, setExIdx] = useState(0);
const [sesSeries, setSesSeries] = useState<Record<string,any[]>>({});
const [curW, setCurW] = useState('');
const [curR, setCurR] = useState('');
const [sesStart] = useState(Date.now());
const [elapsed, setElapsed] = useState(0);
const [restSec, setRestSec] = useState(0);
const [restOn, setRestOn] = useState(false);
const [showInfo, setShowInfo] = useState(false);
const [showSwap, setShowSwap] = useState(false);
const [showAbs, setShowAbs] = useState(false);
const [showWarmup, setShowWarmup] = useState(true);
const [editingIdx, setEditingIdx] = useState<number|null>(null);
const [editW, setEditW] = useState('');
const [editR, setEditR] = useState('');
const [summary, setSummary] = useState<any>(null);
const [aiText, setAiText] = useState('');
const [loadingAI, setLoadingAI] = useState(false);
const [recordAnim, setRecordAnim] = useState(false);

useEffect(() => {
const iv = setInterval(() => setElapsed(Math.floor((Date.now()-sesStart)/1000)), 1000);
return () => clearInterval(iv);
}, [sesStart]);

useEffect(() => {
if (!restOn || restSec <= 0) { if (restSec <= 0) setRestOn(false); return; }
const t = setTimeout(() => setRestSec(x => x-1), 1000);
return () => clearTimeout(t);
}, [restOn, restSec]);

const fmt = (x: number) => `${Math.floor(x/60)}:${(x%60).toString().padStart(2,'0')}`;
const exos = sessionExos.map((id: string) => ({ id, ...EX[id] })).filter((e: any) => e.name);
const ex = exIdx < exos.length ? exos[exIdx] : null;
const mySeries = ex ? (sesSeries[ex.id] || []) : [];
const goalParams = GOAL_PARAMS[profile.goal] || GOAL_PARAMS.mass;
const targetSets = ex?.sets || goalParams.sets;
const targetRest = ex?.rest || goalParams.rest;
const targetReps = ex?.reps || goalParams.reps;
const done = mySeries.length >= targetSets;
const isBW = ex?.bodyweight || false;
const bestOf = (id: string) => { const x = logs[id] || []; return x.length ? Math.max(...x.map((y:any) => y.maxWeight || 0)) : null; };

const addSerie = () => {
const w = isBW && !curW ? 0 : parseFloat(curW);
if (!curR) return toast_('⚠️ Entre le nombre de reps');
if (!isBW && isNaN(w)) return toast_('⚠️ Entre le poids');
const s = { weight: isNaN(w)?0:w, reps: parseInt(curR), bw: isBW && !curW };
const newMy = [...mySeries, s];
setSesSeries(p => ({ ...p, [ex.id]: newMy }));
const best = bestOf(ex.id);
if (best && (isNaN(w)?0:w) > best) {
setRecordAnim(true);
setTimeout(() => setRecordAnim(false), 2000);
toast_('🏆 NOUVEAU RECORD !');
}
setCurW(''); setCurR('');
if (newMy.length >= targetSets) toast_('✅ Exercice terminé !');
else { setRestSec(targetRest); setRestOn(true); }
};

const nextEx = () => {
if (exIdx < exos.length - 1) {
setExIdx(i => i+1); setRestSec(0); setRestOn(false);
setCurW(''); setCurR(''); setEditingIdx(null);
} else finishSession();
};

const finishSession = async () => {
const date = new Date().toISOString().slice(0,10);
const sid = 's_' + Date.now();
const nl = { ...logs };
let nouveauxRecords = 0;
const seriesCount = Object.values(sesSeries).reduce((a, x) => a + x.length, 0);
Object.entries(sesSeries).forEach(([id, series]) => {
if (series.length > 0) {
const maxW = Math.max(...series.map((x:any) => x.weight || 0));
if (maxW > (bestOf(id) || 0)) nouveauxRecords++;
nl[id] = [...(nl[id] || []), { date, series, maxWeight: maxW, sid, dur: elapsed }];
}
});
setLogs(nl);
setCycleIdx((i: number) => (i+1) % cycle.length);
const serieJours = getStreak(nl);
const xpGain = calculXP({ duree_sec: elapsed, exercices: Object.keys(sesSeries).length, series: seriesCount, serie_jours: serieJours, nouveaux_records: nouveauxRecords, premier_jour: true });
setXpUser((p: number) => { const n = p + xpGain; localStorage.setItem('surge_xp', JSON.stringify(n)); return n; });
const vol = Math.round(Object.values(sesSeries).flat().reduce((a:number, s:any) => a + (s.weight||0)*(s.reps||0), 0));
setSummary({ dur: elapsed, series: seriesCount, exercices: Object.keys(sesSeries).length, records: nouveauxRecords, xp: xpGain, vol });
setLoadingAI(true);
try {
const rl = Object.entries(sesSeries).map(([id, series]:any) => {
const ex = EX[id]; if (!ex) return null;
const maxW = Math.max(...series.map((s:any) => s.weight||0));
return `${ex.name}: ${series.length} séries, max ${maxW}kg`;
}).filter(Boolean).join(', ');
const res = await fetch('/api/chat', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:250, messages:[{ role:'user', content:`Tu es SURGE Coach. Analyse en 2-3 phrases motivantes en français. ${profile.firstName}, objectif: ${profile.goal||'masse'}. ${Math.floor(elapsed/60)} min, ${seriesCount} séries, ${nouveauxRecords} records. Exercices: ${rl}. 1 conseil concret.` }] }) });
const data = await res.json();
setAiText(data.content?.[0]?.text || '🚀 Coach IA bientôt disponible !');
} catch(e) {
setAiText('🚀 Coach IA bientôt disponible !');
} finally { setLoadingAI(false); }
};

if (summary) return (
<div style={{ background:D.bg, minHeight:'100vh', color:D.text, maxWidth:430, margin:'0 auto', padding:'36px 16px 80px' }}>
<div style={{ textAlign:'center', marginBottom:20 }}>
<div style={{ fontSize:60, marginBottom:8, animation:'popIn .5s cubic-bezier(.22,.68,0,1.2) both' }}>🎉</div>
<div style={{ fontFamily:F.b, fontWeight:800, fontSize:28, marginBottom:3 }}>Séance terminée !</div>
<div style={{ color:AC, fontSize:13, fontFamily:F.m, fontWeight:700 }}>+{summary.xp} XP</div>
</div>
<div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:10 }}>
{[{v:fmt(summary.dur),l:'Durée',i:'⏱'},{v:summary.series,l:'Séries',i:'💪'},{v:Math.round(summary.vol/100)/10+'T',l:'Volume',i:'🏋️'},{v:summary.records,l:'Records',i:'🏆'}].map((s,i) => (
<Card key={i} style={{ padding:'11px 9px', textAlign:'center' }}>
<div style={{ fontSize:17, marginBottom:3 }}>{s.i}</div>
<div style={{ fontFamily:F.b, fontWeight:700, fontSize:21, color:AC }}>{s.v}</div>
<div style={{ fontFamily:F.m, fontSize:8, color:D.sub, marginTop:2 }}>{s.l.toUpperCase()}</div>
</Card>
))}
</div>
<Card style={{ padding:'12px', marginBottom:12 }}>
<div style={{ display:'flex', gap:9, alignItems:'flex-start' }}>
<div style={{ width:32, height:32, borderRadius:9, background:`linear-gradient(${grad})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:15, flexShrink:0 }}>🤖</div>
<div style={{ flex:1 }}>
<div style={{ fontFamily:F.m, fontSize:8, color:AC, letterSpacing:.8, marginBottom:4 }}>ANALYSE</div>
{loadingAI
? <div style={{ display:'flex', gap:3 }}>{[0,1,2].map(i => <div key={i} style={{ width:6, height:6, borderRadius:'50%', background:AC, animation:`pulse 1.2s ${i*.25}s infinite` }}/>)}</div>
: <div style={{ fontSize:12, color:'rgba(255,255,255,.75)', fontFamily:F.b, lineHeight:1.7 }}>{aiText}</div>
}
</div>
</div>
</Card>
<Btn full variant="grad" grad={grad} onClick={() => { setView('home'); setAS(null); }}>Retour à l'accueil</Btn>
</div>
);

const warmupMap: Record<string,any[]> = {
chest:[{name:'Rotations épaules',emoji:'🔄',desc:'30 sec'},{name:'Pompes légères',emoji:'✊',desc:'×10 lentes'}],
back:[{name:'Chat/vache',emoji:'🐱',desc:'×10'},{name:'Rotations épaules',emoji:'🔄',desc:'30 sec'}],
legs:[{name:'Squats légers',emoji:'🦵',desc:'×10'},{name:'Fentes',emoji:'⚔️',desc:'×8/côté'},{name:'Pont fessier',emoji:'🍑',desc:'×15'}],
shoulders:[{name:'Cercles épaules',emoji:'🔄',desc:'30 sec'},{name:'Élév. légères',emoji:'🕊️',desc:'×15'}],
biceps:[{name:'Cercles poignets',emoji:'🔄',desc:'30 sec'}],
triceps:[{name:'Étirement triceps',emoji:'💪',desc:'20 sec/côté'}],
};
const wGroups = [...new Set(sessionExos.map((id:string) => EX[id]?.muscleGroup).filter(Boolean))];
const warmupExos = (wGroups.some((g:any) => g==='legs') ? warmupMap.legs : warmupMap[wGroups[0] as string]) || warmupMap.chest;

if (showWarmup) return (
<div style={{ background:D.bg, minHeight:'100vh', color:D.text, maxWidth:430, margin:'0 auto', padding:'46px 16px 120px' }}>
<button style={{ background:'none', border:'none', color:D.sub, fontSize:12, cursor:'pointer', fontFamily:F.b, marginBottom:20 }} onClick={() => { setView('home'); setAS(null); }}>✕ Annuler</button>
<div style={{ textAlign:'center', marginBottom:20 }}>
<div style={{ fontSize:44, marginBottom:7 }}>🔥</div>
<div style={{ fontFamily:F.b, fontWeight:700, fontSize:24, marginBottom:3 }}>Échauffement</div>
<div style={{ color:D.sub, fontSize:12, fontFamily:F.b, lineHeight:1.6 }}>5 min. Prévient 90% des blessures.</div>
</div>
{warmupExos.map((w:any, i:number) => (
<Card key={i} style={{ padding:'11px 13px', marginBottom:8, display:'flex', gap:9, alignItems:'center' }}>
<div style={{ width:38, height:38, borderRadius:10, background:`${AC}12`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>{w.emoji}</div>
<div style={{ flex:1 }}>
<div style={{ fontWeight:600, fontSize:12, fontFamily:F.b, color:'rgba(255,255,255,.85)' }}>{w.name}</div>
<div style={{ fontSize:10, color:D.sub, marginTop:1, fontFamily:F.b }}>{w.desc}</div>
</div>
</Card>
))}
<div style={{ position:'fixed', bottom:0, left:'50%', transform:'translateX(-50%)', width:'100%', maxWidth:430, background:'rgba(5,5,7,.97)', backdropFilter:'blur(20px)', borderTop:'1px solid rgba(255,255,255,.05)', padding:'11px 16px 28px' }}>
<div style={{ display:'flex', gap:8 }}>
<Btn variant="ghost" onClick={() => setShowWarmup(false)} style={{ flex:1 }}>Passer</Btn>
<Btn variant="grad" grad={grad} onClick={() => setShowWarmup(false)} style={{ flex:2 }}>C'est fait 💪</Btn>
</div>
</div>
</div>
);

if (!ex) return null;

return (
<div style={{ background:D.bg, minHeight:'100vh', color:D.text, maxWidth:430, margin:'0 auto', padding:'12px 12px 48px' }}>
{showInfo && <InfoModal ex={ex} AC={AC} onClose={() => setShowInfo(false)}/>}
{showSwap && <SwapModal ex={ex} sessionExos={sessionExos} exIdx={exIdx} profile={profile} setSessionExos={setSessionExos} toast_={toast_} AC={AC} onClose={() => setShowSwap(false)}/>}
{showAbs && <AddAbsModal sessionExos={sessionExos} setSessionExos={setSessionExos} toast_={toast_} AC={AC} onClose={() => setShowAbs(false)}/>}

{recordAnim && (
<div style={{ position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:400, pointerEvents:'none' }}>
<div style={{ textAlign:'center', animation:'popIn .4s cubic-bezier(.22,.68,0,1.2) both' }}>
<div style={{ fontSize:80 }}>🏆</div>
<div style={{ fontFamily:F.d, fontSize:36, fontWeight:800, color:'#FFD700', textShadow:'0 0 30px #FFD70080' }}>RECORD !</div>
</div>
</div>
)}

{editingIdx !== null && (
<div className="modal-over" style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.85)', display:'flex', alignItems:'flex-end', zIndex:200 }} onClick={() => setEditingIdx(null)}>
<div className="modal-sheet" style={{ background:D.card2, borderRadius:'18px 18px 0 0', padding:'20px 16px 36px', width:'100%', maxWidth:430, margin:'0 auto' }} onClick={e => e.stopPropagation()}>
<div style={{ fontFamily:F.b, fontWeight:700, fontSize:18, marginBottom:12 }}>Modifier série {editingIdx+1}</div>
<div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 }}>
<div>
<div style={{ fontFamily:F.m, fontSize:8, color:D.sub, letterSpacing:1, marginBottom:5 }}>{isBW?'LEST':'POIDS (kg)'}</div>
<input style={{ width:'100%', background:'rgba(255,255,255,.04)', border:'1.5px solid rgba(255,255,255,.07)', borderRadius:11, padding:'10px', textAlign:'center', fontSize:21, fontWeight:700, color:'#fff', outline:'none', fontFamily:F.b }} type="number" inputMode="decimal" value={editW} onChange={e => setEditW(e.target.value)}/>
</div>
<div>
<div style={{ fontFamily:F.m, fontSize:8, color:D.sub, letterSpacing:1, marginBottom:5 }}>REPS</div>
<input style={{ width:'100%', background:'rgba(255,255,255,.04)', border:'1.5px solid rgba(255,255,255,.07)', borderRadius:11, padding:'10px', textAlign:'center', fontSize:21, fontWeight:700, color:'#fff', outline:'none', fontFamily:F.b }} type="number" inputMode="numeric" value={editR} onChange={e => setEditR(e.target.value)}/>
</div>
</div>
<div style={{ display:'flex', gap:8 }}>
<Btn variant="danger" onClick={() => { const upd = mySeries.filter((_:any,i:number)=>i!==editingIdx); setSesSeries(p=>({...p,[ex.id]:upd})); setEditingIdx(null); toast_('🗑 Supprimée'); }} style={{ flex:1 }}>🗑</Btn>
<Btn AC={AC} onClick={() => { if (!editR) return; const w = isBW&&!editW?0:parseFloat(editW); const upd=[...mySeries]; upd[editingIdx]={...upd[editingIdx],weight:isNaN(w)?0:w,reps:parseInt(editR)}; setSesSeries(p=>({...p,[ex.id]:upd})); setEditingIdx(null); toast_('✅ Modifiée'); }} style={{ flex:2 }}>✓ Sauvegarder</Btn>
</div>
</div>
</div>
)}

<div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
<button style={{ background:'none', border:'none', color:D.sub, fontSize:12, cursor:'pointer', fontFamily:F.b }} onClick={() => { setView('home'); setAS(null); }}>✕ Quitter</button>
<div style={{ display:'flex', alignItems:'center', gap:8 }}>
<div style={{ background:`${AC}12`, border:`1px solid ${AC}18`, borderRadius:8, padding:'3px 10px', display:'flex', gap:4, alignItems:'center' }}>
<span style={{ fontSize:10 }}>⏱</span>
<span style={{ fontFamily:F.m, fontWeight:700, color:AC, fontSize:11 }}>{fmt(elapsed)}</span>
</div>
<span style={{ fontFamily:F.m, color:D.sub, fontSize:10 }}>{exIdx+1}/{exos.length}</span>
</div>
</div>

<div className="scroll-x" style={{ display:'flex', gap:5, marginBottom:10, paddingBottom:2 }}>
{exos.map((e:any, i:number) => {
const isDone = sesSeries[e.id] && sesSeries[e.id].length >= e.sets;
const isCur = i === exIdx;
return (
<button key={i} onClick={() => { setExIdx(i); setRestSec(0); setRestOn(false); setCurW(''); setCurR(''); setEditingIdx(null); }} style={{ flexShrink:0, background:isDone?'rgba(34,197,94,.1)':isCur?`${AC}15`:'rgba(255,255,255,.03)', border:`1.5px solid ${isDone?'#22C55E50':isCur?AC:'rgba(255,255,255,.05)'}`, borderRadius:10, padding:'5px 8px', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:2, minWidth:42 }}>
<span style={{ fontSize:15 }}>{e.emoji}</span>
<span style={{ fontFamily:F.m, fontSize:7, color:isDone?'#22C55E':isCur?AC:D.sub, fontWeight:700 }}>{isDone?'✓':i+1}</span>
</button>
);
})}
</div>

{restOn && restSec > 0 && (
<div style={{ background:`linear-gradient(${grad})`, borderRadius:14, padding:'11px 14px', marginBottom:10, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
<div>
<div style={{ fontFamily:F.m, fontSize:8, color:'rgba(0,0,0,.45)', letterSpacing:1, marginBottom:1 }}>REPOS</div>
<div style={{ fontFamily:F.b, fontWeight:800, fontSize:34, color:'rgba(0,0,0,.8)', lineHeight:1 }}>{fmt(restSec)}</div>
</div>
<button onClick={() => { setRestSec(0); setRestOn(false); }} style={{ background:'rgba(0,0,0,.18)', border:'none', color:'rgba(0,0,0,.65)', borderRadius:8, padding:'6px 11px', fontSize:11, fontWeight:600, cursor:'pointer', fontFamily:F.b }}>Passer ⏭</button>
</div>
)}

<Card style={{ padding:14, marginBottom:9 }} glow AC={AC}>
<div style={{ display:'flex', gap:10, marginBottom:10 }}>
<div style={{ width:54, height:54, borderRadius:13, background:`${AC}12`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, flexShrink:0 }}>{ex.emoji}</div>
<div style={{ flex:1 }}>
<div style={{ fontFamily:F.b, fontWeight:700, fontSize:16, marginBottom:2, color:'rgba(255,255,255,.9)' }}>{ex.name}</div>
<div style={{ fontSize:10, color:D.sub, marginBottom:6, fontFamily:F.b }}>{ex.muscle}</div>
<div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
<Chip active color={AC} style={{ fontSize:9, padding:'3px 8px' }} onClick={() => {}}>{targetSets} séries</Chip>
<Chip style={{ fontSize:9, padding:'3px 8px' }} onClick={() => {}}>{targetReps} reps</Chip>
<Chip style={{ fontSize:9, padding:'3px 8px' }} onClick={() => {}}>Repos {targetRest}s</Chip>
</div>
</div>
</div>

<div style={{ display:'flex', gap:5, marginBottom:9 }}>
{[{l:'Descente',v:ex.tempo.d,c:'#5B8DEE'},{l:'Pause',v:ex.tempo.h,c:D.orange},{l:'Montée',v:ex.tempo.u,c:D.green}].map((t,i) => (
<div key={i} style={{ flex:1, background:`${t.c}0D`, border:`1px solid ${t.c}18`, borderRadius:10, padding:'7px 4px', textAlign:'center' }}>
<div style={{ fontFamily:F.b, fontWeight:700, fontSize:17, color:t.c, lineHeight:1 }}>{t.v}s</div>
<div style={{ fontSize:8, color:D.sub, fontFamily:F.b, marginTop:2 }}>{t.l}</div>
</div>
))}
</div>

<div style={{ background:'rgba(255,255,255,.025)', borderRadius:10, padding:'8px 10px', marginBottom:9 }}>
<div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:5 }}>
<div style={{ fontFamily:F.m, fontSize:7, color:D.sub, letterSpacing:1 }}>POINTS CLÉS</div>
<button onClick={() => setShowInfo(true)} style={{ background:`${AC}15`, border:`1px solid ${AC}30`, borderRadius:20, padding:'2px 10px', cursor:'pointer', fontFamily:F.m, fontSize:9, color:AC, fontWeight:700 }}>ⓘ Plus d'infos</button>
</div>
{ex.tips.map((t:string, i:number) => (
<div key={i} style={{ display:'flex', gap:6, marginBottom:3, fontSize:11, color:'rgba(255,255,255,.65)', fontFamily:F.b }}>
<span style={{ color:AC, fontWeight:700, flexShrink:0 }}>·</span>{t}
</div>
))}
</div>

<div style={{ display:'flex', gap:6 }}>
<button onClick={() => setShowSwap(true)} style={{ flex:1, background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.07)', borderRadius:10, padding:'8px', cursor:'pointer', fontFamily:F.b, fontSize:11, color:D.sub }}>🔄 Changer</button>
<button onClick={() => setShowAbs(true)} style={{ flex:1, background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.07)', borderRadius:10, padding:'8px', cursor:'pointer', fontFamily:F.b, fontSize:11, color:D.sub }}>+ Abdos bonus</button>
</div>
</Card>

<div style={{ fontFamily:F.m, fontSize:8, color:D.sub, letterSpacing:1, marginBottom:6 }}>
{targetSets} SÉRIES · {targetReps} REPS
{mySeries.length > 0 && <span style={{ color:D.sub2, marginLeft:6 }}>· tape pour modifier</span>}
</div>

<div style={{ display:'grid', gridTemplateColumns:`repeat(${Math.min(Math.max(targetSets, mySeries.length), 5)},1fr)`, gap:6, marginBottom:10 }}>
{Array.from({ length: Math.max(targetSets, mySeries.length) }).map((_, i) => {
const x = mySeries[i];
const isCur = i === mySeries.length;
return (
<div key={i} onClick={x ? () => { setEditingIdx(i); setEditW(x.bw?'':String(x.weight)); setEditR(String(x.reps)); } : undefined} style={{ background:x?`${AC}0F`:isCur?`${AC}05`:'rgba(255,255,255,.025)', border:`1.5px solid ${x?AC:isCur?AC+'35':'rgba(255,255,255,.05)'}`, borderRadius:12, padding:'8px 3px', textAlign:'center', cursor:x?'pointer':'default', transition:'all .2s' }}>
<div style={{ fontFamily:F.m, fontSize:7, color:D.sub, letterSpacing:.7, marginBottom:3 }}>SÉR {i+1}</div>
{x ? <>
<div style={{ fontFamily:F.b, fontWeight:700, fontSize:15, color:AC, lineHeight:1 }}>{x.bw?'PdC':x.weight+'kg'}</div>
<div style={{ fontSize:9, color:D.sub, fontFamily:F.b, marginTop:1 }}>{x.reps} reps</div>
<div style={{ fontFamily:F.m, fontSize:7, color:`${AC}70`, marginTop:1 }}>✏️</div>
</> : <div style={{ color:isCur?AC+'55':'rgba(255,255,255,.08)', fontFamily:F.b, fontSize:15, fontWeight:700 }}>—</div>}
</div>
);
})}
</div>

{bestOf(ex.id) && (
<div style={{ background:'rgba(255,255,255,.025)', border:'1px solid rgba(255,255,255,.05)', borderRadius:10, padding:'7px 11px', display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:9 }}>
<span style={{ fontSize:11, color:D.sub, fontFamily:F.b }}>🏆 Ton record</span>
<div>
<span style={{ fontFamily:F.b, fontWeight:700, fontSize:17, color:AC }}>{bestOf(ex.id)}kg</span>
<span style={{ fontFamily:F.m, fontSize:8, color:D.sub, marginLeft:6 }}>1RM ≈ {calc1RM(bestOf(ex.id)!, 8)}kg</span>
</div>
</div>
)}

{!done ? (
<Card style={{ padding:14 }}>
<div style={{ fontFamily:F.m, fontSize:8, color:D.sub, letterSpacing:1, marginBottom:10 }}>SÉRIE {mySeries.length+1} / {targetSets}</div>
<div style={{ background:`${AC}07`, border:`1px solid ${AC}12`, borderRadius:10, padding:'8px 11px', marginBottom:10 }}>
<div style={{ fontFamily:F.m, fontSize:8, color:AC, letterSpacing:.8, marginBottom:2 }}>OBJECTIF</div>
<div style={{ fontFamily:F.b, fontSize:11, color:'rgba(255,255,255,.7)', lineHeight:1.5 }}>{goalParams.info}</div>
</div>
<div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:9, marginBottom:7 }}>
<div>
<div style={{ fontFamily:F.m, fontSize:8, color:D.sub, letterSpacing:1, marginBottom:4 }}>{isBW?'LEST (kg)':'POIDS (kg)'}</div>
<input style={{ width:'100%', background:'rgba(255,255,255,.04)', border:`1.5px solid ${curW?'rgba(255,255,255,.12)':'rgba(255,255,255,.05)'}`, borderRadius:10, padding:'11px', textAlign:'center', fontSize:25, fontWeight:700, color:'#fff', outline:'none', fontFamily:F.b }} type="number" inputMode="decimal" placeholder={isBW?'0':'—'} value={curW} onChange={e => setCurW(e.target.value)}/>
</div>
<div>
<div style={{ fontFamily:F.m, fontSize:8, color:D.sub, letterSpacing:1, marginBottom:4 }}>REPS</div>
<input style={{ width:'100%', background:'rgba(255,255,255,.04)', border:`1.5px solid ${curR?'rgba(255,255,255,.12)':'rgba(255,255,255,.05)'}`, borderRadius:10, padding:'11px', textAlign:'center', fontSize:25, fontWeight:700, color:'#fff', outline:'none', fontFamily:F.b }} type="number" inputMode="numeric" placeholder="—" value={curR} onChange={e => setCurR(e.target.value)}/>
</div>
</div>
{!isBW && curW && curR && (
<div style={{ textAlign:'center', marginBottom:7, color:D.sub, fontSize:11, fontFamily:F.b }}>
1RM estimé : <strong style={{ color:AC }}>{calc1RM(parseFloat(curW), parseInt(curR))}kg</strong>
</div>
)}
<Btn full AC={AC} onClick={addSerie} size="lg">✓ Valider la série</Btn>
</Card>
) : (
<div style={{ background:`${AC}0D`, border:`1px solid ${AC}18`, borderRadius:16, padding:'16px', textAlign:'center' }}>
<div style={{ fontSize:38, marginBottom:5 }}>✅</div>
<div style={{ fontFamily:F.b, fontWeight:700, fontSize:22, marginBottom:2 }}>Exercice terminé !</div>
<div style={{ color:D.sub, fontSize:12, marginBottom:12, fontFamily:F.b }}>
Max : <strong style={{ color:AC }}>{Math.max(...mySeries.map((x:any)=>x.weight||0),0)}kg</strong>
</div>
<Btn full variant="grad" grad={grad} onClick={nextEx} size="lg">
{exIdx < exos.length-1 ? 'Exercice suivant →' : 'Terminer 🎉'}
</Btn>
</div>
)}
</div>
);
}
