import { useState, useCallback } from 'react';
import { GA, GG, load, save } from './data';
import { buildCycle } from './logic';
import { GS, Toast, NavBar } from './components';
import { SessionView } from './session';
import { Onboarding, HomeView, CatalogView, CatalogDetailView, StatsView, CoachView, VueClassement, VueProfil } from './views';



export default function App() {
const [profile, setProfile] = useState<any>(() => load('surge_p2', null));
const [logs, setLogs] = useState<any>(() => load('surge_l2', {}));
const [cycleIdx, setCycleIdx] = useState<number>(() => load('surge_c2', 0));
const [view, setView] = useState('home');
const [activeSession, setAS] = useState<any>(null);
const [sessionExos, setSessExos] = useState<string[]>([]);
const [activeExo, setActiveExo] = useState<string|null>(null);
const [customSessionExos, setCustomSessionExos] = useState<string[]|null>(null);
const [toast, setToast] = useState<string|null>(null);
const [xpUser, setXpUser] = useState<number>(() => load('surge_xp', 0));
const [xpFloat, setXpFloat] = useState<number|null>(null);

const saveProfile = (p: any) => { setProfile(p); save('surge_p2', p); };
const saveLogs = (l: any) => { setLogs(l); save('surge_l2', l); };
const saveCycleIdx = (i: number) => { setCycleIdx(i); save('surge_c2', i); };

const toast_ = useCallback((msg: string) => {
setToast(msg);
setTimeout(() => setToast(null), 2500);
}, []);

const setXpUserAndFloat = (updater: any) => {
setXpUser(prev => {
const n = typeof updater === 'function' ? updater(prev) : updater;
save('surge_xp', n);
if (n > prev) {
setXpFloat(n - prev);
setTimeout(() => setXpFloat(null), 1800);
}
return n;
});
};

if (!profile) {
return (
<>
<GS/>
<Onboarding onDone={p => saveProfile(p)}/>
</>
);
}

const eff = profile.gender === 'teen' ? 'teen' : (profile.goal || 'mass');
const AC = GA[eff] || '#C8FF00';
const grad = GG[eff] || GG.mass;
const cycle = buildCycle(profile.goal, profile.frequency, profile.gender, profile.equipment || [], profile.environment || 'gym');

const startSession = (s: any, customExos: string[]|null = null) => {
setAS(s);
setSessExos(customExos || [...s.exos]);
setCustomSessionExos(null);
setView('session');
};

const navigate = (v: string) => {
setView(v);
setAS(null);
setActiveExo(null);
};

if (view === 'session' && activeSession) {
return (
<>
<GS/>
<SessionView
profile={profile}
logs={logs}
setLogs={saveLogs}
activeSession={activeSession}
sessionExos={sessionExos}
setSessionExos={setSessExos}
cycle={cycle}
cycleIdx={cycleIdx}
setCycleIdx={saveCycleIdx}
setView={setView}
setAS={setAS}
toast_={toast_}
AC={AC}
grad={grad}
setXpUser={setXpUserAndFloat}
/>
<Toast msg={toast}/>
{xpFloat && <div className="xp-pop" style={{ top:'18%' }}>+{xpFloat} XP ⚡</div>}
</>
);
}

return (
<>
<GS/>
{xpFloat && <div className="xp-pop" style={{ top:'18%' }}>+{xpFloat} XP ⚡</div>}

{view === 'home' && (
<HomeView
profile={profile}
logs={logs}
cycle={cycle}
cycleIdx={cycleIdx}
customSessionExos={customSessionExos}
setCustomSessionExos={setCustomSessionExos}
startSession={startSession}
AC={AC}
grad={grad}
xpUser={xpUser}
/>
)}
{view === 'catalog' && (
<CatalogView
profile={profile}
logs={logs}
cycle={cycle}
setActiveExo={setActiveExo}
setView={setView}
customSessionExos={customSessionExos}
setCustomSessionExos={setCustomSessionExos}
AC={AC}
/>
)}
{view === 'catalogDetail' && (
<CatalogDetailView
activeExo={activeExo}
profile={profile}
logs={logs}
cycle={cycle}
customSessionExos={customSessionExos}
setCustomSessionExos={setCustomSessionExos}
setView={setView}
toast_={toast_}
AC={AC}
/>
)}
{view === 'stats' && (
<StatsView
profile={profile}
logs={logs}
cycle={cycle}
AC={AC}
grad={grad}
xpUser={xpUser}
/>
)}
{view === 'coach' && (
<CoachView
profile={profile}
logs={logs}
AC={AC}
grad={grad}
/>
)}
{view === 'rank' && (
<VueClassement
profile={profile}
xpUser={xpUser}
AC={AC}
/>
)}
{view === 'profil' && (
<VueProfil
profile={profile}
xpUser={xpUser}
setXpUser={setXpUserAndFloat}
logs={logs}
AC={AC}
grad={grad}
/>
)}

<Toast msg={toast}/>
<NavBar
view={view}
setView={navigate}
AC={AC}
/>
</>
);
}

