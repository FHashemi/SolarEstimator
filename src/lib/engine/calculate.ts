import type { Project,PVModule,Inverter } from '../model';
import {DAYS,MONTHS_FA} from '../model';
import {panels,inverters} from '../data/equipment';
export const num=(n:number, digits=0)=> Number.isFinite(n)?new Intl.NumberFormat('fa-IR',{maximumFractionDigits:digits}).format(n):'—';
export const price=(n:number)=>`${num(n)} ریال`;
export const normalizedNumber=(value:string):number=>Number(value.replace(/[۰-۹]/g,c=>String('۰۱۲۳۴۵۶۷۸۹'.indexOf(c))).replace(/[٠-٩]/g,c=>String('٠١٢٣٤٥٦٧٨٩'.indexOf(c))).replace(/[٬,]/g,'').replace('٫','.'));
export const getPanel=(p:Project):PVModule|undefined=>[...panels,...p.customPanels].find(m=>m.id===p.panelId);
export const getInverter=(p:Project):Inverter|undefined=>[...inverters,...p.customInverters].find(m=>m.id===p.inverterId);
export const surfaceAreas=(p:Project)=>p.surfaces.map(s=>({name:s.name,gross:s.lengthM*s.widthM,usable:s.lengthM*s.widthM*s.usablePct/100}));
export const areaStats=(p:Project)=>surfaceAreas(p).reduce((v,s)=>({gross:v.gross+s.gross,usable:v.usable+s.usable}),{gross:0,usable:0});
export function polygonAreaUTM(raw:string):number|null {try{const pts=raw.trim().split(/\n+/).map(line=>line.trim().split(/[,;\s]+/).map(Number));if(pts.length<3||pts.some(x=>x.length!==2||x.some(v=>!Number.isFinite(v))))return null;return Math.abs(pts.reduce((s,p,i)=>s+p[0]*pts[(i+1)%pts.length][1]-pts[(i+1)%pts.length][0]*p[1],0))/2;}catch{return null}}
export type Design = { panel?:PVModule; inverter?:Inverter; maxAreaCount:number; panelCount:number; series:number; strings:number; installedPanels:number; inverters:number; dcKw:number; acKw:number; ratio:number|null; vCold:number|null; vHotApprox:number|null; impPerMppt:number|null; iscPerMppt:number|null; warnings:string[]; errors:string[] };
export function design(p:Project):Design {
 const panel=getPanel(p),inverter=getInverter(p);const warnings:string[]=[];const errors:string[]=[];const area=areaStats(p).usable;
 if(!panel)errors.push('مدل پنل انتخاب نشده است');if(!inverter)errors.push('مدل اینورتر انتخاب نشده است');
 const maxAreaCount=panel?Math.floor(area*p.layout.packingFactor/(panel.lengthMm*panel.widthMm/1e6)):0;
 const count=p.layout.mode==='auto'?maxAreaCount:Math.max(0,Math.floor(p.layout.panelCount));
 const series=Math.max(1,Math.floor(p.layout.series));const strings=Math.floor(count/series);const installedPanels=strings*series;
 const invCount=Math.max(1,Math.floor(p.layout.inverterCount));const dcKw=panel?installedPanels*panel.powerW/1000:0;const acKw=inverter?invCount*inverter.acKw:0;
 if(count>maxAreaCount)errors.push('تعداد پنل از ظرفیت مساحتی تقریبی فراتر است');
 if(count>0&&strings===0)errors.push('پنل برای تشکیل حتی یک رشته کامل کافی نیست');
 if(count!==installedPanels)warnings.push(`${num(count-installedPanels)} پنل باقیمانده در آرایش رشته‌ای محاسبه نشده‌اند`);
 if(p.layout.mode==='auto')warnings.push('چیدمان خودکار فعلاً مبتنی بر مساحت و ضریب تراکم است؛ مکان واقعی پنل‌ها و سایه کنترل نشده‌اند');
 if(!p.climate.verified)warnings.push('داده‌های PSH نمونه هستند و بر اساس مختصات محل استعلام نشده‌اند');
 let vCold:null|number=null,vHotApprox:null|number=null,impPerMppt:null|number=null,iscPerMppt:null|number=null;
 if(panel&&inverter){
  if(p.system!==inverter.type && !(p.system==='offgrid'&&inverter.type==='hybrid'))errors.push('نوع اینورتر با نوع نیروگاه انتخاب‌شده سازگار نیست');
  vCold=series*panel.voc*(1+panel.tempVocPct/100*(p.layout.ambientColdC-25));
  // Only a reference STC voltage: a reliable hot-temperature Vmp coefficient is not supplied.
  vHotApprox=series*panel.vmp;
  if(vCold>=inverter.maxVdc)errors.push('ولتاژ مدار باز رشته در سرما از حداکثر DC اینورتر عبور می‌کند');
  if(vHotApprox<inverter.mpptMin||vHotApprox>inverter.mpptMax)errors.push('Vmp در شرایط STC خارج از محدوده MPPT اینورتر است');
  warnings.push('Vmp در دمای بالای سلول قابل تأیید نیست؛ ضریب دمایی Vmp در دیتاشیت‌های موجود مشخص نشده است');
  const perTracker=Math.ceil(strings/(inverter.mpptCount*invCount));impPerMppt=perTracker*panel.imp;iscPerMppt=perTracker*panel.isc;
  if(perTracker>inverter.stringsPerMppt)errors.push('تعداد رشته‌های موازی از ورودی مجاز MPPT بیشتر است');
  if(impPerMppt>inverter.inputCurrentA)errors.push('جریان کاری کل رشته‌های MPPT از ظرفیت اینورتر بیشتر است');
  if(iscPerMppt>inverter.shortCircuitCurrentA)errors.push('جریان اتصال کوتاه MPPT از ظرفیت اینورتر بیشتر است');
 }
 const ratio=acKw>0?dcKw/acKw:null;
 if(ratio!==null&&(ratio<0.8||ratio>1.4))warnings.push('نسبت DC/AC خارج از محدوده راهنمای اولیه ۰٫۸ تا ۱٫۴ است؛ حد قطعی باید از سازنده تعیین شود');
 return {panel,inverter,maxAreaCount,panelCount:count,series,strings,installedPanels,inverters:invCount,dcKw,acKw,ratio,vCold,vHotApprox,impPerMppt,iscPerMppt,warnings,errors};
}
export function energy(p:Project,d=design(p)) { const monthly=p.climate.psh.map((psh,i)=> d.errors.length?0:Math.max(0,d.dcKw*psh*DAYS[i]*(1-p.climate.lossesPct/100)*p.climate.orientationFactor));const annual=monthly.reduce((a,b)=>a+b,0);return {monthly,annual,specific:d.dcKw>0?annual/d.dcKw:0,capacityFactor:d.acKw>0?annual/(d.acKw*8760)*100:0,labels:MONTHS_FA}; }
export const otherItemsCost=(p:Project)=>p.extras.reduce((s,x)=>s+Math.max(0,x.quantity)*Math.max(0,x.unitPrice),0);
export function economics(p:Project,d=design(p),e=energy(p,d)) {
 const capex=d.installedPanels*p.panelPrice+d.inverters*p.inverterPrice+otherItemsCost(p)+p.finance.otherCapex;
 const priceComplete=p.panelPrice>0&&p.inverterPrice>0;
 const f=p.finance;const self=p.system==='offgrid'?1:p.system==='hybrid'?p.load.selfUsePct/100:0;
 const exportKwh=e.annual*(1-self);const selfKwh=e.annual*self;
 const exportTariff=f.mode==='FIT'?f.tariffFit:f.mode==='GREEN'?f.tariffGreen:f.mode==='MIX'?(f.tariffFit*(1-f.greenSharePct/100)+f.tariffGreen*f.greenSharePct/100):0;
 const value=exportKwh*exportTariff+selfKwh*f.valueSelf;
 const ready=priceComplete&&capex>0&&e.annual>0&&(exportKwh===0||exportTariff>0)&&(selfKwh===0||f.valueSelf>0)&&d.errors.length===0;
 const cashflows=[-capex];const rows:{year:number;energy:number;revenue:number;cost:number;net:number;cumulative:number}[]=[];let cumulative=-capex;
 for(let y=1;y<=20;y++){const deg=Math.pow(1-f.annualDegradationPct/100,y-1);const kwh=e.annual*deg;const gross=value*deg*Math.pow(1+f.annualGrowthPct/100,y-1);const replacement=y===f.replacementYear?capex*f.replacementPct/100:0;const cost=capex*f.opexPct/100+replacement;const net=gross-cost;cashflows.push(net);cumulative+=net;rows.push({year:y,energy:kwh,revenue:gross,cost,net,cumulative});}
 const npv=(rate:number)=>cashflows.reduce((total,cf,t)=>total+cf/Math.pow(1+rate,t),0);
 const discount=f.discountPct/100;const netPresent=npv(discount);
 let irr:null|number=null; if(ready){let low=-0.95,high=10;if(npv(low)*npv(high)<0){for(let i=0;i<150;i++){const m=(low+high)/2;if(npv(m)>0)low=m;else high=m;}irr=(low+high)/2*100;}}
 let payback:null|number=null;const threshold=rows.findIndex(r=>r.cumulative>=0);if(threshold>=0){const before=threshold?rows[threshold-1].cumulative:-capex;payback=threshold+(0-before)/(rows[threshold].net||1);}
 const rateCash=1+discount;const pvEnergy=rows.reduce((s,r)=>s+r.energy/Math.pow(rateCash,r.year),0);
 const pvOpex=rows.reduce((s,r)=>s+r.cost/Math.pow(rateCash,r.year),0);
 return {ready,capex,annualRevenue:value,annualNet:value-capex*f.opexPct/100,rows,cashflows,npv:netPresent,irr,payback,lcoe:pvEnergy>0?(capex+pvOpex)/pvEnergy:null,exportKwh,selfKwh};
}

