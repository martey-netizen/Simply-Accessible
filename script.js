// OMNI AUDITOR - PRODUCTION LOGIC
// References: ADA Title II Final Rule, WCAG 2.2, Section 504

// --- CONFIGURATION ---
// You must get these from https://emailjs.com (Free Tier)
// This is the ONLY way to send real emails from a static GitHub page.
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID"; 
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

// --- STATE MANAGEMENT ---
const state = {
    step: 0,
    answers: {}
};

const interfaceDiv = document.getElementById('assessment-interface');

// --- 1. RISK CALCULATOR LOGIC (Client-Side) ---

function startAssessment() {
    state.step = 1;
    renderQuestion();
}

function renderQuestion() {
    let html = '';

    // Q1: Federal Funding (Section 504)
    if (state.step === 1) {
        html = `
            <div class="fade-in">
                <h3>1. Do you receive federal financial assistance?</h3>
                <p style="color:#666; font-size:0.9rem; margin-bottom:20px;">(Grants, loans, school lunch programs, etc.)</p>
                <div class="btn-group">
                    <button class="action-btn option" onclick="handleAnswer('federalFunding', true)">Yes</button>
                    <button class="action-btn option" onclick="handleAnswer('federalFunding', false)">No</button>
                </div>
            </div>`;
    } 
    // Q2: Public Entity (ADA Title II)
    else if (state.step === 2) {
        html = `
            <div class="fade-in">
                <h3>2. Are you a state or local government entity?</h3>
                <p style="color:#666; font-size:0.9rem; margin-bottom:20px;">(Public school, library, district, municipality)</p>
                <div class="btn-group">
                    <button class="action-btn option" onclick="handleAnswer('publicEntity', true)">Yes</button>
                    <button class="action-btn option" onclick="handleAnswer('publicEntity', false)">No</button>
                </div>
            </div>`;
    }
    // Q3: Population Size (Compliance Date)
    else if (state.step === 3) {
        html = `
            <div class="fade-in">
                <h3>3. Is your population size 50,000 or more?</h3>
                <div class="btn-group">
                    <button class="action-btn option" onclick="handleAnswer('populationLarge', true)">Yes (50k+)</button>
                    <button class="action-btn option" onclick="handleAnswer('populationLarge', false)">No (<50k)</button>
                </div>
            </div>`;
    }

    if(interfaceDiv) interfaceDiv.innerHTML = html;
}

function handleAnswer(key, value) {
    state.answers[key] = value;
    
    // Logic Routing based on 2026 Compliance Report
    if (key === 'federalFunding') {
        state.step = 2; 
        renderQuestion();
    } 
    else if (key === 'publicEntity') {
        if (value === true) {
            state.step = 3; // Public entities need population check
            renderQuestion();
        } else {
            calculateResult(); // Private entities go to result
        }
    } 
    else if (key === 'populationLarge') {
        calculateResult();
    }
}

function calculateResult() {
    let result = { title: '', desc: '', class: '' };

    // SCORING ENGINE
    // Case 1: Section 504 (Federal Funding)
    if (state.answers.federalFunding) {
        result.title = "HIGH RISK: Section 504";
        result.desc = "Your federal funding triggers immediate Section 504 obligations. You must ensure equal access to digital benefits.";
        result.class = "high";
    }
    // Case 2: Title II (Passed Deadline)
    else if (state.answers.publicEntity && state.answers.populationLarge) {
        result.title = "CRITICAL: Deadline Passed";
        [cite_start]result.desc = "As a public entity >50k, your ADA Title II compliance deadline was April 24, 2026[cite: 6]. Immediate audit required.";
        result.class = "critical";
    }
    // Case 3: Title II (Upcoming Deadline)
    else if (state.answers.publicEntity && !state.answers.populationLarge) {
        result.title = "MEDIUM RISK: 2027 Deadline";
        result.desc = "Your deadline is April 26, 2027. Start your WCAG 2.1 AA transition now.";
        result.class = "medium";
    }
    // Case 4: Title III (Private/Nonprofit)
    else {
        result.title = "MODERATE RISK: Litigation";
        result.desc = "While Title III has no fixed standard, over 5,000 lawsuits were filed in 2025. Courts cite WCAG 2.1 as the benchmark.";
        result.class = "moderate";
    }

    interfaceDiv.innerHTML = `
        <div class="fade-in">
            <div class="result-card ${result.class}">
                <h3 style="margin-top:0">${result.title}</h3>
                <p>${result.desc}</p>
            </div>
            <button onclick="startAssessment()" style="background:none; border:none; color:#666; margin-top:15px; cursor:pointer; text-decoration:underline;">Start Over</button>
        </div>`;
}

// --- 2. REAL AUDIT EMAIL SENDER (EmailJS) ---

const auditForm = document.getElementById('audit-form');

if(auditForm) {
    auditForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const btn = auditForm.querySelector('button');
        const status = document.getElementById('audit-status');
        
        // 1. Lock UI
        btn.disabled = true;
        btn.innerText = "Sending Request...";
        status.innerText = "";

        // 2. Check for Configuration
        if (EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID") {
            console.error("EmailJS not configured.");
            status.style.color = "red";
            status.innerText = "Error: EmailJS Service ID missing in script.js";
            btn.disabled = false;
            btn.innerText = "Generate Audit Report";
            return;
        }

        // 3. Send Real Email
        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
            .then(function() {
                status.style.color = "green";
                status.innerText = "✓ Success! Audit request sent.";
                btn.innerText = "Sent";
            }, function(error) {
                console.error('FAILED...', error);
                status.style.color = "red";
                status.innerText = "Error sending email. Check console.";
                btn.disabled = false;
                btn.innerText = "Try Again";
            });
    });
}
