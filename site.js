const savedTheme=localStorage.getItem('seth-site-theme');
if(savedTheme==='dark')document.documentElement.dataset.theme='dark';
document.querySelectorAll('.theme-toggle').forEach(button=>button.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;localStorage.setItem('seth-site-theme',next)}));
document.querySelectorAll('.year').forEach(el=>{el.textContent=new Date().getFullYear()});
document.querySelectorAll('.back-top').forEach(el=>el.addEventListener('click',event=>{event.preventDefault();window.scrollTo({top:0,behavior:'smooth'})}));
const filters=[...document.querySelectorAll('.filter')],search=document.querySelector('.archive-search'),items=[...document.querySelectorAll('.archive-item')],empty=document.querySelector('.archive-empty');
let activeFilter='all';
function updateArchive(){if(!items.length)return;const query=(search?.value||'').trim().toLocaleLowerCase();let shown=0;items.forEach(item=>{const matchCategory=activeFilter==='all'||item.dataset.category===activeFilter;const matchText=!query||item.dataset.search.includes(query);item.hidden=!(matchCategory&&matchText);if(!item.hidden)shown++});if(empty)empty.classList.toggle('visible',shown===0)}
filters.forEach(button=>button.addEventListener('click',()=>{activeFilter=button.dataset.filter;filters.forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active))});updateArchive()}));
search?.addEventListener('input',updateArchive);
