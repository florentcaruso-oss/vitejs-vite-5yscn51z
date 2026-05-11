import { useState, useEffect } from 'react';
import { D, F } from './data';
import { getPalier, getPalierSuiv, getPct } from './logic';

const ROMS = ["I","II","III","IV","V"];

export const GS = () => (
<style>{`
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{background:#050507;color:#fff;-webkit-font-smoothing:antialiased}
input,button,textarea,select{font-family:inherit}
::-webkit-scrollbar{width:2px}
::-webkit-scrollbar-thumb{background:#222;border-radius:2px}
input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes scaleIn{from{opacity:0;transform:scale(.93)}to{opacity:1;transform:scale(1)}}
@keyframes floatXP{0%{opacity:1;transform:translateX(-50%) translateY(0)}100%{opacity:0;transform:translateX(-50%) translateY(-70px)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
@keyframes popIn{0%{transform:scale(.7);opacity:0}70%{transform:scale(1.06)}100%{transform:scale(1);opacity:1}}
@keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
.fu{animation:fadeUp .4s cubic-bezier(.22,.68,0,1.2) both}
.fu1{animation-delay:.05s}.fu2{animation-delay:.1s}.fu3{animation-delay:.15s}
.fi{animation:fadeIn .3s ease both}
.si{animation:scaleIn .35s cubic-bezier(.22,.68,0,1.2) both}
.press{transition:transform .1s ease,opacity .1s ease}
.press:active{transform:scale(.96);opacity:.82}
.ch{transition:transform .2s ease}
.ch:hover{transform:translateY(-2px)}
.modal-over{animation:fadeIn .2s ease both}
.modal-sheet{animation:slideUp .3s cubic-bezier(.22,.68,0,1.2) both}
.scroll-x{overflow-x:auto;scrollbar-width:none}
.scroll-x::-webkit-scrollbar{display:none}
.xp-pop{position:fixed;left:50%;pointer-events:none;font-family:'Syne',sans-serif;font-size:30px;font-weight:800;color:#C8FF00;text-shadow:0 0 18px #C8FF0060;animation:floatXP 1.8s ease forwards;z-index:9999;white-space:nowrap}
`}</style>
);

export function Toast({ msg }: { msg: string | null }) {
if (!msg) return null;
return (
<div className="fi" style={{ position:'fixed', bottom:96, left:'50%', transform:'translateX(-50%)', background:'rgba(15,15,20,.97)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,.08)', color:'#fff', padding:'10px 20px', borderRadius:20, fontSize:13, zIndex:9998, whiteSpace:'nowrap', fontFamily:F.b, fontWeight:500 }}>
{msg}
</div>
);
}

export function NavBar({ view, setView, AC }: { view:string; setView:(v:string)=>void; AC:string }) {
const tabs = [
{id:'home',icon:'◉',label:'Accueil'},
{id:'catalog',icon:'◈',label:'Exercices'},
{id:'stats',icon:'◎',label:'Stats'},
{id:'coach',icon:'◆',label:'Coach IA'},
{id:'rank',icon:'◇',label:'Rang'},
{id:'profil',icon:'○',label:'Profil'},
];
return (
<nav style={{ position:'fixed', bottom:0, left:'50%', transform:'translateX(-50%)', width:'100%', maxWidth:430, background:'rgba(5,5,7,.97)', backdropFilter:'blur(20px)', borderTop:'1px solid rgba(255,255,255,.05)', display:'flex', justifyContent:'space-around', padding:'10px 0 24px', zIndex:100 }}>
{tabs.map(t => {
const active = view === t.id || view === t.id + 'Detail';
return (
<button key={t.id} onClick={() => setView(t.id)} style={{ background:'none', border:'none', color:active ? AC : 'rgba(255,255,255,.25)', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:3, fontSize:9, fontWeight:active ? 700 : 400, fontFamily:F.b, letterSpacing:.3, padding:'0 10px', transition:'color .2s' }}>
<span style={{ fontSize:17, lineHeight:1 }}>{t.icon}</span>
{t.label}
</button>
);
})}
</nav>
);
}

export function Btn({ children, onClick, variant='primary', size='md', AC, grad, disabled, full, style: sx={} }: any) {
const vs: any = {
primary: { background: AC || D.lime, color:'#000', border:'none' },
secondary: { background:'rgba(255,255,255,.05)', color:'rgba(255,255,255,.75)', border:'1px solid rgba(255,255,255,.07)' },
ghost: { background:'transparent', color:'rgba(255,255,255,.45)', border:'1px solid rgba(255,255,255,.07)' },
danger: { background:'rgba(255,64,64,.1)', color:D.red, border:'1px solid rgba(255,64,64,.18)' },
grad: { background:`linear-gradient(${grad||'135deg,#C8FF00,#6A8800'})`, color:'#000', border:'none' },
}[variant] || {};
const sz: any = { sm:'7px 13px', md:'11px 18px', lg:'14px 22px' }[size];
const fs: any = { sm:12, md:14, lg:15 }[size];
return (
<button className="press" onClick={onClick} disabled={disabled} style={{ ...vs, padding:sz, fontSize:fs, fontFamily:F.b, fontWeight:600, borderRadius:13, cursor:disabled?'not-allowed':'pointer', opacity:disabled?.35:1, width:full?'100%':undefined, display:'flex', alignItems:'center', justifyContent:'center', gap:6, ...sx }}>
{children}
</button>
);
}

