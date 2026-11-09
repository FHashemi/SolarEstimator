<script lang="ts">
 export let current=0; export let go:(n:number)=>void=()=>{};
 const labels=['نوع نیروگاه','فضای احداث','تجهیزات','محاسبات تولید','محاسبات اقتصادی','گزارش‌گیری'];
</script>
<div class="stepper" aria-label="مراحل طراحی">{#each labels as label,i}<button type="button" class:active={current===i} class:done={current>i} onclick={()=>go(i)} aria-current={current===i?'step':undefined}><span class="step-number">{current>i?'✓':i+1}</span><span>{label}</span></button>{/each}</div>

