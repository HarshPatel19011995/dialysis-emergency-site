const translations = {
    // index.html
    "title_login": { en: "Dialysis Emergency Login", gu: "ડાયાલિસિસ ઇમરજન્સી લૉગિન" },
    "banner_h1": { en: "Nephrology & Dialysis Care", gu: "નેફ્રોલોજી અને ડાયાલિસિસ કેર" },
    "banner_p": { en: "Rapid emergency contact retrieval and patient management system for Shree Krishna Hospital.", gu: "શ્રી કૃષ્ણ હોસ્પિટલ માટે ઝડપી ઇમરજન્સી સંપર્ક પુનઃપ્રાપ્તિ અને દર્દી સંચાલન પ્રણાલી." },
    "login_h2": { en: "Shree Krishna Hospital", gu: "શ્રી કૃષ્ણ હોસ્પિટલ" },
    "login_p": { en: "Dialysis Emergency System", gu: "ડાયાલિસિસ ઇમરજન્સી સિસ્ટમ" },
    "login_box_h3": { en: "Login to Portal", gu: "પોર્ટલમાં લૉગિન કરો" },
    "role_patient": { en: "Patient", gu: "દર્દી" },
    "role_staff": { en: "Staff (DR)", gu: "સ્ટાફ (ડૉ.)" },
    "role_developer": { en: "Developer", gu: "વિકાસકર્તા" },
    "prompt_patient": { en: "Enter your Hospital ID to continue", gu: "ચાલુ રાખવા માટે તમારો હોસ્પિટલ આઈડી (ID) દાખલ કરો" },
    "prompt_staff": { en: "Enter your Staff ID to continue", gu: "ચાલુ રાખવા માટે તમારો સ્ટાફ આઈડી (ID) દાખલ કરો" },
    "prompt_dev": { en: "Enter your Developer ID to continue", gu: "ચાલુ રાખવા માટે તમારો ડેવલપર આઈડી (ID) દાખલ કરો" },
    "btn_login": { en: "Secure Login", gu: "સુરક્ષિત લૉગિન" },
    "dev_sig": { en: "A <strong>MayaMystic</strong> creation by Harsh Patel", gu: "હર્ષ પટેલ દ્વારા નિર્મિત <strong>MayaMystic</strong>" },

    // home.html
    "title_home": { en: "Emergency Patient Lookup", gu: "દર્દી ઇમરજન્સી શોધ" },
    "btn_logout": { en: "Logout", gu: "લૉગઆઉટ" },
    "btn_create_qr": { en: "Create Patient QR", gu: "દર્દીનું QR બનાવો" },
    "btn_all_qr": { en: "Generate All Patient QR", gu: "તમામ દર્દીઓના QR બનાવો" },
    "dept_h2": { en: "Dialysis & Nephrology Department", gu: "ડાયાલિસિસ અને નેફ્રોલોજી વિભાગ" },
    "dept_p": { en: "Emergency Patient Contact Lookup", gu: "ઇમરજન્સી દર્દી સંપર્ક શોધ" },
    "my_id_h2": { en: "My Emergency ID", gu: "મારું ઇમરજન્સી આઈડી (ID)" },
    "consult_h2": { en: "Nephrology Consultants", gu: "નેફ્રોલોજી સલાહકારો" },
    "dr_jainam_p1": { en: "MD DNB (Nephrology)", gu: "એમ.ડી. ડી.એન.બી (નેફ્રોલોજી)" },
    "dr_jainam_p2": { en: "Consultant Nephrologist & Transplant Physician", gu: "કન્સલ્ટન્ટ નેફ્રોલોજિસ્ટ અને ટ્રાન્સપ્લાન્ટ ફિઝિશિયન" },
    "dr_tir_p1": { en: "MD DNB (Nephrology)", gu: "એમ.ડી. ડી.એન.બી (નેફ્રોલોજી)" },
    "dr_tir_p2": { en: "Consultant Nephrologist & Transplant Physician", gu: "કન્સલ્ટન્ટ નેફ્રોલોજિસ્ટ અને ટ્રાન્સપ્લાન્ટ ફિઝિશિયન" },
    "call_dr_jai": { en: "📞 Call Dr Jainam", gu: "📞 ડૉ. જૈનમને કૉલ કરો" },
    "call_dr_tir": { en: "📞 Call Dr Tirthesh", gu: "📞 ડૉ. તીર્થને કૉલ કરો" },
    "lookup_h2": { en: "Patient Emergency Lookup", gu: "દર્દી ઇમરજન્સી શોધ" },
    "search_ph": { en: "Search Patient Name or Hospital ID", gu: "દર્દીનું નામ અથવા હોસ્પિટલ નંબર શોધો" },

    // script.js / dynamically generated
    "hospital_id_not_found": { en: "Hospital ID not found.", gu: "હોસ્પિટલ આઈડી (ID) મળ્યો નથી." },
    "invalid_dev_id": { en: "Invalid Developer ID.", gu: "અમાન્ય ડેવલપર આઈડી (ID)." },
    "invalid_staff_id": { en: "Invalid Staff ID.", gu: "અમાન્ય સ્ટાફ આઈડી (ID)." },
    "register_patient": { en: "Register / Edit Details", gu: "વિગતો નોંધો / સુધારો" },
    "login_instruction": { en: "Registration and updates are handled by authorized staff only. Please contact staff or the system administrator.", gu: "નોંધણી અને સુધારા ફક્ત અધિકૃત સ્ટાફ દ્વારા જ કરવામાં આવે છે. કૃપા કરીને સ્ટાફ અથવા સિસ્ટમ એડમિનિસ્ટ્રેટરનો સંપર્ક કરો." },
    "hospital_id_label": { en: "Hospital ID:", gu: "હોસ્પિટલ આઈડી:" },
    "emergency_contact": { en: "Emergency Contact 1", gu: "ઇમરજન્સી સંપર્ક ૧" },
    "second_contact": { en: "Emergency Contact 2", gu: "બીજો સંપર્ક (ઇમરજન્સી ૨)" },
    "call_now": { en: "📞 CALL CONTACT 1", gu: "📞 સંપર્ક ૧ ને કૉલ કરો" },
    "call_second": { en: "📞 CALL CONTACT 2", gu: "📞 સંપર્ક ૨ ને કૉલ કરો" },
    "view_details": { en: "🔍 View Full Health Details", gu: "🔍 સંપૂર્ણ આરોગ્ય વિગતો જુઓ" },
    "qr_title": { en: "Dialysis Emergency QR", gu: "ડાયાલિસિસ ઇમરજન્સી QR" },
    "qr_scan_inst": { en: "Scan to view emergency contact", gu: "ઇમરજન્સી સંપર્ક જોવા માટે સ્કેન કરો" },
    "download_qr": { en: "Download QR", gu: "QR ડાઉનલોડ કરો" },
    "generating": { en: "Generating...", gu: "બનતું છે..." },
    "no_patient_found": { en: "No patient found", gu: "કોઈ દર્દી મળ્યો નથી" },

    // patient-details.html
    "title_details": { en: "Patient Full Details", gu: "દર્દીની સંપૂર્ણ વિગતો" },
    "close_details": { en: "Close Details", gu: "વિગતો બંધ કરો" },
    "patient_med_details": { en: "Patient Medical Details", gu: "દર્દીની તબીબી વિગતો" },
    "confidential_info": { en: "Confidential Health Information", gu: "ગોપનીય આરોગ્ય માહિતી" },
    "loading": { en: "Loading patient data...", gu: "દર્દીનો ડેટા લોડ થઈ રહ્યો છે..." },
    
    // Basic Profile
    "age": { en: "Age", gu: "ઉંમર" },
    "sex": { en: "Sex/Gender", gu: "જાતિ" },
    "center": { en: "Dialysis Center (Unit)", gu: "ડાયાલિસિસ સેન્ટર (યુનિટ)" },
    
    "health_profile": { en: "Health & Dialysis Profile", gu: "આરોગ્ય અને ડાયાલિસિસ પ્રોફાઇલ" },
    "blood_group": { en: "Blood Group", gu: "બ્લડ ગ્રુપ" },
    "access_type": { en: "Access Type (AVF/Permcath)", gu: "એક્સેસ પ્રકાર (AVF/Permcath)" },
    "dialysis_day": { en: "Dialysis Schedule/Day", gu: "ડાયાલિસિસ શેડ્યૂલ/દિવસ" },
    
    // Diagnosis
    "primary_diagnosis": { en: "Primary Diagnosis (CKD/ESRD/HTN/DM)", gu: "પ્રાથમિક નિદાન (CKD/ESRD/HTN/DM)" },
    
    // New health conditions
    "allergy": { en: "Allergies", gu: "એલર્જી" },
    "other_info": { en: "Other Information", gu: "અન્ય માહિતી" },
    "health_conditions": { en: "Underlying Health Conditions", gu: "અંતર્ગત આરોગ્ય સ્થિતિઓ" },
    "diabetes": { en: "Diabetes", gu: "ડાયાબિટીસ" },
    "blood_pressure": { en: "Blood Pressure (BP)", gu: "બ્લડ પ્રેશર (BP)" },
    "cardiac": { en: "Cardiac / Heart Disease", gu: "હૃદય રોગ" },
    "stroke_neuro": { en: "Stroke / Neurological", gu: "સ્ટ્રોક / ન્યુરોલોજીકલ" },
    "home_address": { en: "Home Address", gu: "ઘરનું સરનામું" },
    
    // Emergency fields
    "viral_markers": { en: "Viral Status (HIV/HCV/HBsAg)", gu: "વાયરલ સ્ટેટસ (HIV/HCV/HBsAg)" },
    "dry_weight": { en: "Target/Dry Weight", gu: "લક્ષ્ય/ડ્રાય વજન" },
    "ayushman_bharat": { en: "Ayushman Bharat (PMJAY)", gu: "આયુષ્માન ભારત (PMJAY)" },
    
    "raw_data": { en: "Raw Record Data", gu: "કાચો રેકોર્ડ ડેટા" },
    "error_no_id": { en: "Error: No Patient ID provided in URL.", gu: "ભૂલ: URL માં કોઈ દર્દી આઈડી (ID) આપવામાં આવ્યો નથી." },
    "error_not_found": { en: "Error: Patient not found or invalid ID.", gu: "ભૂલ: દર્દી મળ્યો નથી અથવા અમાન્ય આઈડી (ID)." },
    "error_network": { en: "Network error loading data. Please try again.", gu: "ડેટા લોડ કરવામાં નેટવર્ક ભૂલ. કૃપયા ફરી પ્રયાસ કરો." },
    
    // register-edit.html
    "title_register": { en: "Register / Edit Patient", gu: "દર્દીની નોંધણી / સંપાદન કરો" },
    "btn_back": { en: "Back / Close", gu: "પાછા જાઓ / બંધ કરો" },
    "form_instruction": { en: "Please fill in the patient details accurately.", gu: "કૃપા કરીને દર્દીની વિગતો ચોક્કસ ભરો." },
    "personal_info": { en: "Personal Information", gu: "વ્યક્તિગત માહિતી" },
    "patient_name_label": { en: "Patient Full Name", gu: "દર્દીનું પૂરું નામ" },
    "hospital_details": { en: "Hospital Details", gu: "હોસ્પિટલની વિગતો" },
    "medical_history": { en: "Medical History", gu: "તબીબી ઇતિહાસ" },
    "emergency_contacts": { en: "Emergency Contacts", gu: "ઇમરજન્સી સંપર્કો" },
    "patient_phone": { en: "Patient Phone Number", gu: "દર્દીનો ફોન નંબર" },
    "btn_save": { en: "Save Data", gu: "માહિતી સાચવો" },
    "edit_patient": { en: "Edit Patient", gu: "દર્દીની વિગતો સંપાદિત કરો" },
    "success_save": { en: "Data saved locally (simulation). To write to the database, a backend integration is required.", gu: "ડેટા સ્થાનિક રીતે સાચવવામાં આવ્યો છે (સિમ્યુલેશન). ડેટાબેઝમાં સાચવવા માટે, બેકએન્ડ એકીકરણ જરૂરી છે." }
};

let currentLang = localStorage.getItem("appLang") || "en";

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("appLang", lang);
    applyTranslations();
    
    // Update active button styles
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    let activeBtn = document.getElementById(`btn-${lang}`);
    if (activeBtn) activeBtn.classList.add('active');
}

function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        let key = el.getAttribute("data-i18n");
        if (translations[key] && translations[key][currentLang]) {
            if (el.tagName === "INPUT" && el.hasAttribute("placeholder")) {
                el.placeholder = translations[key][currentLang];
            } else {
                el.innerHTML = translations[key][currentLang];
            }
        }
    });

    // Handle dynamically set placeholders (e.g. login role change)
    if (typeof window.updateLoginUI === 'function') {
        window.updateLoginUI(); 
    }
}

// Function to get a translated string for JS template literals
function t(key) {
    return translations[key] ? translations[key][currentLang] : key;
}

function initLanguage() {
    applyTranslations();

    // Initial active button setup
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    let activeBtn = document.getElementById(`btn-${currentLang}`);
    if (activeBtn) activeBtn.classList.add('active');
}

// Run immediately if DOM is already parsed, otherwise wait
if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", initLanguage);
} else {
    initLanguage();
}
