<script lang="ts">
 import {onMount}from 'svelte';
 import type{Project}from '$lib/model';
 import {newProject}from '$lib/model';
 import Header from '$lib/components/Header.svelte';
 import Stepper from '$lib/components/Stepper.svelte';
 import SystemStage from '$lib/components/SystemStage.svelte';
 import SiteStage from '$lib/components/SiteStage.svelte';
 import EquipmentStage from '$lib/components/EquipmentStage.svelte';
 import ProductionStage from '$lib/components/ProductionStage.svelte';
 import EconomicsStage from '$lib/components/EconomicsStage.svelte';
 import ReportStage from '$lib/components/ReportStage.svelte';
 let project:Project=newProject();let step=0;let loaded=false;let fileInput:HTMLInputElement;
 const KEY='solar-estimator-svelte-v1';
 onMount(()=>{try{const stored=localStorage.getItem(KEY);if(stored){const parsed=JSON.parse(stored) as Project;if(parsed&&Array.isArray(parsed.surfaces)&&parsed.layout&&parsed.finance){project=parsed;}}}catch{}loaded=true;});
 $: if(loaded){try{localStorage.setItem(KEY,JSON.stringify(project))}catch{}}
 function update(patch:Partial<Project>){project={...project,...patch};}
 function download(){const blob=new Blob([JSON.stringify(project,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='SolarEstimator_Project.json';a.click();URL.revokeObjectURL(url);}
 function newFile(){if(confirm('پروژه جدید ساخته شود؟ پروژه فعلی به‌صورت خودکار در مرورگر ذخیره شده است؛ برای نگهداری نسخه آن فایل JSON بگیرید.')){project=newProject();step=0;}}
 async function importFile(ev:Event){const file=(ev.currentTarget as HTMLInputElement).files?.[0];if(!file)return;try{const incoming=JSON.parse(await file.text());if(!incoming||!Array.isArray(incoming.surfaces)||!incoming.layout||!incoming.finance)throw new Error('Invalid project structure');project=incoming;step=0;}catch{alert('فایل پروژه JSON معتبر نیست.');}if(fileInput)fileInput.value='';}
 function go(n:number){step=Math.max(0,Math.min(5,n));window.scrollTo({top:0,behavior:'smooth'});}
</script>
<svelte:head><title>Solar Estimator — سامانه برآورد نیروگاه خورشیدی</title><meta name="description" content="سامانه برآورد فنی و اقتصادی مقدماتی نیروگاه خورشیدی با شش مرحله"/></svelte:head>
<Header onNew={newFile} onExport={download} onImport={()=>fileInput.click()}/><input class="file-hidden" type="file" accept=".json,application/json" bind:this={fileInput} onchange={importFile}/>
<main class="app-content"><div class="project-strip"><label>پروژه: <input aria-label="عنوان پروژه" value={project.name} oninput={e=>update({name:e.currentTarget.value})}/></label><span class="muted">نسخه توسعه اولیه 0.3.0-alpha · ذخیره محلی</span></div><Stepper current={step} go={go}/>
<div class="nav-row"><button type="button" class="btn btn-outline btn-small" disabled={step===0} onclick={()=>go(step-1)}>→ مرحله قبل</button><span class="step-progress">مرحله {step+1} از ۶</span><button type="button" class="btn btn-primary btn-small" disabled={step===5} onclick={()=>go(step+1)}>مرحله بعد ←</button></div>
{#if step===0}<SystemStage {project} {update}/>{:else if step===1}<SiteStage {project} {update}/>{:else if step===2}<EquipmentStage {project} {update}/>{:else if step===3}<ProductionStage {project} {update}/>{:else if step===4}<EconomicsStage {project} {update}/>{:else}<ReportStage {project} onExport={download}/>{/if}
</main>
<footer class="footer">Solar Estimator · برآورد اولیه غیرقابل استفاده به‌عنوان نقشه اجرایی بدون تأیید مهندس طراح · آزمایش و تأیید دیتاشیت‌ها ضروری است.</footer>

