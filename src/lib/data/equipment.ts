import type {PVModule,Inverter} from '../model';
const trinaOld=[
[645,37.5,17.23,45.3,18.31,20.8],[650,37.7,17.27,45.5,18.35,20.9],[655,37.9,17.31,45.7,18.40,21.1],[660,38.1,17.35,45.9,18.45,21.2],[665,38.3,17.39,46.1,18.50,21.4]
];
const trinaNew=[
[695,40.3,17.25,48.3,18.28,22.4],[700,40.5,17.29,48.6,18.32,22.5],[705,40.7,17.33,48.8,18.36,22.7],[710,40.9,17.36,49.0,18.40,22.9],[715,41.1,17.40,49.2,18.44,23.0],[720,41.3,17.44,49.4,18.49,23.2]
];
export const panels:PVModule[]=[...trinaOld.map(v=>({id:`trina-${v[0]}`,brand:'Trina Solar',model:`TSM-DEG21C.20-${v[0]}`,powerW:v[0],lengthMm:2384,widthMm:1303,vmp:v[1],imp:v[2],voc:v[3],isc:v[4],efficiencyPct:v[5],tempVocPct:-0.25,tempPowerPct:-0.34,source:'Datasheet Vertex DEG21C.20 (2022)',verified:true} as PVModule)),...trinaNew.map(v=>({id:`trina-${v[0]}`,brand:'Trina Solar',model:`TSM-NEG21C.20-${v[0]}`,powerW:v[0],lengthMm:2384,widthMm:1303,vmp:v[1],imp:v[2],voc:v[3],isc:v[4],efficiencyPct:v[5],tempVocPct:-0.24,tempPowerPct:-0.29,source:'Datasheet Vertex N NEG21C.20 (2024)',verified:true} as PVModule))];
export const inverters:Inverter[]=[25,30,33,36,40].map(kw=>({id:`growatt-mid-${kw}`,brand:'Growatt',model:`MID ${kw}KTL3-X`,type:'grid',acKw:kw,mpptCount:kw<=33?3:4,stringsPerMppt:2,mpptMin:200,mpptMax:1000,maxVdc:1100,inputCurrentA:26,shortCircuitCurrentA:32,efficiencyPct:98.5,phase:'three',source:'Growatt MID 25–40KTL3-X preliminary datasheet',verified:true}));

