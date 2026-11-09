<script lang="ts">
  export let name='Solar Estimator';
  export let saveStatus='ذخیره محلی فعال';
  export let onNew:()=>void=()=>{};
  export let onExport:()=>void=()=>{};
  export let onImport:()=>void=()=>{};
</script>
<header class="app-header"><div class="brand"><span class="brand-sun">☀</span><div><strong>Solar Estimator</strong><small>سامانه طراحی و برآورد نیروگاه خورشیدی</small></div></div><div class="header-center"><span class="save-dot">●</span>{saveStatus}</div><nav class="header-actions" aria-label="پروژه"><button type="button" onclick={onNew}>+ پروژه جدید</button><button type="button" onclick={onExport}>↓ ذخیره پروژه</button><button type="button" onclick={onImport}>↑ باز کردن فایل</button></nav></header>

