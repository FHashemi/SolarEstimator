<script lang="ts">
  import type{Project,SystemType}from '../model';
  export let project:Project;export let update:(p:Partial<Project>)=>void;
  const choices:{id:SystemType,title:string,subtitle:string,image:string,features:string[]}[]=[
  {id:'grid',title:'متصل به شبکه',subtitle:'اتصال مستقیم به شبکه برق',image:'/art/on-grid.webp',features:['فروش تضمینی و درآمدزایی: مناسب درآمد پایدار از فروش برق به شبکه','امکان تزریق برق با مجوز: تزریق قانونی برق تولیدی به شبکه','اقتصادی‌ترین گزینه: معمولاً بدون نیاز به باتری و با سرمایه‌گذاری اولیه کمتر']},
  {id:'hybrid',title:'هیبرید',subtitle:'خورشیدی + شبکه + ذخیره‌سازی',image:'/art/hybrid.webp',features:['تأمین برق با ضریب اطمینان بالا: پشتیبانی از بارهای منتخب در قطعی شبکه','مدیریت هوشمند بار: اولویت‌دهی به خورشیدی، باتری و شبکه','تضمین پایداری انرژی: امکان ترکیب خودمصرفی، ذخیره‌سازی و تزریق مجاز']},
  {id:'offgrid',title:'جدا از شبکه',subtitle:'مستقل از شبکه سراسری',image:'/art/off-grid.webp',features:['کاربری مناطق فاقد برق: مناسب ویلاها، باغ‌ها و مناطق دوردست','استقلال انرژی: طراحی برای تأمین نیاز بدون شبکه، مشروط به سایزینگ معتبر','ذخیره‌سازی شبانه‌روزی: بانک باتری متناسب با مصرف و استقلال موردنیاز']}
  ];
</script>
<section class="stage-heading"><div><h1>چه نوع نیروگاهی در نظر دارید؟</h1><p>نوع نیروگاه را انتخاب کنید تا محاسبات و تجهیزات متناسب با آن تنظیم شوند.</p></div></section>
<div class="system-cards">{#each choices as item}<button type="button" class="system-option" class:selected={project.system===item.id} onclick={()=>update({system:item.id})} aria-pressed={project.system===item.id}><img src={item.image} alt={`تصویر نمونه نیروگاه ${item.title}`} loading="lazy"/><h2>{item.title}</h2><p class="muted">{item.subtitle}</p><ul>{#each item.features as feature}<li><span>✓</span>{feature}</li>{/each}</ul><div class="select-system">{project.system===item.id?'● انتخاب شده':'○ انتخاب این نوع'}</div></button>{/each}</div>

