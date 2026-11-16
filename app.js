const booking='https://yandex.ru/maps/org/clips_by_clips/148539151317/?booking%5Bpage%5D=menu&booking%5Bpermalink%5D=148539151317';
document.querySelectorAll('.booking-link').forEach(a=>{a.href=booking;a.target='_blank';a.rel='noopener';});
const menu=document.querySelector('.menu'),nav=document.querySelector('#nav');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Открыть меню');}
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
const tabs=[...document.querySelectorAll('[role=tab]')];
function selectTab(tab){tabs.forEach(t=>{const selected=t===tab;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!selected;});}
tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectTab(tab));tab.addEventListener('keydown',e=>{let i;if(e.key==='ArrowRight')i=(index+1)%tabs.length;else if(e.key==='ArrowLeft')i=(index+tabs.length-1)%tabs.length;else if(e.key==='Home')i=0;else if(e.key==='End')i=tabs.length-1;else return;e.preventDefault();selectTab(tabs[i]);tabs[i].focus();});});
const rail=document.querySelector('.photo-rail'),prev=document.querySelector('#gallery-prev'),next=document.querySelector('#gallery-next');
function updateRail(){prev.disabled=rail.scrollLeft<3;next.disabled=rail.scrollLeft>=rail.scrollWidth-rail.clientWidth-3;}
function moveRail(direction){const card=rail.querySelector('.work');const gap=parseFloat(getComputedStyle(rail).gap)||0;rail.scrollBy({left:direction*(card.getBoundingClientRect().width+gap),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
prev.addEventListener('click',()=>moveRail(-1));next.addEventListener('click',()=>moveRail(1));rail.addEventListener('scroll',updateRail,{passive:true});window.addEventListener('resize',updateRail);updateRail();
const dialog=document.querySelector('#photo-dialog');document.querySelectorAll('.work').forEach(b=>b.addEventListener('click',()=>{dialog.querySelector('img').src=b.dataset.image;dialog.querySelector('img').alt=b.querySelector('img').alt;dialog.showModal();}));dialog.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
