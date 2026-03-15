/* ================================
APP VERSION SYSTEM
================================ */

const APP_VERSION = "1.1.0"

const storedVersion = localStorage.getItem("app_version")

if(storedVersion && storedVersion !== APP_VERSION){
showUpdateNotification()
}

localStorage.setItem("app_version", APP_VERSION)

function showUpdateNotification(){

let bar=document.createElement("div")

bar.innerHTML="⚡ New version available — Refresh page"

bar.style.position="fixed"
bar.style.bottom="0"
bar.style.left="0"
bar.style.right="0"
bar.style.background="#2563eb"
bar.style.color="white"
bar.style.padding="12px"
bar.style.textAlign="center"
bar.style.fontWeight="600"
bar.style.zIndex="9999"
bar.style.cursor="pointer"

bar.onclick=()=>location.reload(true)

document.body.appendChild(bar)

}



/* ================================
CONFIG
================================ */

const sheetURL =
"https://opensheet.elk.sh/1bQWMz-5ikan9rHXwmPmmro70agzKbvTESWy-Ar3oXkQ/Form%20responses%201"

const googleFormLink =
"https://docs.google.com/forms/d/e/1FAIpQLSfdspCDwTO3aiw4BHXj69qTx_idDA2xNnRa0YClTLI1tV_kVg/viewform"

const baseURL =
"https://harshpatel19011995.github.io/dialysis-emergency-site/home.html"

let patients = []



/* ================================
FOOTER VERSION DISPLAY
================================ */

document.addEventListener("DOMContentLoaded",()=>{

let el=document.getElementById("appVersion")

if(el){
el.innerText="Version "+APP_VERSION
}

})



/* ================================
SERVER STATUS
================================ */

function updateServerStatus(online){

let el=document.getElementById("serverStatus")

if(!el) return

if(online){

el.innerHTML="🟢 Database Online"
el.style.color="#10b981"

}else{

el.innerHTML="🔴 Database Offline"
el.style.color="#ef4444"

}

}



/* ================================
LOAD PATIENT DATA
================================ */

fetch(sheetURL)
.then(res => res.json())
.then(data => {

patients = data

updateServerStatus(true)

/* AUTO LOAD PATIENT IF QR USED */

let params = new URLSearchParams(window.location.search)
let id = params.get("id")

if(!id) return

let searchBox = document.getElementById("searchBox")

if(!searchBox) return

searchBox.value = id

searchPatient()

})
.catch(err=>{
console.log("Sheet load error",err)
updateServerStatus(false)
})



/* ================================
LOGIN ROLES
================================ */

const STAFF_ID = "STAFF_SKH"
const DEV_ID = "DEV_SKH"
const ADMIN_ID = "ADMIN_SKH"



/* ================================
ROLE UI UPDATE
================================ */

function updateLoginUI() {

let role = document.querySelector('input[name="loginRole"]:checked').value
let prompt = document.getElementById("loginPrompt")
let input = document.getElementById("hospitalId")

document.getElementById("message").innerHTML=""

if(role==="patient"){
prompt.innerText="Enter your Hospital ID to continue"
input.placeholder="e.g. XXXX X"
}

else if(role==="staff"){
prompt.innerText="Enter your Staff ID to continue"
input.placeholder="e.g. STAFF_SKH"
}

else if(role==="developer"){
prompt.innerText="Enter your Developer ID to continue"
input.placeholder="e.g. DEV_SKH"
}

}



/* ================================
HELPER VALUE READER
================================ */

const getVal = (obj, partials) => {

for (let key in obj) {

let keyLow = key.toLowerCase()

for (let part of partials) {

if (keyLow.includes(part.toLowerCase())) {

if (obj[key] !== undefined && obj[key] !== null) {

return String(obj[key]).trim()

}

}

}

}

return ""

}



/* ================================
LOGIN
================================ */

function login(){

let input=document.getElementById("hospitalId")
if(!input) return

let id=input.value.trim()

let roleEl=document.querySelector('input[name="loginRole"]:checked')
let role=roleEl?roleEl.value:'patient'



if(role==="developer"){

if(id===DEV_ID){

localStorage.setItem("patientID",id)
localStorage.setItem("isAdmin","true")
window.location="home.html"

}else{

document.getElementById("message").innerHTML=t("invalid_dev_id")

}

return

}



if(role==="staff"){

if(id===STAFF_ID || id===ADMIN_ID){

localStorage.setItem("patientID",id)
localStorage.setItem("isAdmin","true")
window.location="home.html"

}else{

document.getElementById("message").innerHTML=t("invalid_staff_id")

}

return

}



/* PATIENT LOGIN */

let patient=patients.find(p => getVal(p, ["Hospital ID", "હોસ્પિટલ નંબર"]) === id)

if(patient){

localStorage.setItem("patientID",id)
localStorage.setItem("isAdmin","false")
window.location="home.html"

}else{

document.getElementById("message").innerHTML=
`${t("hospital_id_not_found")}<br>
<a class="register-btn" href="${googleFormLink}" target="_blank">
${t("register_patient")}
</a>`

}

}



/* ================================
SEARCH HIGHLIGHT
================================ */

function highlight(text,query){

if(!text) return ""

let regex=new RegExp(`(${query})`,"gi")

return text.replace(regex,'<mark>$1</mark>')

}



