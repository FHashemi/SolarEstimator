<script lang="ts">
  import {num} from '../engine/calculate';
  export let values:number[]=[];export let labels:string[]=[];export let color='var(--gold)';
  $: max=Math.max(...values,1);
</script>
<div class="bar-viz" role="img" aria-label="نمودار ستونی ماهانه"><div class="bar-plot" dir="ltr">{#each values as value,i}<div class="bar-cell" title={`${labels[i]}: ${num(value,1)}`}><div class="bar" style={`height:${Math.max(1,100*value/max)}%;background:${color}`}></div></div>{/each}</div><div class="bar-months" dir="ltr">{#each labels as l}<span>{l}</span>{/each}</div></div>

