export const D = {
bg:"#050507", card:"#111116", card2:"#161620",
border:"#1C1C28", text:"#EFEFFA", sub:"#52526A", sub2:"#28283A",
lime:"#C8FF00", red:"#FF4040", blue:"#3B9EFF", orange:"#FF8C00",
purple:"#A855F7", pink:"#F472B6", green:"#22C55E", teal:"#14B8A6"
};
export const F = { d:"'Syne',sans-serif", b:"'Inter',sans-serif", m:"'JetBrains Mono',monospace" };
export const GA: Record<string,string> = { mass:D.lime, cut:D.red, force:D.orange, fit:D.blue, tone:D.purple, teen:D.teal };
export const GG: Record<string,string> = { mass:"135deg,#C8FF00,#6A8800", cut:"135deg,#FF4040,#AA1010", force:"135deg,#FF8C00,#AA4400", fit:"135deg,#3B9EFF,#0055CC", tone:"135deg,#A855F7,#5010A0", teen:"135deg,#14B8A6,#087060" };

export const load = (k:string, d:any) => { try { return JSON.parse(localStorage.getItem(k)??'null')??d; } catch { return d; } };
export const save = (k:string, v:any) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

export interface Exercise {
name:string; emoji:string; muscle:string; muscleGroup:string;
cat:"compound"|"isolation"|"bodyweight";
tempo:{d:number;h:number;u:number};
rest:number; sets:number; reps:string;
req:string[]; bodyweight:boolean;
why:string; tips:string[];
muscles_detail:string;
erreurs:string[];
conseil:string;
alternatives:string[];
}

