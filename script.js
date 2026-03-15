/* ================================
LOGIN
================================ */

function login(){

let input=document.getElementById("hospitalId")
if(!input) return

let id=input.value.trim()

let roleEl=document.querySelector('input[name="loginRole"]:checked')
let role=roleEl?roleEl.value:'patient'

let msg=document.getElementById("message")

/* BLOCK EMPTY INPUT */

if(id===""){
msg.innerHTML="⚠ Please enter your ID"
input.focus()
return
}


/* ================================
DEVELOPER LOGIN
================================ */

if(role==="developer"){

if(id===DEV_ID){

localStorage.setItem("patientID",id)
localStorage.setItem("isAdmin","true")
window.location="home.html"

}else{

msg.innerHTML=`
❌ Invalid Developer ID<br>
<small>Hint: ID format looks like DEV_***</small>
`

}

return

}


/* ================================
STAFF LOGIN
================================ */

if(role==="staff"){

if(id===STAFF_ID || id===ADMIN_ID){

localStorage.setItem("patientID",id)
localStorage.setItem("isAdmin","true")
window.location="home.html"

}else{

msg.innerHTML=`
❌ Invalid Staff ID<br>
<small>Hint: ID format looks like STAFF_***</small>
`

}

return

}


/* ================================
PATIENT LOGIN
================================ */

let patient=patients.find(p =>
getVal(p, ["Hospital ID", "હોસ્પિટલ નંબર"]) === id
)

if(patient){

localStorage.setItem("patientID",id)
localStorage.setItem("isAdmin","false")
window.location="home.html"

}else{

msg.innerHTML=`
❌ ${t("hospital_id_not_found")}<br>
<small>Hint: ID format looks like XXXX X</small><br><br>

<a class="register-btn" href="${googleFormLink}" target="_blank">
${t("register_patient")}
</a>
`

}

}