export function Card({ children, style: sx={}, glow, AC, onClick }: any) {
return (
<div onClick={onClick} className={onClick ? 'ch' : ''} style={{ background:D.card, border:`1px solid ${D.border}`, borderRadius:18, overflow:'hidden', cursor:onClick?'pointer':'default', boxShadow:glow?`0 0 24px ${AC||D.lime}14`:undefined, ...sx }}>
{children}
</div>
);
}

export function Chip({ children, active, color, onClick, style: sx={} }: any) {
return (
<button onClick={onClick} className="press" style={{ flexShrink:0, background:active?`${color||D.lime}15`:'rgba(255,255,255,.04)', border:`1px solid ${active?(color||D.lime)+'40':'rgba(255,255,255,.06)'}`, borderRadius:20, padding:'6px 13px', cursor:'pointer', fontFamily:F.b, fontSize:12, fontWeight:active?600:400, color:active?(color||D.lime):'rgba(255,255,255,.4)', transition:'all .2s', ...sx }}>
{children}
</button>
);
}

export function Ring({ value, max=100, color=D.lime, size=80, stroke=5, label, sub }: any) {
const r = (size - stroke * 2) / 2;
const circ = 2 * Math.PI * r;
const offset = circ * (1 - Math.min(value / max, 1));
return (
<div style={{ position:'relative', width:size, height:size, flexShrink:0 }}>
<svg width={size} height={size} style={{ transform:'rotate(-90deg)', display:'block' }}>
<circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,.05)" strokeWidth={stroke}/>
<circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} style={{ transition:'stroke-dashoffset 1.4s cubic-bezier(.22,.68,0,1.2)', filter:`drop-shadow(0 0 5px ${color}50)` }}/>
</svg>
<div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
{label && <div style={{ fontFamily:F.b, fontWeight:700, fontSize:size*.22, color:'#fff', lineHeight:1 }}>{label}</div>}
{sub && <div style={{ fontFamily:F.m, fontSize:8, color:D.sub, marginTop:1 }}>{sub}</div>}
</div>
</div>
);
}

export function Sparkline({ data, color=D.lime, width=80, height=28 }: any) {
if (!data || data.length < 2) return null;
const vals = data.map((d: any) => typeof d === 'number' ? d : (d.maxWeight || 0));
const mn = Math.min(...vals), mx = Math.max(...vals), rng = mx - mn || 1;
const W = typeof width === 'number' ? width : 80;
const pts = vals.map((v: number, i: number) => ({ x: (i / (vals.length - 1)) * W, y: height - 3 - ((v - mn) / rng) * (height - 8) }));
const area = 'M' + pts[0].x + ',' + height + ' ' + pts.map((p: any) => 'L' + p.x + ',' + p.y).join(' ') + ' L' + pts[pts.length-1].x + ',' + height + ' Z';
const uid = color.replace(/[^a-z0-9]/gi, '');
return (
<svg width={width} height={height} style={{ overflow:'visible', display:'block' }}>
<defs><linearGradient id={'sg'+uid} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity=".18"/><stop offset="100%" stopColor={color} stopOpacity="0"/></linearGradient></defs>
<path d={area} fill={'url(#sg'+uid+')'}/>
<polyline points={pts.map((p: any) => p.x+','+p.y).join(' ')} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
<circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y} r={3} fill={color}/>
</svg>
);
}

