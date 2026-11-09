export type SystemType = 'grid' | 'hybrid' | 'offgrid';
export type SiteType = 'shed' | 'roof' | 'ground';
export type PanelDirection = 'portrait' | 'landscape';
export type MoneyMode = 'FIT' | 'GREEN' | 'SELF' | 'MIX';
export type Surface = { id:string; name:string; type:SiteType; lengthM:number; widthM:number; tiltDeg:number; azimuthDeg:number; usablePct:number };
export type PVModule = { id:string; brand:string; model:string; powerW:number; lengthMm:number; widthMm:number; voc:number; vmp:number; isc:number; imp:number; tempVocPct:number; tempPowerPct:number; efficiencyPct:number; source:string; verified:boolean };
export type Inverter = { id:string; brand:string; model:string; type:SystemType; acKw:number; mpptCount:number; stringsPerMppt:number; mpptMin:number; mpptMax:number; maxVdc:number; inputCurrentA:number; shortCircuitCurrentA:number; efficiencyPct:number; phase:'single'|'three'; source:string; verified:boolean };
export type ExtraItem = { id:string; type:string; title:string; unit:string; quantity:number; unitPrice:number };
export type Project = {
  id:string; name:string; system:SystemType; surfaces:Surface[]; latitude:number|null; longitude:number|null; elevationM:number|null; utmZone:string; utmPolygon:string;
  layout:{ mode:'auto'|'manual'; direction:PanelDirection; panelCount:number; series:number; inverterCount:number; ambientColdC:number; ambientHotC:number; packingFactor:number };
  panelId:string; inverterId:string; customPanels:PVModule[]; customInverters:Inverter[]; panelPrice:number; inverterPrice:number; extras:ExtraItem[];
  load:{ criticalKw:number; backupHours:number; batteryUsableKwh:number; dailyConsumptionKwh:number; selfUsePct:number };
  climate:{ psh:number[]; lossesPct:number; orientationFactor:number; verified:boolean };
  finance:{ mode:MoneyMode; tariffFit:number; tariffGreen:number; valueSelf:number; greenSharePct:number; annualGrowthPct:number; annualDegradationPct:number; opexPct:number; discountPct:number; otherCapex:number; replacementYear:number; replacementPct:number };
};
export const MONTHS_FA=['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
export const DAYS=[31,31,31,31,31,31,30,30,30,30,30,29];
export const nowId=()=>`item-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
export function newProject():Project { return {
 id:nowId(),name:'پروژه جدید نیروگاه خورشیدی',system:'grid',surfaces:[{id:nowId(),name:'سطح ۱',type:'roof',lengthM:20,widthM:12,tiltDeg:0,azimuthDeg:180,usablePct:75}],latitude:null,longitude:null,elevationM:null,utmZone:'39N',utmPolygon:'',
 layout:{mode:'auto',direction:'landscape',panelCount:40,series:20,inverterCount:1,ambientColdC:-10,ambientHotC:65,packingFactor:0.82},panelId:'trina-710',inverterId:'growatt-mid-25',customPanels:[],customInverters:[],panelPrice:0,inverterPrice:0,extras:[],
 load:{criticalKw:0,backupHours:2,batteryUsableKwh:0,dailyConsumptionKwh:0,selfUsePct:0},climate:{psh:[3.5,4.5,5.5,6.2,6.4,6.1,5.5,4.8,3.8,3.2,2.8,3.1],lossesPct:14,orientationFactor:1,verified:false},
 finance:{mode:'FIT',tariffFit:0,tariffGreen:0,valueSelf:0,greenSharePct:30,annualGrowthPct:0,annualDegradationPct:0.45,opexPct:1.5,discountPct:15,otherCapex:0,replacementYear:12,replacementPct:0}
}; }

