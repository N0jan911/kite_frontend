const btn=document.getElementById('menuBtn'),links=document.getElementById('siteLinks');
if(btn&&links){btn.addEventListener('click',()=>{const open=links.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));btn.textContent=open?'Close \u00d7':'Menu \u2630'});}
const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
const f=document.getElementById('mailForm');
if(f){f.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(f);
const body='Name: '+(d.get('name')||'')+'\nEmail: '+(d.get('email')||'')+'\n\n'+(d.get('message')||'');
location.href='mailto:supportteam.kite@gmail.com?subject='+encodeURIComponent('Kite Connect: '+(d.get('topic')||'Enquiry'))+'&body='+encodeURIComponent(body);});}

const topicSelect=document.querySelector('#mailForm select[name="topic"]');
if(topicSelect){const requestedTopic=new URLSearchParams(window.location.search).get('topic');if(requestedTopic&&Array.from(topicSelect.options).some(option=>option.value===requestedTopic||option.text===requestedTopic)){topicSelect.value=requestedTopic;}}
