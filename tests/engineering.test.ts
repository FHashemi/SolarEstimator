import {describe,it,expect}from 'vitest';
import {newProject}from '../src/lib/model';
import {panels,inverters}from '../src/lib/data/equipment';
import {areaStats,design,energy,economics,normalizedNumber,polygonAreaUTM}from '../src/lib/engine/calculate';

describe('Engineering estimators',()=>{
 it('reads Persian and Arabic-Indic digits',()=>{expect(normalizedNumber('۱۲٫۵')).toBe(12.5);expect(normalizedNumber('١٢.٥')).toBe(12.5);});
 it('calculates polygon area in UTM meters',()=>expect(polygonAreaUTM('0,0\n10,0\n10,10\n0,10')).toBe(100));
 it('matches datasheets',()=>{const p=panels.find(x=>x.powerW===710)!;expect(p.imp).toBe(17.36);expect(p.voc).toBe(49);const inv=inverters.find(x=>x.acKw===25)!;expect(inv.inputCurrentA).toBe(26);});
 it('recomputes area and panel sizing',()=>{const p=newProject();const a=areaStats(p);expect(a.gross).toBe(240);expect(a.usable).toBe(180);const d=design(p);expect(d.installedPanels).toBe(40);expect(d.errors).toEqual([]);});
 it('flags 2 parallel Trina 710 W strings per MPPT with 26A limit',()=>{const p=newProject();p.layout.mode='manual';p.layout.series=20;p.layout.panelCount=120;p.layout.inverterCount=1;p.surfaces[0].lengthM=100;p.surfaces[0].widthM=100;const d=design(p);expect(d.errors.some(e=>e.includes('جریان کاری'))).toBe(true);});
 it('changes production with irradiation',()=>{const p=newProject();const first=energy(p).annual;p.climate.psh=p.climate.psh.map(v=>v*1.2);expect(energy(p).annual).toBeGreaterThan(first);});
 it('requires prices before claiming ROI/NPV',()=>{const p=newProject();expect(economics(p).ready).toBe(false);p.panelPrice=5000000;p.inverterPrice=90000000;p.finance.tariffFit=50000;const e=economics(p);expect(e.ready).toBe(true);expect(e.rows).toHaveLength(20);expect(Number.isFinite(e.npv)).toBe(true);});
});