export const EX: Record<string, Exercise> = {
bench:{name:"Développé couché barre",emoji:"🏋️",muscle:"Pectoraux",muscleGroup:"chest",cat:"compound",tempo:{d:3,h:1,u:2},rest:120,sets:4,reps:"6-8",req:["barbell","bench"],bodyweight:false,why:"Le mouvement roi de la poitrine. Stimule le grand pectoral sur toute sa longueur.",tips:["Omoplates serrées","Coudes à 45°"],muscles_detail:"Grand pectoral (chef sternal et claviculaire), deltoïde antérieur, triceps brachial",erreurs:["Coudes trop écartés à 90°","Fesses qui décollent du banc","Pas de descente contrôlée"],conseil:"Descends la barre jusqu'à 1cm de la poitrine. Si tu n'arrives pas à 6 reps proprement, allège le poids.",alternatives:["dbBench","incline","pushup"]},

incline:{name:"Développé incliné haltères",emoji:"📐",muscle:"Pectoraux haut",muscleGroup:"chest",cat:"compound",tempo:{d:3,h:1,u:2},rest:90,sets:3,reps:"8-10",req:["dumbbell","bench"],bodyweight:false,why:"Cible le chef claviculaire du grand pectoral. Donne le galbe supérieur de la poitrine.",tips:["Banc à 30-45°","Rotation externe en haut"],muscles_detail:"Grand pectoral chef claviculaire, deltoïde antérieur, triceps",erreurs:["Banc trop incliné (>45°) = trop d'épaules","Coudes qui tombent vers l'intérieur"],conseil:"30° est l'angle optimal. Au-delà de 45° tu travailles surtout les épaules.",alternatives:["bench","dbBench","inclineBarbell"]},

flyes:{name:"Écarté haltères couché",emoji:"🦅",muscle:"Pectoraux — isolation",muscleGroup:"chest",cat:"isolation",tempo:{d:3,h:2,u:2},rest:60,sets:3,reps:"12-15",req:["dumbbell","bench"],bodyweight:false,why:"Isolation parfaite du grand pectoral. Étirement maximal des fibres.",tips:["Légère flexion des coudes","Imagine embrasser un arbre"],muscles_detail:"Grand pectoral uniquement — isolation pure",erreurs:["Bras trop tendus (risque coudes)","Descendre trop bas"],conseil:"Le poids doit être léger. On cherche l'étirement et la contraction, pas la charge.",alternatives:["cableFlyes","flyes"]},

dip:{name:"Dips pectoraux",emoji:"🔱",muscle:"Pecs bas · Triceps",muscleGroup:"chest",cat:"bodyweight",tempo:{d:3,h:1,u:2},rest:90,sets:3,reps:"8-12",req:["dip_bar"],bodyweight:true,why:"Excellent pour le bas des pectoraux et finir les triceps en fin de séance.",tips:["Penche le buste 30° en avant","Coudes légèrement écartés"],muscles_detail:"Grand pectoral chef sternal, triceps brachial, deltoïde antérieur",erreurs:["Buste trop droit = trop de triceps","Descente insuffisante"],conseil:"Si tu arrives à 12 reps facilement, ajoute du lest avec une ceinture.",alternatives:["pushup","diamondPushup"]},

skullcrush:{name:"Skull Crusher barre",emoji:"💀",muscle:"Triceps — chef long",muscleGroup:"triceps",cat:"compound",tempo:{d:3,h:1,u:2},rest:75,sets:3,reps:"8-10",req:["barbell","bench"],bodyweight:false,why:"Meilleur exercice pour le chef long du triceps. Donne la masse et l'épaisseur au bras.",tips:["Coudes pointés vers le plafond","Descente derrière la tête"],muscles_detail:"Triceps brachial — chef long principalement, chef médial",erreurs:["Coudes qui s'écartent","Trop de poids = douleur aux coudes"],conseil:"Commence léger et maîtrise le mouvement avant d'augmenter.",alternatives:["triceppush","overheadExt"]},

triceppush:{name:"Pushdown câble",emoji:"🔩",muscle:"Triceps — chef latéral",muscleGroup:"triceps",cat:"isolation",tempo:{d:3,h:1,u:2},rest:60,sets:3,reps:"12-15",req:["cables"],bodyweight:false,why:"Isolation parfaite du chef latéral. Donne le galbe visible du triceps.",tips:["Coudes fixes contre le corps","Extension complète en bas"],muscles_detail:"Triceps brachial — chef latéral et médial",erreurs:["Coudes qui bougent","Pas d'extension complète"],conseil:"Varie entre corde et barre droite pour stimuler différemment.",alternatives:["skullcrush","diamondPushup"]},

overheadExt:{name:"Extension nuque haltère",emoji:"💪",muscle:"Triceps — chef long",muscleGroup:"triceps",cat:"isolation",tempo:{d:3,h:1,u:2},rest:60,sets:3,reps:"12-15",req:["dumbbell"],bodyweight:false,why:"Étirement maximal du chef long du triceps. Complémentaire au Pushdown.",tips:["Coudes proches des oreilles","Descente derrière la nuque"],muscles_detail:"Triceps brachial — chef long en étirement maximal",erreurs:["Coudes qui s'écartent","Mouvement des épaules"],conseil:"Utilise un seul haltère tenu à deux mains pour plus de stabilité.",alternatives:["skullcrush","triceppush"]},

deadlift:{name:"Soulevé de terre",emoji:"⚡",muscle:"Dos complet",muscleGroup:"back",cat:"compound",tempo:{d:3,h:0,u:2},rest:180,sets:4,reps:"5-6",req:["barbell"],bodyweight:false,why:"Le roi de tous les exercices. Sollicite 70% des muscles du corps en un seul mouvement.",tips:["DOS ABSOLUMENT PLAT","Barre contre les tibias","Pousse le sol"],muscles_detail:"Érecteurs du rachis, grand dorsal, trapèzes, ischio-jambiers, fessiers, quadriceps",erreurs:["Dos arrondi — danger pour les lombaires","Barre trop loin du corps","Genoux qui rentrent"],conseil:"Jamais d'ego lifting sur cet exercice. Un dos arrondi peut blesser gravement.",alternatives:["rdl","row"]},

pullup:{name:"Tractions prise large",emoji:"🎯",muscle:"Grand dorsal",muscleGroup:"back",cat:"compound",tempo:{d:3,h:1,u:2},rest:90,sets:4,reps:"6-10",req:["pullupbar"],bodyweight:true,why:"L'exercice numéro 1 pour la largeur du dos. Développe le V-taper.",tips:["Initie avec les omoplates","Tire les coudes vers les hanches"],muscles_detail:"Grand dorsal, biceps, rhomboïdes, trapèze moyen et inférieur",erreurs:["Balancement du corps","Pas descendre complètement","Menton seulement à la barre"],conseil:"Si tu ne peux pas faire 6 reps, utilise un élastique de résistance ou fais des australiennes.",alternatives:["latpull","australianRow"]},

row:{name:"Rowing barre",emoji:"🌊",muscle:"Dos épais",muscleGroup:"back",cat:"compound",tempo:{d:3,h:1,u:2},rest:90,sets:4,reps:"6-8",req:["barbell"],bodyweight:false,why:"Le développé couché du dos. Construit l'épaisseur et la densité musculaire.",tips:["Buste à 45°","Tire vers le nombril","Pince les omoplates"],muscles_detail:"Grand dorsal, rhomboïdes, trapèzes, biceps, deltoïde postérieur",erreurs:["Dos arrondi","Trop d'élan avec le dos","Tirer trop haut vers la poitrine"],conseil:"Imagine que tes bras sont des crochets — c'est le dos qui fait le travail.",alternatives:["dbRow","latpull"]},

latpull:{name:"Tirage vertical poulie",emoji:"⛵",muscle:"Grand dorsal",muscleGroup:"back",cat:"compound",tempo:{d:3,h:1,u:2},rest:75,sets:3,reps:"10-12",req:["cables"],bodyweight:false,why:"Excellent pour la largeur du dos quand les tractions sont trop difficiles.",tips:["Tire vers le sternum","Penche légèrement le buste"],muscles_detail:"Grand dorsal, biceps, rhomboïdes",erreurs:["Tirer derrière la nuque — dangereux","Trop d'élan"],conseil:"Prise large pour la largeur, prise neutre pour plus de grand dorsal.",alternatives:["pullup","australianRow"]},

curl:{name:"Curl barre",emoji:"💥",muscle:"Biceps",muscleGroup:"biceps",cat:"compound",tempo:{d:3,h:1,u:2},rest:75,sets:3,reps:"8-10",req:["barbell"],bodyweight:false,why:"Le classique absolu. Charge maximale possible sur le biceps.",tips:["Coudes FIXES contre le corps","Pas d'élan avec le dos"],muscles_detail:"Biceps brachial, brachial antérieur, supinateur",erreurs:["Élan avec le dos","Coudes qui avancent","Pas d'extension complète en bas"],conseil:"La descente lente (3s) est plus importante que la montée pour la croissance.",alternatives:["dbCurl","hammercurl"]},

dbCurl:{name:"Curl haltères alterné",emoji:"💥",muscle:"Biceps",muscleGroup:"biceps",cat:"compound",tempo:{d:3,h:1,u:2},rest:60,sets:3,reps:"10-12",req:["dumbbell"],bodyweight:false,why:"La rotation supination maximise la contraction du biceps.",tips:["Tourne le poignet en montant","Coudes fixes"],muscles_detail:"Biceps brachial, brachial antérieur",erreurs:["Pas de rotation","Trop vite"],conseil:"Fais une pause d'1 seconde en haut avec contraction maximale.",alternatives:["curl","hammercurl"]},

hammercurl:{name:"Curl marteau",emoji:"🔨",muscle:"Brachial antérieur",muscleGroup:"biceps",cat:"compound",tempo:{d:3,h:1,u:2},rest:60,sets:3,reps:"10-12",req:["dumbbell"],bodyweight:false,why:"Développe le brachial SOUS le biceps — ce qui pousse le biceps vers le haut visuellement.",tips:["Prise neutre — pouce vers le haut","Mouvement strict"],muscles_detail:"Brachial antérieur, biceps brachial, brachio-radial",erreurs:["Tourner le poignet","Élan"],conseil:"Le brachial est souvent négligé mais c'est lui qui donne la hauteur au bras.",alternatives:["curl","dbCurl"]},

ohp:{name:"Développé militaire barre",emoji:"🔥",muscle:"Épaules — ant.",muscleGroup:"shoulders",cat:"compound",tempo:{d:3,h:1,u:2},rest:120,sets:4,reps:"6-8",req:["barbell"],bodyweight:false,why:"Le roi des épaules. Sollicite les 3 faisceaux et les triceps.",tips:["Gainage abdominal fort","Coudes légèrement devant la barre"],muscles_detail:"Deltoïde antérieur, latéral et postérieur, triceps, trapèzes",erreurs:["Cambrer le dos","Tête qui avance","Pas de gainage"],conseil:"Debout est plus difficile mais plus complet qu'assis. Choisis selon ton niveau.",alternatives:["dbOhp","seatedPress"]},

dbOhp:{name:"Développé épaules haltères",emoji:"🔥",muscle:"Épaules",muscleGroup:"shoulders",cat:"compound",tempo:{d:3,h:1,u:2},rest:90,sets:3,reps:"8-10",req:["dumbbell"],bodyweight:false,why:"Plus de liberté de mouvement que la barre. Active mieux les stabilisateurs.",tips:["Rotation externe en haut","Coudes à 90° en bas"],muscles_detail:"Deltoïde antérieur et latéral, triceps, trapèzes supérieurs",erreurs:["Coudes trop en avant","Pas de rotation"],conseil:"Idéal si tu as des douleurs aux épaules avec la barre.",alternatives:["ohp","lateral"]},

lateral:{name:"Élévations latérales",emoji:"🕊️",muscle:"Épaules — lat.",muscleGroup:"shoulders",cat:"isolation",tempo:{d:3,h:1,u:2},rest:60,sets:4,reps:"12-15",req:["dumbbell"],bodyweight:false,why:"THE exercice pour la largeur des épaules. Aucun substitut possible.",tips:["Monte à l'horizontale seulement","Pouce légèrement vers le bas","Pas d'élan"],muscles_detail:"Deltoïde latéral — isolation pure",erreurs:["Monter trop haut (>épaule)","Trop d'élan","Coudes trop fléchis"],conseil:"Poids très léger. 5-7kg suffisent pour la plupart. La qualité prime sur la charge.",alternatives:["cableLateral","facePull"]},

rearDelt:{name:"Oiseau — faisceau postérieur",emoji:"🦅",muscle:"Épaules — post.",muscleGroup:"shoulders",cat:"isolation",tempo:{d:3,h:1,u:2},rest:60,sets:3,reps:"12-15",req:["dumbbell"],bodyweight:false,why:"Le faisceau postérieur est toujours négligé. Crucial pour l'équilibre et la santé des épaules.",tips:["Buste à 90°","Pince les omoplates en haut"],muscles_detail:"Deltoïde postérieur, rhomboïdes, trapèze moyen",erreurs:["Buste pas assez penché","Élan avec le corps","Pas de contraction"],conseil:"Fais-le en fin de séance. Un faisceau postérieur fort prévient 80% des blessures d'épaule.",alternatives:["facePull","cableRearDelt"]},

facePull:{name:"Face Pull câble",emoji:"🎯",muscle:"Épaules post. · Trapèzes",muscleGroup:"shoulders",cat:"compound",tempo:{d:3,h:2,u:2},rest:60,sets:3,reps:"15-20",req:["cables"],bodyweight:false,why:"Indispensable pour la santé des épaules. Corrige les déséquilibres antérieur/postérieur.",tips:["Rotation externe maximale","Tire vers le visage"],muscles_detail:"Deltoïde postérieur, sus-épineux, infra-épineux, rhomboïdes",erreurs:["Rotation externe insuffisante","Trop de poids"],conseil:"À faire CHAQUE séance si possible. Protège l'articulation de l'épaule à long terme.",alternatives:["rearDelt","cableRearDelt"]},

frontRaise:{name:"Élévations frontales",emoji:"⬆️",muscle:"Épaules — ant.",muscleGroup:"shoulders",cat:"isolation",tempo:{d:3,h:1,u:2},rest:60,sets:3,reps:"12-15",req:["dumbbell"],bodyweight:false,why:"Isole le faisceau antérieur souvent déjà très sollicité par les développés.",tips:["Hauteur d'épaule maximum","Pas d'élan"],muscles_detail:"Deltoïde antérieur, grand pectoral chef claviculaire",erreurs:["Monter trop haut","Élan","Trop lourd"],conseil:"Le faisceau antérieur est déjà très travaillé. Poids léger et strict.",alternatives:["ohp","dbOhp"]},

squat:{name:"Squat barre",emoji:"🦵",muscle:"Quadriceps · Fessiers",muscleGroup:"legs",cat:"compound",tempo:{d:3,h:1,u:2},rest:180,sets:4,reps:"6-8",req:["barbell"],bodyweight:false,why:"Le roi des exercices de jambes. Sollicite quadriceps, fessiers, ischio-jambiers et dos.",tips:["Genoux dans l'axe des orteils","Descends jusqu'au parallèle minimum","Dos droit"],muscles_detail:"Quadriceps, grand fessier, ischio-jambiers, mollets, érecteurs du rachis",erreurs:["Genoux qui rentrent","Dos qui arrondit","Pas assez profond","Talons qui décollent"],conseil:"La profondeur est clé. Mieux vaut moins lourd et profond que lourd et partiel.",alternatives:["gobletSquat","legpress","bwSquat"]},

legpress:{name:"Presse à cuisses",emoji:"🦿",muscle:"Quadriceps · Fessiers",muscleGroup:"legs",cat:"compound",tempo:{d:3,h:1,u:2},rest:90,sets:4,reps:"10-12",req:["machines"],bodyweight:false,why:"Permet de surcharger les jambes en sécurité. Complémentaire au squat.",tips:["Pieds largeur d'épaules","Ne verrouille pas les genoux"],muscles_detail:"Quadriceps, grand fessier, ischio-jambiers selon position des pieds",erreurs:["Genoux qui rentrent","Fesses qui décollent","Amplitude trop courte"],conseil:"Pieds hauts = plus de fessiers. Pieds bas = plus de quadriceps.",alternatives:["squat","gobletSquat"]},

rdl:{name:"Soulevé jambes tendues",emoji:"🎖️",muscle:"Ischio-jambiers",muscleGroup:"legs",cat:"compound",tempo:{d:3,h:1,u:2},rest:90,sets:3,reps:"10-12",req:["barbell"],bodyweight:false,why:"Le meilleur exercice pour les ischio-jambiers. Étirement et contraction maximaux.",tips:["DOS ABSOLUMENT PLAT","Descends jusqu'à sentir l'étirement"],muscles_detail:"Ischio-jambiers, grand fessier, érecteurs du rachis",erreurs:["Dos arrondi — très dangereux","Genoux trop fléchis","Barre trop loin du corps"],conseil:"Jamais de charge lourde si le dos n'est pas parfaitement plat.",alternatives:["legcurl","sumoRdl"]},

lunge:{name:"Fentes marchées",emoji:"⚔️",muscle:"Quadriceps · Fessiers",muscleGroup:"legs",cat:"bodyweight",tempo:{d:3,h:0,u:2},rest:75,sets:3,reps:"10/côté",req:[],bodyweight:true,why:"Corrige les déséquilibres entre jambes. Travail unilateral excellent.",tips:["Grand pas en avant","Genou arrière proche du sol","Torse droit"],muscles_detail:"Quadriceps, grand fessier, ischio-jambiers, stabilisateurs",erreurs:["Pas trop court","Genou avant qui dépasse les orteils","Torse penché"],conseil:"Commence sans poids, maîtrise le mouvement puis ajoute des haltères.",alternatives:["bwSquat","gobletSquat"]},

legcurl:{name:"Leg Curl couché",emoji:"🦵",muscle:"Ischio-jambiers",muscleGroup:"legs",cat:"isolation",tempo:{d:3,h:2,u:2},rest:60,sets:3,reps:"12-15",req:["machines"],bodyweight:false,why:"Isolation complète des ischio-jambiers. Complémentaire au soulevé de terre.",tips:["Contraction maximale en haut","Descente lente"],muscles_detail:"Ischio-jambiers, gastrocnémien",erreurs:["Hanches qui se soulèvent","Amplitude insuffisante"],conseil:"Fais une pause de 2s en contraction maximale pour plus d'efficacité.",alternatives:["rdl","nordicCurl"]},

calf:{name:"Mollets machine",emoji:"🏃",muscle:"Mollets",muscleGroup:"legs",cat:"isolation",tempo:{d:3,h:2,u:2},rest:45,sets:4,reps:"15-20",req:["machines"],bodyweight:false,why:"Les mollets ont besoin de volume élevé car ce sont des muscles posturaux très endurants.",tips:["Amplitude maximale","Pause 1s en haut"],muscles_detail:"Gastrocnémien, soléaire",erreurs:["Amplitude trop courte","Rebond en bas"],conseil:"Les mollets récupèrent vite. Tu peux les faire 3-4x par semaine.",alternatives:["bwCalf","seatedCalf"]},

bwCalf:{name:"Mollets poids du corps",emoji:"🏃",muscle:"Mollets",muscleGroup:"legs",cat:"isolation",tempo:{d:3,h:2,u:2},rest:45,sets:4,reps:"25-30",req:[],bodyweight:true,why:"Sans matériel. Aussi efficace avec assez de volume.",tips:["Amplitude maximale","Pause 1s en haut"],muscles_detail:"Gastrocnémien, soléaire",erreurs:["Trop vite","Amplitude insuffisante"],conseil:"Fais-le sur une marche pour plus d'amplitude.",alternatives:["calf","seatedCalf"]},

pushup:{name:"Pompes classiques",emoji:"✊",muscle:"Pectoraux · Triceps",muscleGroup:"chest",cat:"bodyweight",tempo:{d:3,h:1,u:2},rest:60,sets:4,reps:"12-20",req:[],bodyweight:true,why:"Le fondamental absolu. Partout, sans matériel, toujours efficace.",tips:["Corps parfaitement aligné","Coudes à 45°"],muscles_detail:"Grand pectoral, triceps, deltoïde antérieur, stabilisateurs du core",erreurs:["Hanches qui s'affaissent","Coudes trop écartés à 90°","Amplitude insuffisante"],conseil:"Trop facile ? Surélève les pieds. Trop difficile ? Genoux au sol.",alternatives:["bench","dbBench","diamondPushup"]},

diamondPushup:{name:"Pompes diamant",emoji:"💎",muscle:"Triceps",muscleGroup:"triceps",cat:"bodyweight",tempo:{d:3,h:1,u:2},rest:60,sets:3,reps:"10-15",req:[],bodyweight:true,why:"Triceps maximaux sans matériel.",tips:["Mains en diamant sous la poitrine","Coudes proches du corps"],muscles_detail:"Triceps brachial — tous les chefs, grand pectoral",erreurs:["Coudes qui s'écartent","Hanches qui se soulèvent"],conseil:"Si trop difficile, commence avec les genoux au sol.",alternatives:["triceppush","skullcrush"]},

australianRow:{name:"Traction australienne",emoji:"🌊",muscle:"Dos moyen",muscleGroup:"back",cat:"compound",tempo:{d:3,h:1,u:2},rest:75,sets:3,reps:"10-15",req:["pullupbar"],bodyweight:true,why:"Idéal pour progresser vers les vraies tractions. Excellent pour le dos moyen.",tips:["Corps en planche rigide","Tire les coudes vers les hanches"],muscles_detail:"Grand dorsal, rhomboïdes, biceps, deltoïde postérieur",erreurs:["Hanches qui s'affaissent","Amplitude insuffisante"],conseil:"Plus tu inclines le corps horizontalement, plus c'est difficile.",alternatives:["pullup","latpull"]},

dbRow:{name:"Rowing haltère unilatéral",emoji:"🌊",muscle:"Dos",muscleGroup:"back",cat:"compound",tempo:{d:3,h:1,u:2},rest:75,sets:3,reps:"10-12",req:["dumbbell"],bodyweight:false,why:"Corrige les déséquilibres gauche/droite. Grande amplitude de mouvement.",tips:["Genou sur le banc","Tire le coude vers le plafond"],muscles_detail:"Grand dorsal, rhomboïdes, trapèze moyen, biceps",erreurs:["Rotation du buste","Élan","Coude trop latéral"],conseil:"Tire le coude vers le plafond, pas vers l'arrière.",alternatives:["row","latpull"]},

gobletSquat:{name:"Goblet Squat",emoji:"🦵",muscle:"Quadriceps",muscleGroup:"legs",cat:"compound",tempo:{d:3,h:1,u:2},rest:90,sets:3,reps:"12-15",req:["dumbbell"],bodyweight:false,why:"Parfait pour apprendre la technique du squat. Très accessible.",tips:["Descends profond","Coudes entre les genoux"],muscles_detail:"Quadriceps, grand fessier, ischio-jambiers",erreurs:["Talons qui décollent","Dos arrondi"],conseil:"Idéal en échauffement avant le squat barre.",alternatives:["squat","bwSquat","legpress"]},

bwSquat:{name:"Squat poids du corps",emoji:"🦵",muscle:"Quadriceps",muscleGroup:"legs",cat:"bodyweight",tempo:{d:3,h:1,u:2},rest:60,sets:4,reps:"20-25",req:[],bodyweight:true,why:"Le fondamental des jambes sans matériel.",tips:["Genoux dans l'axe","Descends profond"],muscles_detail:"Quadriceps, grand fessier, ischio-jambiers",erreurs:["Genoux qui rentrent","Dos arrondi"],conseil:"Pour progresser, ajoute des pauses de 3s en bas.",alternatives:["gobletSquat","lunge"]},

hipThrust:{name:"Hip Thrust barre",emoji:"🍑",muscle:"Grand fessier",muscleGroup:"glutes",cat:"compound",tempo:{d:2,h:2,u:2},rest:90,sets:4,reps:"10-12",req:["barbell","bench"],bodyweight:false,why:"Le meilleur exercice biomécanique pour les fessiers.",tips:["Contracte fort 2s en haut","Pousse avec les talons"],muscles_detail:"Grand fessier, ischio-jambiers, adducteurs",erreurs:["Extension lombaire excessive","Pas de contraction en haut","Pieds trop proches"],conseil:"La contraction de 2s en haut est la clé de l'efficacité.",alternatives:["bwHipThrust","gluteBridge"]},

bwHipThrust:{name:"Hip Thrust sol",emoji:"🍑",muscle:"Grand fessier",muscleGroup:"glutes",cat:"bodyweight",tempo:{d:2,h:2,u:2},rest:60,sets:4,reps:"15-20",req:[],bodyweight:true,why:"Version sans matériel. Excellent pour activer les fessiers.",tips:["Pousse avec les talons","Contracte fort en haut"],muscles_detail:"Grand fessier, ischio-jambiers",erreurs:["Lombaires qui compensent","Pieds trop proches des fesses"],conseil:"Ajoute une résistance avec un élastique pour progresser.",alternatives:["hipThrust","gluteBridge"]},

gluteBridge:{name:"Pont Fessier",emoji:"🍑",muscle:"Grand fessier",muscleGroup:"glutes",cat:"bodyweight",tempo:{d:2,h:2,u:2},rest:45,sets:3,reps:"15-20",req:[],bodyweight:true,why:"Activation parfaite des fessiers. Idéal en échauffement.",tips:["Contracte fort en haut","Pieds à plat"],muscles_detail:"Grand fessier, ischio-jambiers, stabilisateurs lombaires",erreurs:["Extension trop lombaire","Pas de contraction"],conseil:"Parfait en échauffement avant squats et fentes.",alternatives:["hipThrust","bwHipThrust"]},

plank:{name:"Gainage frontal",emoji:"🧱",muscle:"Transverse · Core",muscleGroup:"abs",cat:"bodyweight",tempo:{d:0,h:0,u:0},rest:45,sets:3,reps:"45-60 sec",req:[],bodyweight:true,why:"Le gainage profond protège la colonne. Indispensable pour tous les exercices.",tips:["Corps parfaitement aligné","Rentre le nombril","Respire"],muscles_detail:"Transverse de l'abdomen, obliques, érecteurs du rachis, fessiers",erreurs:["Hanches trop hautes ou trop basses","Apnée","Tête dans le cou"],conseil:"Mieux vaut 30s parfait que 60s en mauvaise position.",alternatives:["sidePlank","hollowBody"]},

crunch:{name:"Crunch classique",emoji:"🎯",muscle:"Grand droit — haut",muscleGroup:"abs",cat:"bodyweight",tempo:{d:2,h:1,u:2},rest:45,sets:3,reps:"15-20",req:[],bodyweight:true,why:"Isolation de la partie haute du grand droit.",tips:["Expire en contractant","Lombaires au sol","Regard vers le plafond"],muscles_detail:"Grand droit de l'abdomen — partie supérieure",erreurs:["Tirer sur la nuque","Lombaires qui décollent","Trop d'amplitude"],conseil:"L'amplitude est courte — c'est normal. Ce qui compte c'est la contraction.",alternatives:["legRaise","hollowBody"]},

legRaise:{name:"Élévations de jambes",emoji:"🦵",muscle:"Grand droit — bas",muscleGroup:"abs",cat:"bodyweight",tempo:{d:3,h:1,u:2},rest:45,sets:3,reps:"12-15",req:[],bodyweight:true,why:"La partie basse du grand droit est très difficile à cibler.",tips:["Dos collé au sol","Jambes légèrement fléchies"],muscles_detail:"Grand droit partie inférieure, iliopsoas, transverse",erreurs:["Dos qui se décolle","Balancement","Trop vite"],conseil:"Si trop difficile, fléchis les genoux pour réduire le bras de levier.",alternatives:["crunch","hangingLegRaise"]},

russianTwist:{name:"Russian Twist",emoji:"🔄",muscle:"Obliques",muscleGroup:"abs",cat:"bodyweight",tempo:{d:2,h:0,u:2},rest:45,sets:3,reps:"20 (10/côté)",req:[],bodyweight:true,why:"Les deux couches d'obliques en un seul mouvement.",tips:["Pieds levés pour plus d'intensité","Rotation vient du buste"],muscles_detail:"Obliques externes et internes, transverse",erreurs:["Rotation des hanches au lieu du buste","Trop vite"],conseil:"Ajoute un haltère ou un disque pour progresser.",alternatives:["sidePlank","obliqueCrunch"]},

sidePlank:{name:"Gainage latéral",emoji:"⬡",muscle:"Obliques",muscleGroup:"abs",cat:"bodyweight",tempo:{d:0,h:0,u:0},rest:45,sets:3,reps:"30-45 sec/côté",req:[],bodyweight:true,why:"Les obliques et les muscles profonds latéraux en isométrie.",tips:["Hanches bien levées","Corps en ligne droite"],muscles_detail:"Obliques, carré des lombes, gluteus medius",erreurs:["Hanches qui s'affaissent","Corps pas aligné"],conseil:"Plus difficile ? Lève la jambe du dessus.",alternatives:["plank","russianTwist"]},

mountainClimber:{name:"Mountain Climbers",emoji:"🧗",muscle:"Abdos · Cardio",muscleGroup:"abs",cat:"bodyweight",tempo:{d:0,h:0,u:0},rest:30,sets:3,reps:"30 sec",req:[],bodyweight:true,why:"Gainage dynamique + cardio. Brûle des calories tout en renforçant le core.",tips:["Hanches stables","Vitesse contrôlée"],muscles_detail:"Transverse, grand droit, fléchisseurs de hanche, épaules",erreurs:["Hanches qui montent","Trop vite sans contrôle"],conseil:"Commence lentement pour maîtriser la stabilité des hanches.",alternatives:["plank","crunch"]},
};

