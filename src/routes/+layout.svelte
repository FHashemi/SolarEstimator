<script lang="ts">import '../styles/app.scss'; import { onMount } from 'svelte';
  onMount(()=>{if('serviceWorker' in navigator){navigator.serviceWorker.register('/service-worker.js').catch(()=>{});}});
</script>
<slot />

