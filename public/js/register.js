const oApp = { ctr: 0 }

document.querySelector('#rForm').addEventListener('submit', (e) => {
  let aMsg = []; let oMsg = document.getElementById('msg');
  if(oApp.ctr>0){ clearTimeout(oApp.ctr); }
  let sNam = sanitizeName(document.getElementById('name').value);
  let sEmi = sanitizeEmail(document.getElementById('email').value);
  if(!sNam){ aMsg.push('El nombre de usuario es obligatorio.'); } else {
    if(!/^[a-zA-Z0-9_]{3,20}$/.test(sNam)){ aMsg.push('De 3 a 20 caracteres. Solo letras, números y guiones. No puede empezar ni terminar con guion.'); }
  }
  if(!sEmi){ aMsg.push('El correo electrónico es obligatorio.'); } else {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sEmi)){ aMsg.push('El formato del correo electrónico no es válido.'); }
  }
  if(aMsg.length>0){
    oMsg.classList.remove('d-none'); oMsg.innerHTML = aMsg.join('<br>');
    oApp.ctr = setTimeout( ()=> { oMsg.classList.add('d-none'); oMsg.innerHTML = '' }, 10000 );
    e.preventDefault();
  }
});

function sanitizeName(v){ return v.trim().replace(/[<>'"`;]/g, '').replace(/\s+/g, ' '); }
function sanitizeEmail(v){ return v.trim().toLowerCase().replace(/[<>'"`;\s]/g, ''); }