export const GENDERS = [
{id:"male",emoji:"👨",label:"Homme",desc:"Force, volume, performance"},
{id:"female",emoji:"👩",label:"Femme",desc:"Galbe, tonicité, bien-être"},
{id:"teen",emoji:"🧒",label:"Moins de 18 ans",desc:"Programme sécurisé et progressif"},
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
{id:"first_session",name:"Premier pas",desc:"1ère séance complétée",icon:"🌱",xp:50},
{id:"streak_3",name:"3 jours d'affilée",desc:"3 jours consécutifs",icon:"🔥",xp:75},
{id:"streak_7",name:"Semaine parfaite",desc:"7 jours consécutifs",icon:"💫",xp:200},
{id:"sessions_10",name:"Habitude formée",desc:"10 séances au total",icon:"⚡",xp:100},
{id:"sessions_50",name:"Vétéran",desc:"50 séances au total",icon:"🏆",xp:500},
{id:"first_record",name:"Premier record",desc:"Bats ton premier record",icon:"📈",xp:75},
{id:"records_5",name:"Machine de progrès",desc:"5 exercices en record",icon:"🎯",xp:200},
{id:"bench_100",name:"Club des 100kg",desc:"100kg au développé couché",icon:"💪",xp:300},
{id:"squat_100",name:"Squat 100kg",desc:"100kg au squat barre",icon:"🦵",xp:300},
{id:"volume_10t",name:"10 Tonnes",desc:"10 tonnes de volume total",icon:"🏋️",xp:400},
];

export const WEEKLY = [
{id:"w1",name:"5 séances cette semaine",icon:"📅",xp:150,target:5,type:"sessions"},
{id:"w2",name:"Bat 3 records",icon:"📈",xp:200,target:3,type:"records"},
{id:"w3",name:"Volume > 5 tonnes",icon:"🏋️",xp:175,target:5000,type:"volume"},
{id:"w4",name:"Séance > 60 min",icon:"⏱",xp:100,target:3600,type:"duration"},
{id:"w5",name:"3 jours consécutifs",icon:"🔥",xp:125,target:3,type:"streak"},
];