/* ================================
CREATE QR CARD
================================ */

function createQRCard(id){

let url = baseURL + "?id=" + id

let qrImage =
"https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=" +
encodeURIComponent(url)

return `

<div class="qr-card">

<h3 class="qr-title">${t("qr_title")}</h3>

<div class="qr-wrapper">

<img src="${qrImage}" class="qr-image" crossorigin="anonymous">

<img src="images/kidney.png" class="qr-center-icon">

</div>

<p class="qr-id"><b>${t("hospital_id_label")}</b> ${id}</p>

<p class="qr-instruction">
${t("qr_scan_inst")}
</p>

<button class="qr-download" onclick="downloadQRCard(this)">
${t("download_qr")}
</button>

</div>

`

}



/* ================================
DOWNLOAD QR CARD
================================ */

function downloadQRCard(button){

const card = button.closest(".qr-card")
const originalText = button.innerText

button.innerText = t("generating")
button.disabled = true
button.style.display="none"

html2canvas(card,{
scale:3,
backgroundColor:"#ffffff",
useCORS:true,
allowTaint:false
}).then(canvas=>{

let link=document.createElement("a")

let idElement = card.querySelector(".qr-id")

let id = idElement
? idElement.innerText.replace("Hospital ID:\n","").replace("Hospital ID: ","").trim()
: "card"

link.download="dialysis-qr-"+id+".png"

link.href=canvas.toDataURL("image/png")

link.click()

button.style.display="block"
button.innerText = originalText
button.disabled = false

}).catch(err => {

console.error("Download failed:", err)

alert("Oops! Failed to generate the image. Please try again.")

button.style.display="block"
button.innerText = originalText
button.disabled = false

})

}



/* ================================
SEARCH PATIENT
================================ */

function searchPatient(){

let input=document.getElementById("searchBox")
if(!input) return

let query=input.value.toLowerCase().trim()

if(query===""){
document.getElementById("result").innerHTML=""
return
}

let results=patients.filter(p=>{

let id=getVal(p, ["Hospital ID", "હોસ્પિટલ નંબર"]).toLowerCase()
let name=getVal(p, ["Patient Full Name", "દર્દીનું પૂરું નામ"]).toLowerCase()
let phone=getVal(p, ["Mobile Number", "Phone Number", "મોબાઇલ નંબર", "ફોન નંબર"]).toLowerCase()

return id.includes(query)||name.includes(query)||phone.includes(query)

})



results.sort((a,b)=>{

let aName=getVal(a, ["Patient Full Name", "દર્દીનું પૂરું નામ"]).toLowerCase()
let bName=getVal(b, ["Patient Full Name", "દર્દીનું પૂરું નામ"]).toLowerCase()

if(aName.startsWith(query)) return -1
if(bName.startsWith(query)) return 1

return 0

})



let html=""

results.forEach(p=>{

let name=getVal(p, ["Patient Full Name", "દર્દીનું પૂરું નામ"])
let id=getVal(p, ["Hospital ID", "હોસ્પિટલ નંબર"])
let phone1=getVal(p, ["Mobile Number", "Phone Number 1", "મોબાઇલ નંબર"])
let contact1=getVal(p, ["Contact Name 1", "Emergency Contact", "નામ"])
let relation1=getVal(p, ["Relation 1", "સંબંધ"])

html+=`

<div class="card">

<h3>${highlight(name,query)}</h3>

<p><b>${t("hospital_id_label")}</b> ${highlight(id,query)}</p>

<div class="contact-block">

<p><b>${t("emergency_contact")}</b></p>

<p>${contact1} (${relation1})</p>

<a class="call-btn" href="tel:${phone1}">
${t("call_now")}
</a>

</div>
`

let phone2=getVal(p, ["Phone Number 2","બીજો નંબર"])

if(phone2){

let contact2=getVal(p, ["Contact Name 2"])
let relation2=getVal(p, ["Relation 2"])

html+=`

<div class="contact-block">

<p><b>${t("second_contact")}</b></p>

<p>${contact2} (${relation2})</p>

<a class="call-btn second" href="tel:${phone2}">
${t("call_second")}
</a>

</div>

`

}

html+=`
<div style="margin-top:20px;">
<a class="details-btn" href="patient-details.html?id=${encodeURIComponent(id)}" target="_blank">
${t("view_details")}
</a>
</div>
`

html+=createQRCard(id)

html+=`</div>`

})



if(results.length===0){

html=`
<p>${t("no_patient_found")}</p>

<a class="register-btn" href="${googleFormLink}" target="_blank">
${t("register_patient")}
</a>
`

}

document.getElementById("result").innerHTML=html

}



/* ================================
CUSTOM QR GENERATOR
================================ */

function generateCustomQR(){

let id=document.getElementById("qrHospitalId").value.trim()

if(!id){
alert("Enter Hospital ID")
return
}

document.getElementById("qrResult").innerHTML=createQRCard(id)

}



/* ================================
GENERATE ALL QR
================================ */

function generateAllPatientQR(){

let container=document.getElementById("qrAllContainer")

if(!container) return

let html=""

patients.forEach(p=>{

let id=getVal(p, ["Hospital ID","હોસ્પિટલ નંબર"])

if(!id) return

html+=createQRCard(id)

})

container.innerHTML=html

}