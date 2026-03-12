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

let url = baseURL + "?id=" + id

let qrImage = "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=" + encodeURIComponent(url)

return `

<div class="qr-card">

<div class="qr-title">
⚠ Dialysis Patient
</div>

<div class="qr-wrapper">

<img src="${qrImage}" class="qr-image">

<img src="images/kidney.png" class="qr-center-icon">

</div>

<div class="qr-id">
Hospital ID: ${id}
</div>

<p class="qr-instruction">
Scan to view emergency contact
</p>

<a class="qr-download" href="${qrImage}" download="patient-${id}.png">
Download QR
</a>

</div>

`
}