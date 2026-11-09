<script lang="ts">
 import {num} from '../engine/calculate';
 export let values:number[]=[];
 export let suffix='';
 $: min=Math.min(0,...values);
 $: max=Math.max(1,...values);
 $: den=(max-min)||1;
 $: coords=values.map((v,i)=>`${30+(i/Math.max(1,values.length-1))*640},${200-(v-min)/den*170}`).join(' ');
</script>
<div class="line-wrap"><svg viewBox="0 0 700 245" aria-label="نمودار روند تجمعی" role="img" preserveAspectRatio="none"><path d="M30 15V200H680" fill="none" stroke="#c4cfde" stroke-width="1.5"/><path d={`M30 ${200-(0-min)/den*170} H680`} fill="none" stroke="#9bacc3" stroke-dasharray="4 4"/>{#each [0,1,2,3,4] as x}<path d={`M30 ${30+x*42}H680`} stroke="#ecf1f6"/>{/each}<polyline points={coords} fill="none" stroke="#e4a600" stroke-width="4" stroke-linejoin="round"/>{#each values as v,i}<circle cx={30+i/Math.max(1,values.length-1)*640} cy={200-(v-min)/den*170} r="3" fill="#e4a600"><title>سال {i}: {num(v,0)} {suffix}</title></circle>{/each}<text x="3" y="25" font-size="10" fill="#789">{num(max)}</text><text x="3" y="200" font-size="10" fill="#789">{num(min)}</text><text x="30" y="229" font-size="11" fill="#657">۰</text><text x="665" y="229" font-size="11" fill="#657">۲۰</text></svg></div>

