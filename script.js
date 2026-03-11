const sheetURL =
"https://opensheet.elk.sh/1bQWMz-5ikan9rHXwmPmmro70agzKbvTESWy-Ar3oXkQ/Form%20responses%201"

const googleFormLink =
"https://docs.google.com/forms/d/e/1FAIpQLSfdspCDwTO3aiw4BHXj69qTx_idDA2xNnRa0YClTLI1tV_kVg/viewform"

const baseURL =
"https://harshpatel19011995.github.io/dialysis-emergency-site/home.html"

let patients = []

/* LOAD PATIENT DATA */

fetch(sheetURL)
.then(res => res.json())
.then(data => {
patients = data
})


/* LOGIN */

function login(){

let input=document.getElementById("hospitalId")
if(!input) return

let id=input.value.trim()

let patient=patients.find(p =>
String(p["Hospital ID  (હોસ્પિટલ નંબર) "]||"").trim()===id
)

if(patient){

localStorage.setItem("patientID",id)
window.location="home.html"

}else{

document.getElementById("message").innerHTML=
`Hospital ID not found.<br>
<a class="register-btn" href="${googleFormLink}" target="_blank">
Register Patient
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

let url=baseURL+"?id="+id

let qrImage="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data="+encodeURIComponent(url)

return `

<div class="qr-card">

<h3>Dialysis Emergency QR</h3>

<img src="${qrImage}" class="qr-image">

<p class="qr-id">Hospital ID: ${id}</p>

<p class="qr-instruction">
Scan to view emergency contact
</p>

<a class="qr-download" href="${qrImage}" download="patient-${id}.png">
Download QR
</a>

</div>

`
}


/* SEARCH PATIENT */

function searchPatient(){

let input=document.getElementById("searchBox")
if(!input) return

let query=input.value.toLowerCase().trim()

if(query===""){
document.getElementById("result").innerHTML=""
return
}

let results=patients.filter(p=>{

let id=String(p["Hospital ID  (હોસ્પિટલ નંબર) "]||"").toLowerCase()
let name=String(p["Patient Full Name (દર્દીનું પૂરું નામ)"]||"").toLowerCase()
let phone=String(p["Phone Number 1  (ફોન નંબર)"]||"").toLowerCase()

return id.includes(query)||name.includes(query)||phone.includes(query)

})


/* SORT BEST MATCH FIRST */

results.sort((a,b)=>{

let aName=(a["Patient Full Name (દર્દીનું પૂરું નામ)"]||"").toLowerCase()
let bName=(b["Patient Full Name (દર્દીનું પૂરું નામ)"]||"").toLowerCase()

if(aName.startsWith(query)) return -1
if(bName.startsWith(query)) return 1

return 0
})


let html=""

results.forEach(p=>{

let name=p["Patient Full Name (દર્દીનું પૂરું નામ)"]
let id=p["Hospital ID  (હોસ્પિટલ નંબર) "]

html+=`

<div class="card">

<h3>${highlight(name,query)}</h3>

<p><b>Hospital ID:</b> ${highlight(id,query)}</p>

<div class="contact-block">

<p><b>Emergency Contact</b></p>

<p>
${p["Contact Name 1  (નામ)"] || ""}
(${p["Relation 1 (સંબંધ)"] || ""})
</p>

<a class="call-btn" href="tel:${p["Phone Number 1  (ફોન નંબર)"] || ""}">
📞 CALL NOW
</a>

</div>
`


if(p["Phone Number 2  (ફોન નંબર)"]){

html+=`

<div class="contact-block">

<p><b>Second Contact</b></p>

<p>
${p["Contact Name 2  (નામ)"]}
(${p["Relation 2  (સંબંધ)"]})
</p>

<a class="call-btn second" href="tel:${p["Phone Number 2  (ફોન નંબર)"]}">
📞 CALL SECOND
</a>

</div>

`
}


/* QR CARD */

html+=createQRCard(id)

html+=`</div>`

})


if(results.length===0){

html=`
<p>No patient found</p>

<a class="register-btn" href="${googleFormLink}" target="_blank">
Register Patient
</a>
`

}

document.getElementById("result").innerHTML=html

}


/* AUTO LOAD FROM QR */

window.onload=function(){

let params=new URLSearchParams(window.location.search)

let id=params.get("id")

if(!id) return

let searchBox=document.getElementById("searchBox")
if(!searchBox) return

searchBox.value=id

setTimeout(()=>{
searchPatient()
},300)

}


/* GENERATE QR MANUALLY */

function generateQR(){

let id=document.getElementById("qrHospitalId").value.trim()

if(!id){
alert("Enter Hospital ID")
return
}

document.getElementById("qrResult").innerHTML=createQRCard(id)

}