export function Chart({ hist, color }: any) {
const [hov, setHov] = useState<number|null>(null);
if (!hist || hist.length === 0) return <div style={{ textAlign:'center', padding:'20px 0', color:D.sub, fontSize:12, fontFamily:F.b }}>Lance ta première séance !</div>;
if (hist.length === 1) return <div style={{ textAlign:'center', padding:'8px 0', color:D.sub, fontSize:11, fontFamily:F.b }}>{hist[0].date?.slice(5)} · <strong style={{ color }}>{hist[0].maxWeight}kg</strong></div>;
const W=300,H=80,pL=26,pR=8,pT=14,pB=18,iW=W-pL-pR,iH=H-pT-pB;
const ws = hist.map((x: any) => x.maxWeight || 0);
const mn = Math.min(...ws), mx = Math.max(...ws), rng = mx - mn || 1;
const pts = hist.map((x: any, i: number) => ({ x: pL+(i/(hist.length-1))*iW, y: pT+iH-((x.maxWeight-mn)/rng)*iH, w: x.maxWeight, d: x.date }));
const area = 'M'+pts[0].x+','+(pT+iH)+' '+pts.map((p: any)=>'L'+p.x+','+p.y).join(' ')+' L'+pts[pts.length-1].x+','+(pT+iH)+' Z';
const gid = 'ch' + color.replace(/[^a-z0-9]/gi,'');
return (
<svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ overflow:'visible', display:'block' }}>
<defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity=".18"/><stop offset="100%" stopColor={color} stopOpacity="0"/></linearGradient></defs>
{[mn,mx].map((v,i) => { const gy=pT+iH-((v-mn)/rng)*iH; return <g key={i}><line x1={pL} y1={gy} x2={W-pR} y2={gy} stroke="rgba(255,255,255,.04)" strokeWidth="1"/><text x={pL-3} y={gy+4} textAnchor="end" fill={D.sub} fontSize="8" fontFamily={F.m}>{Math.round(v)}</text></g>; })}
<path d={area} fill={`url(#${gid})`}/>
<polyline points={pts.map((p:any)=>p.x+','+p.y).join(' ')} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
{pts.map((p:any,i:number) => {
const isL=i===pts.length-1, isH=hov===i;
return (
<g key={i} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)} style={{ cursor:'pointer' }}>
{isH && <g><rect x={p.x-24} y={p.y-24} width={48} height={14} rx={4} fill={D.card2} stroke={color} strokeWidth=".5"/><text x={p.x} y={p.y-14} textAnchor="middle" fill={color} fontSize="9" fontWeight="700" fontFamily={F.m}>{p.w}kg</text></g>}
<circle cx={p.x} cy={p.y} r={isL?4:isH?3:2} fill={D.bg} stroke={color} strokeWidth={isL?2:1.5} style={{ filter:isL?`drop-shadow(0 0 4px ${color})`:undefined }}/>
{isL && <text x={p.x} y={p.y-9} textAnchor="middle" fill={color} fontSize="9" fontWeight="700" fontFamily={F.m}>{p.w}kg</text>}
</g>
);
})}
</svg>
);
}

export function WeekBars({ data, AC }: any) {
const max = Math.max(...data.map((d:any)=>d.vol), 1);
const [rdy, setRdy] = useState(false);
useEffect(() => { const t = setTimeout(() => setRdy(true), 300); return () => clearTimeout(t); }, []);
return (
<div style={{ display:'flex', alignItems:'flex-end', gap:5, height:52 }}>
{data.map((d:any, i:number) => {
const h = rdy ? Math.max((d.vol/max)*44, d.vol>0?3:0) : 0;
return (
<div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
<div style={{ width:'100%', height:44, display:'flex', alignItems:'flex-end' }}>
<div style={{ width:'100%', height:h, background:d.vol>0?AC:'rgba(255,255,255,.05)', borderRadius:'3px 3px 0 0', transition:`height .8s cubic-bezier(.22,.68,0,1.2) ${i*.05}s` }}/>
</div>
<div style={{ fontFamily:F.m, fontSize:8, color:'rgba(255,255,255,.25)' }}>{d.day}</div>
</div>
);
})}
</div>
);
}

export function BadgeDiv({ xp, size='md' }: { xp:number; size?:string }) {
const p = getPalier(xp);
const sz: any = { sm:{w:24,e:11}, md:{w:44,e:18,n:7}, lg:{w:62,e:26,n:8} }[size];
return (
<div style={{ width:sz.w, height:sz.w, borderRadius:sz.w*.28, background:`linear-gradient(${p.rang.grad})`, border:`1.5px solid ${p.rang.couleur}35`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:`0 0 14px ${p.rang.couleur}18` }}>
<span style={{ fontSize:sz.e, lineHeight:1 }}>{p.rang.emoji}</span>
{sz.n && <div style={{ fontFamily:F.m, fontSize:sz.n, color:p.rang.couleur, marginTop:1, fontWeight:700 }}>{ROMS[p.division-1]}</div>}
</div>
);
}

export function BarXP({ xp, AC, compact }: { xp:number; AC:string; compact?:boolean }) {
const cur = getPalier(xp), nxt = getPalierSuiv(xp), pct = getPct(xp), dans = xp - cur.xpMin;
const [a, setA] = useState(false);
useEffect(() => { const t = setTimeout(() => setA(true), 300); return () => clearTimeout(t); }, [xp]);
return (
<div>
{!compact && <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
<div style={{ fontFamily:F.m, fontSize:9, color:cur.rang.couleur, fontWeight:700 }}>{cur.label} · {xp.toLocaleString('fr-FR')} XP</div>
{nxt && <div style={{ fontFamily:F.m, fontSize:9, color:D.sub }}>→ {nxt.label}</div>}
</div>}
<div style={{ height:compact?3:4, background:'rgba(255,255,255,.05)', borderRadius:10, overflow:'hidden' }}>
<div style={{ height:'100%', width:a?pct+'%':'0%', background:cur.rang.couleur, borderRadius:10, transition:'width 1.4s cubic-bezier(.22,.68,0,1.2)', boxShadow:`0 0 8px ${cur.rang.couleur}40` }}/>
</div>
{!compact && nxt && <div style={{ display:'flex', justifyContent:'space-between', marginTop:3 }}>
<div style={{ fontFamily:F.m, fontSize:8, color:D.sub }}>{dans}/{cur.xpNeeded} XP</div>
<div style={{ fontFamily:F.m, fontSize:8, color:nxt.rang.couleur }}>+{cur.xpNeeded-dans} restants</div>
</div>}
</div>
);
}

