export const D = {
  bg: "#050507", card: "#111116", card2: "#161620",
  border: "#1C1C28", text: "#EFEFFA", sub: "#52526A", sub2: "#28283A",
  lime: "#C8FF00", red: "#FF4040", blue: "#3B9EFF", orange: "#FF8C00",
  purple: "#A855F7", pink: "#F472B6", green: "#22C55E", teal: "#14B8A6"
  };
  export const F = { d: "'Syne',sans-serif", b: "'Inter',sans-serif", m: "'JetBrains Mono',monospace" };
  export const GA: Record<string,string> = { mass:D.lime, cut:D.red, force:D.orange, fit:D.blue, glute:D.pink, tone:D.purple, teen:D.teal };
  export const GG: Record<string,string> = { mass:"135deg,#C8FF00,#6A8800", cut:"135deg,#FF4040,#AA1010", force:"135deg,#FF8C00,#AA4400", fit:"135deg,#3B9EFF,#0055CC", glute:"135deg,#F472B6,#A01060", tone:"135deg,#A855F7,#5010A0", teen:"135deg,#14B8A6,#087060" };
  
  export const load = (k:string, d:any) => { try { return JSON.parse(localStorage.getItem(k)??'null')??d; } catch { return d; } };
  export const save = (k:string, v:any) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
  
  export interface Exercise {
  name:string; emoji:string; muscle:string; muscleGroup:string;
  cat:"compound"|"isolation"|"bodyweight"; tempo:{d:number;h:number;u:number};
  rest:number; sets:number; reps:string; req:string[]; bodyweight:boolean;
  why:string; tips:string[];
  }
  
  export const EX: Record<string, Exercise> = {
  bench:{name:"Développé couché barre",emoji:"🏋️",muscle:"Pectoraux",muscleGroup:"chest",cat:"compound",tempo:{d:3,h:1,u:2},rest:120,sets:4,reps:"6-8",req:["barbell","bench"],bodyweight:false,why:"Le roi de la poitrine.",tips:["Omoplates serrées","Coudes à 45°"]},
  dbBench:{name:"Développé couché haltères",emoji:"🏋️",muscle:"Pectoraux",muscleGroup:"chest",cat:"compound",tempo:{d:3,h:1,u:2},rest:120,sets:4,reps:"8-10",req:["dumbbell","bench"],bodyweight:false,why:"Amplitude supérieure.",tips:["Descends les coudes sous le banc"]},
  incline:{name:"Développé incliné",emoji:"📐",muscle:"Pectoraux haut",muscleGroup:"chest",cat:"compound",tempo:{d:3,h:1,u:2},rest:90,sets:3,reps:"8-10",req:["barbell","bench"],bodyweight:false,why:"Chef claviculaire.",tips:["Banc 30-45°"]},
  pushup:{name:"Pompes classiques",emoji:"✊",muscle:"Pectoraux",muscleGroup:"chest",cat:"bodyweight",tempo:{d:3,h:1,u:2},rest:60,sets:4,reps:"12-20",req:[],bodyweight:true,why:"Fondamental.",tips:["Corps aligné"]},
  dip:{name:"Dips pectoraux",emoji:"🔱",muscle:"Pecs bas",muscleGroup:"chest",cat:"bodyweight",tempo:{d:3,h:1,u:2},rest:90,sets:3,reps:"8-12",req:["dip_bar"],bodyweight:true,why:"Bas des pecs.",tips:["Penche 30° en avant"]},
  deadlift:{name:"Soulevé de terre",emoji:"⚡",muscle:"Dos complet",muscleGroup:"back",cat:"compound",tempo:{d:3,h:0,u:2},rest:180,sets:4,reps:"5-6",req:["barbell"],bodyweight:false,why:"Le roi des exercices.",tips:["DOS PLAT"]},
  pullup:{name:"Tractions prise large",emoji:"🎯",muscle:"Grand dorsal",muscleGroup:"back",cat:"compound",tempo:{d:3,h:1,u:2},rest:90,sets:4,reps:"6-10",req:["pullupbar"],bodyweight:true,why:"Largeur du dos.",tips:["Initie avec les omoplates"]},
  row:{name:"Rowing barre",emoji:"🌊",muscle:"Dos épais",muscleGroup:"back",cat:"compound",tempo:{d:3,h:1,u:2},rest:90,sets:4,reps:"6-8",req:["barbell"],bodyweight:false,why:"Épaisseur du dos.",tips:["Dos plat"]},
  dbRow:{name:"Rowing haltère",emoji:"🌊",muscle:"Dos",muscleGroup:"back",cat:"compound",tempo:{d:3,h:1,u:2},rest:75,sets:3,reps:"10-12",req:["dumbbell"],bodyweight:false,why:"Corrige les déséquilibres.",tips:["Coude vers le plafond"]},
  latpull:{name:"Tirage vertical poulie",emoji:"⛵",muscle:"Grand dorsal",muscleGroup:"back",cat:"compound",tempo:{d:3,h:1,u:2},rest:75,sets:3,reps:"10-12",req:["cables"],bodyweight:false,why:"Largeur du dos.",tips:["Tire vers le sternum"]},
  australianRow:{name:"Traction australienne",emoji:"🌊",muscle:"Dos moyen",muscleGroup:"back",cat:"compound",tempo:{d:3,h:1,u:2},rest:75,sets:3,reps:"10-15",req:["pullupbar"],bodyweight:true,why:"Progresser vers les tractions.",tips:["Corps en planche"]},
  ohp:{name:"Développé militaire",emoji:"🔥",muscle:"Épaules ant.",muscleGroup:"shoulders",cat:"compound",tempo:{d:3,h:1,u:2},rest:120,sets:4,reps:"6-8",req:["barbell"],bodyweight:false,why:"Fondamental épaules.",tips:["Gainage fort"]},
  dbOhp:{name:"Développé épaules haltères",emoji:"🔥",muscle:"Épaules",muscleGroup:"shoulders",cat:"compound",tempo:{d:3,h:1,u:2},rest:90,sets:3,reps:"8-10",req:["dumbbell"],bodyweight:false,why:"3 faisceaux.",tips:["Rotation externe en haut"]},
  lateral:{name:"Élévations latérales",emoji:"🕊️",muscle:"Épaules lat.",muscleGroup:"shoulders",cat:"isolation",tempo:{d:3,h:1,u:2},rest:60,sets:4,reps:"12-15",req:["dumbbell"],bodyweight:false,why:"Largeur des épaules.",tips:["Pas d'élan"]},
  rearDelt:{name:"Oiseau faisceau post.",emoji:"🦅",muscle:"Épaules post.",muscleGroup:"shoulders",cat:"isolation",tempo:{d:3,h:1,u:2},rest:60,sets:4,reps:"12-15",req:["dumbbell"],bodyweight:false,why:"Faisceau postérieur.",tips:["Buste à 90°"]},
  facePull:{name:"Face Pull câble",emoji:"🎯",muscle:"Épaules post.",muscleGroup:"shoulders",cat:"compound",tempo:{d:3,h:2,u:2},rest:60,sets:3,reps:"15-20",req:["cables"],bodyweight:false,why:"Santé des épaules.",tips:["Rotation externe max"]},
  curl:{name:"Curl barre",emoji:"💥",muscle:"Biceps",muscleGroup:"biceps",cat:"compound",tempo:{d:3,h:1,u:2},rest:75,sets:3,reps:"8-10",req:["barbell"],bodyweight:false,why:"Volume biceps.",tips:["Coudes fixes"]},
  dbCurl:{name:"Curl haltères alterné",emoji:"💥",muscle:"Biceps",muscleGroup:"biceps",cat:"compound",tempo:{d:3,h:1,u:2},rest:60,sets:3,reps:"10-12",req:["dumbbell"],bodyweight:false,why:"Rotation = contraction max.",tips:["Rotation en montant"]},
  hammercurl:{name:"Curl marteau",emoji:"🔨",muscle:"Brachial",muscleGroup:"biceps",cat:"compound",tempo:{d:3,h:1,u:2},rest:60,sets:3,reps:"10-12",req:["dumbbell"],bodyweight:false,why:"Développe le brachial.",tips:["Prise neutre"]},
  skullcrush:{name:"Skull Crusher",emoji:"💀",muscle:"Triceps",muscleGroup:"triceps",cat:"compound",tempo:{d:3,h:1,u:2},rest:75,sets:3,reps:"8-10",req:["barbell","bench"],bodyweight:false,why:"Masse du triceps.",tips:["Coudes vers le plafond"]},
  triceppush:{name:"Pushdown câble",emoji:"🔩",muscle:"Triceps",muscleGroup:"triceps",cat:"isolation",tempo:{d:3,h:1,u:2},rest:60,sets:3,reps:"12-15",req:["cables"],bodyweight:false,why:"Isolation parfaite.",tips:["Extension complète"]},
  diamondPushup:{name:"Pompes diamant",emoji:"💎",muscle:"Triceps",muscleGroup:"triceps",cat:"bodyweight",tempo:{d:3,h:1,u:2},rest:60,sets:3,reps:"10-15",req:[],bodyweight:true,why:"Triceps sans matériel.",tips:["Coudes proches"]},
  squat:{name:"Squat barre",emoji:"🦵",muscle:"Quadriceps",muscleGroup:"legs",cat:"compound",tempo:{d:3,h:1,u:2},rest:180,sets:4,reps:"6-8",req:["barbell"],bodyweight:false,why:"Le roi des jambes.",tips:["Genoux dans l'axe"]},
  gobletSquat:{name:"Goblet Squat",emoji:"🦵",muscle:"Quadriceps",muscleGroup:"legs",cat:"compound",tempo:{d:3,h:1,u:2},rest:90,sets:3,reps:"12-15",req:["dumbbell"],bodyweight:false,why:"Technique du squat.",tips:["Descends profond"]},
  bwSquat:{name:"Squat poids du corps",emoji:"🦵",muscle:"Quadriceps",muscleGroup:"legs",cat:"bodyweight",tempo:{d:3,h:1,u:2},rest:60,sets:4,reps:"20-25",req:[],bodyweight:true,why:"Sans matériel.",tips:["Dos droit"]},
  rdl:{name:"Soulevé jambes tendues",emoji:"🎖️",muscle:"Ischio-jambiers",muscleGroup:"legs",cat:"compound",tempo:{d:3,h:1,u:2},rest:90,sets:3,reps:"10-12",req:["barbell"],bodyweight:false,why:"N°1 ischio.",tips:["DOS PLAT"]},
  lunge:{name:"Fentes marchées",emoji:"⚔️",muscle:"Quads / Fessiers",muscleGroup:"legs",cat:"bodyweight",tempo:{d:3,h:0,u:2},rest:75,sets:3,reps:"10/côté",req:[],bodyweight:true,why:"Corrige déséquilibres.",tips:["Torse droit"]},
  hipThrust:{name:"Hip Thrust barre",emoji:"🍑",muscle:"Grand fessier",muscleGroup:"glutes",cat:"compound",tempo:{d:2,h:2,u:2},rest:90,sets:4,reps:"10-12",req:["barbell","bench"],bodyweight:false,why:"N°1 fessiers.",tips:["Contracte 2s en haut"]},
  bwHipThrust:{name:"Hip Thrust sol",emoji:"🍑",muscle:"Grand fessier",muscleGroup:"glutes",cat:"bodyweight",tempo:{d:2,h:2,u:2},rest:60,sets:4,reps:"15-20",req:[],bodyweight:true,why:"Sans matériel.",tips:["Pousse avec les talons"]},
  sumoSquat:{name:"Squat Sumo",emoji:"🦵",muscle:"Fessiers",muscleGroup:"glutes",cat:"bodyweight",tempo:{d:3,h:1,u:2},rest:75,sets:4,reps:"15-20",req:[],bodyweight:true,why:"Plus de fessiers.",tips:["Orteils à 45°"]},
  gluteBridge:{name:"Pont Fessier",emoji:"🍑",muscle:"Grand fessier",muscleGroup:"glutes",cat:"bodyweight",tempo:{d:2,h:2,u:2},rest:45,sets:3,reps:"15-20",req:[],bodyweight:true,why:"Activation fessiers.",tips:["Contracte fort"]},
  crunch:{name:"Crunch classique",emoji:"🎯",muscle:"Abdos haut",muscleGroup:"abs",cat:"bodyweight",tempo:{d:2,h:1,u:2},rest:45,sets:3,reps:"15-20",req:[],bodyweight:true,why:"Grand droit haut.",tips:["Expire en contractant"]},
  plank:{name:"Gainage frontal",emoji:"🧱",muscle:"Transverse",muscleGroup:"abs",cat:"bodyweight",tempo:{d:0,h:0,u:0},rest:45,sets:3,reps:"45-60 sec",req:[],bodyweight:true,why:"Gainage profond.",tips:["Corps aligné"]},
  legRaise:{name:"Élévations de jambes",emoji:"🦵",muscle:"Abdos bas",muscleGroup:"abs",cat:"bodyweight",tempo:{d:3,h:1,u:2},rest:45,sets:3,reps:"12-15",req:[],bodyweight:true,why:"Grand droit bas.",tips:["Dos au sol"]},
  russianTwist:{name:"Russian Twist",emoji:"🔄",muscle:"Obliques",muscleGroup:"abs",cat:"bodyweight",tempo:{d:2,h:0,u:2},rest:45,sets:3,reps:"20 (10/côté)",req:[],bodyweight:true,why:"Obliques complets.",tips:["Pieds levés"]},
  plankLat:{name:"Gainage latéral",emoji:"⬡",muscle:"Obliques",muscleGroup:"abs",cat:"bodyweight",tempo:{d:0,h:0,u:0},rest:45,sets:3,reps:"30-45 sec/côté",req:[],bodyweight:true,why:"Obliques profonds.",tips:["Hanches levées"]},
  bwCalf:{name:"Mollets poids du corps",emoji:"🏃",muscle:"Mollets",muscleGroup:"legs",cat:"isolation",tempo:{d:3,h:2,u:2},rest:45,sets:4,reps:"25-30",req:[],bodyweight:true,why:"Sans matériel.",tips:["Amplitude max"]},
  };
  
  export const GENDERS = [
  {id:"male",emoji:"👨",label:"Homme",desc:"Force, volume"},
  {id:"female",emoji:"👩",label:"Femme",desc:"Galbe, tonicité"},
  {id:"teen",emoji:"🧒",label:"Moins de 18 ans",desc:"Programme sécurisé"},
  ];
  export const GOALS = [
{id:"mass",emoji:"💪",label:"Prise de masse",color:"#C8FF00",desc:"Gagner du muscle et du volume"},
{id:"cut",emoji:"🔥",label:"Sèche",color:"#FF4040",desc:"Perdre du gras, garder le muscle"},
{id:"force",emoji:"⚡",label:"Force pure",color:"#FF8C00",desc:"Soulever plus lourd, devenir plus fort"},
{id:"fit",emoji:"🏃",label:"Remise en forme",color:"#3B9EFF",desc:"Retrouver la forme et l'énergie"},
];
export const FEMALE_GOALS = [
{id:"tone",emoji:"✨",label:"Tonicité globale",color:"#A855F7",desc:"Corps ferme et dessiné"},
{id:"cut",emoji:"🔥",label:"Perte de poids",color:"#FF4040",desc:"Affiner et sculpter"},
{id:"fit",emoji:"🏃",label:"Remise en forme",color:"#3B9EFF",desc:"Énergie et santé"},
{id:"mass",emoji:"💪",label:"Prise de muscle",color:"#C8FF00",desc:"Développer progressivement"},
];
export const TEEN_GOALS = [
{id:"fit",emoji:"🏃",label:"Remise en forme",color:"#14B8A6",desc:"Énergie et santé"},
{id:"tone",emoji:"✨",label:"Tonicité",color:"#A855F7",desc:"Corps athlétique"},
{id:"mass",emoji:"💪",label:"Prise de muscle",color:"#C8FF00",desc:"Développer progressivement"},
];


  export const TEEN_GOALS = [
  {id:"fit",emoji:"🏃",label:"Remise en forme",color:"#14B8A6",desc:"Énergie"},
  {id:"tone",emoji:"✨",label:"Tonicité",color:"#A855F7",desc:"Corps athlétique"},
  {id:"mass",emoji:"💪",label:"Prise de muscle",color:"#C8FF00",desc:"Progressif"},
  ];
  export const LEVELS = [
  {id:"beginner",emoji:"🌱",label:"Débutant",desc:"Moins d'1 an"},
  {id:"intermediate",emoji:"⚡",label:"Intermédiaire",desc:"1 à 3 ans"},
  {id:"advanced",emoji:"🔥",label:"Avancé",desc:"Plus de 3 ans"},
  ];
  export const FREQS = [
  {id:3,label:"3 jours",badge:"Minimum",color:"#FF8C00"},
  {id:4,label:"4 jours",badge:"Idéal",color:"#C8FF00"},
  {id:5,label:"5 jours",badge:"Intensif",color:"#3B9EFF"},
  {id:6,label:"6 jours",badge:"Hardcore",color:"#FF4040"},
  ];
  export const ENVS = [
  {id:"gym",emoji:"🏋️",label:"Salle de sport"},
  {id:"home",emoji:"🏠",label:"À la maison"},
  {id:"outdoor",emoji:"🌳",label:"Dehors / Calisthenics"},
  {id:"mixed",emoji:"🔀",label:"Variable"},
  ];
  export const EQUIPMENTS = [
  {id:"barbell",emoji:"🏋️",label:"Barre + disques"},
  {id:"dumbbell",emoji:"🏅",label:"Haltères"},
  {id:"pullupbar",emoji:"🎯",label:"Barre de traction"},
  {id:"bench",emoji:"🛋️",label:"Banc"},
  {id:"cables",emoji:"🔗",label:"Poulies"},
  {id:"machines",emoji:"⚙️",label:"Machines"},
  {id:"dip_bar",emoji:"🔱",label:"Barres dips"},
  {id:"nothing",emoji:"🤲",label:"Poids du corps"},
  ];
  
  export const RANGS = [
  {id:"bronze",nom:"Bronze",couleur:"#CD7F32",emoji:"🥉",grad:"135deg,#3D2B1F,#8B5E3C",xpDiv:[0,80,100,130,160]},
  {id:"argent",nom:"Argent",couleur:"#C0C0C0",emoji:"🥈",grad:"135deg,#2A2A2A,#777",xpDiv:[250,300,360,420,500]},
  {id:"or",nom:"Or",couleur:"#FFD700",emoji:"🥇",grad:"135deg,#3D3000,#AA8800",xpDiv:[600,720,840,960,1100]},
  {id:"platine",nom:"Platine",couleur:"#00D4FF",emoji:"💎",grad:"135deg,#00203D,#007799",xpDiv:[1400,1600,1800,2000,2200]},
  {id:"diamant",nom:"Diamant",couleur:"#BF5AF2",emoji:"💠",grad:"135deg,#1A0033,#6600CC",xpDiv:[2800,3200,3600,4000,4500]},
  {id:"maitre",nom:"Maître",couleur:"#FF7700",emoji:"🔥",grad:"135deg,#3D1500,#CC5500",xpDiv:[5500,6500,7500,8500,10000]},
  {id:"challenger",nom:"Challenger",couleur:"#00FFD1",emoji:"⚡",grad:"135deg,#003D33,#00AAAA",xpDiv:[12000,14000,16000,18000,20000]},
  {id:"legende",nom:"Légende",couleur:"#FFD700",emoji:"👑",grad:"135deg,#2A1A00,#997700",xpDiv:[25000,30000,36000,42000,99999]},
  ];
  export const ROMS = ["I","II","III","IV","V"];
  
  export const ACHIEVEMENTS = [
  {id:"first_session",name:"Premier pas",desc:"1ère séance",icon:"🌱",xp:50},
  {id:"streak_3",name:"3 jours",desc:"3 jours consécutifs",icon:"🔥",xp:75},
  {id:"streak_7",name:"Semaine parfaite",desc:"7 jours consécutifs",icon:"💫",xp:200},
  {id:"sessions_10",name:"Habitude",desc:"10 séances",icon:"⚡",xp:100},
  {id:"sessions_50",name:"Vétéran",desc:"50 séances",icon:"🏆",xp:500},
  {id:"first_record",name:"1er record",desc:"Bats un record",icon:"📈",xp:75},
  {id:"records_5",name:"Machine",desc:"5 exercices en record",icon:"🎯",xp:200},
  {id:"bench_100",name:"Club 100kg",desc:"100kg au développé",icon:"💪",xp:300},
  {id:"squat_100",name:"Squat 100kg",desc:"100kg au squat",icon:"🦵",xp:300},
  {id:"volume_10t",name:"10 Tonnes",desc:"10T de volume total",icon:"🏋️",xp:400},
  ];
  
  export const WEEKLY = [
  {id:"w1",name:"5 séances cette semaine",icon:"📅",xp:150,target:5,type:"sessions"},
  {id:"w2",name:"Bat 3 records",icon:"📈",xp:200,target:3,type:"records"},
  {id:"w3",name:"Volume > 5 tonnes",icon:"🏋️",xp:175,target:5000,type:"volume"},
  {id:"w4",name:"Séance > 60 min",icon:"⏱",xp:100,target:3600,type:"duration"},
  {id:"w5",name:"3 jours consécutifs",icon:"🔥",xp:125,target:3,type:"streak"},
  ];
  
  
