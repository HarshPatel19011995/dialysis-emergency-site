const sheetURL =
"https://opensheet.elk.sh/1bQWMz-5ikan9rHXwmPmmro70agzKbvTESWy-Ar3oXkQ/Form%20responses%201"

const googleFormLink =
"https://docs.google.com/forms/d/e/1FAIpQLSfdspCDwTO3aiw4BHXj69qTx_idDA2xNnRa0YClTLI1tV_kVg/viewform"

const baseURL =
"https://harshpatel19011995.github.io/dialysis-emergency-site/home.html"

let patients = []
let searchIndex = []



/* LOAD PATIENT DATA */

fetch(sheetURL)
.then(res => res.json())
.then(data => {

patients = data

/* BUILD SEARCH INDEX (FAST SEARCH) */

searchIndex = patients.map(p => {

let id = String(p["Hospital ID  (હોસ્પિટલ નંબર) "] || "").toLowerCase().trim()
let name = String(p["Patient Full Name (દર્દીનું પૂરું નામ)"] || "").toLowerCase().trim()
let phone = String(p["Phone Number 1  (ફોન નંબર)"] || "").toLowerCase().trim()

return {
id,
name,
phone,
data:p
}

})

/* AUTO LOAD PATIENT IF QR USED */

let params = new URLSearchParams(window.location.search)
let id = params.get("id")

if(!id) return

let searchBox = document.getElementById("searchBox")

if(!searchBox) return

searchBox.value = id.trim()

searchPatient()

})
.catch(err=>{
console.log("Sheet load error",err)
})



const STAFF_ID = "STAFF_SKH"
const DEV_ID = "DEV_SKH"
const ADMIN_ID = "ADMIN_SKH"



/* ROLE UI UPDATE */

function updateLoginUI(){

let role = document.querySelector('input[name="loginRole"]:checked').value
let prompt = document.getElementById("loginPrompt")
let input = document.getElementById("hospitalId")

document.getElementById("message").innerHTML=""

if(role==="patient"){
prompt.innerText="Enter your Hospital ID to continue"
input.placeholder="e.g. 26051B"
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



/* LOGIN */

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

}

else{

document.getElementById("message").innerHTML=t("invalid_dev_id")

}

return

}



if(role==="staff"){

if(id===STAFF_ID || id===ADMIN_ID){

localStorage.setItem("patientID",id)
localStorage.setItem("isAdmin","true")

window.location="home.html"

}

else{

document.getElementById("message").innerHTML=t("invalid_staff_id")

}

return

}



/* PATIENT LOGIN */

let patient = patients.find(p =>
String(p["Hospital ID  (હોસ્પિટલ નંબર) "] || "")
.trim()
.toLowerCase() === id.toLowerCase()
)



if(patient){

localStorage.setItem("patientID",id)
localStorage.setItem("isAdmin","false")

window.location="home.html"

}

else{

document.getElementById("message").innerHTML=
`${t("hospital_id_not_found")}<br>
<a class="register-btn" href="${googleFormLink}" target="_blank">
${t("register_patient")}
</a>`

}

}



/* HIGHLIGHT SEARCH */

function highlight(text,query){

if(!text) return ""

let regex=new RegExp(`(${query})`,"gi")

return text.replace(regex,'<mark>$1</mark>')

}



/* CREATE QR CARD */

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



/* DOWNLOAD QR CARD */

function downloadQRCard(button){

const card = button.closest(".qr-card")

const originalText = button.innerText

button.innerText=t("generating")
button.disabled=true
button.style.display="none"

html2canvas(card,{
scale:3,
backgroundColor:"#ffffff",
useCORS:true,
allowTaint:false
}).then(canvas=>{

let link=document.createElement("a")

let idElement = card.querySelector(".qr-id")

let id=idElement
?idElement.innerText.replace("Hospital ID:\n","").replace("Hospital ID: ","").trim()
:"card"

link.download="dialysis-qr-"+id+".png"

link.href=canvas.toDataURL("image/png")

link.click()

button.style.display="block"
button.innerText=originalText
button.disabled=false

}).catch(err=>{

console.error("Download failed:",err)

alert("Failed to generate image. Please try again.")

button.style.display="block"
button.innerText=originalText
button.disabled=false

})

}



/* SEARCH PATIENT */

function searchPatient(){

if(searchIndex.length===0){
document.getElementById("result").innerHTML="Loading patient data..."
return
}

let input=document.getElementById("searchBox")

if(!input) return

let query=input.value.toLowerCase().trim()

if(query===""){
document.getElementById("result").innerHTML=""
return
}



let results = searchIndex
.filter(p =>
p.id.includes(query) ||
p.name.includes(query) ||
p.phone.includes(query)
)
.map(p => p.data)



let html=""



results.forEach(p=>{

let name=p["Patient Full Name (દર્દીનું પૂરું નામ)"]
let id=String(p["Hospital ID  (હોસ્પિટલ નંબર) "]||"").trim()



html+=`

<div class="card">

<h3>${highlight(name,query)}</h3>

<p><b>${t("hospital_id_label")}</b> ${highlight(id,query)}</p>

<div class="contact-block">

<p><b>${t("emergency_contact")}</b></p>

<p>
${p["Contact Name 1  (નામ)"]||""}
(${p["Relation 1 (સંબંધ)"]||""})
</p>

<a class="call-btn" href="tel:${p["Phone Number 1  (ફોન નંબર)"]||""}">
${t("call_now")}
</a>

</div>
`



if(p["Phone Number 2  (ફોન નંબર)"]){

html+=`

<div class="contact-block">

<p><b>${t("second_contact")}</b></p>

<p>
${p["Contact Name 2  (નામ)"]||""}
(${p["Relation 2  (સંબંધ)"]||""})
</p>

<a class="call-btn second" href="tel:${p["Phone Number 2  (ફોન નંબર)"]}">
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



/* CUSTOM QR */

function generateCustomQR(){

let id=document.getElementById("qrHospitalId").value.trim()

if(!id){
alert("Enter Hospital ID")
return
}

document.getElementById("qrResult").innerHTML=createQRCard(id)

}



/* GENERATE ALL QR */

function generateAllPatientQR(){

let container=document.getElementById("qrAllContainer")

if(!container) return

let html=""

patients.forEach(p=>{

let id=String(p["Hospital ID  (હોસ્પિટલ નંબર) "]||"").trim()

if(!id) return

html+=createQRCard(id)

})

container.innerHTML=html

}
