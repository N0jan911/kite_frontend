const btn=document.getElementById('menuBtn'),links=document.getElementById('siteLinks');
if(btn&&links){btn.addEventListener('click',()=>{const open=links.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));btn.textContent=open?'Close \u00d7':'Menu \u2630'});}
const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
const f=document.getElementById('mailForm');
if(f){f.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(f);
const body='Name: '+(d.get('name')||'')+'\nEmail: '+(d.get('email')||'')+'\n\n'+(d.get('message')||'');
location.href='mailto:founder.kiteapp@gmail.com?subject='+encodeURIComponent('Kite Connect: '+(d.get('topic')||'Enquiry'))+'&body='+encodeURIComponent(body);});}
