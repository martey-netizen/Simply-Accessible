// SIMPLY ACCESSIBLE - CORE LOGIC v1.0
// Focus: Compliance, Lead Capture, and UX

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SAFEGUARD: "Skip to Content" smooth scroll fix
    const skipLink = document.querySelector('.skip-link');
    skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector('#main-content');
        target.setAttribute('tabindex', '-1');
        target.focus();
        target.scrollIntoView({ behavior: 'smooth' });
    });

    // 2. THE LEAD MAGNET: "Get Risk Score" Simulation
    // This turns a generic button into a "Consultant in a Box"
    const auditButtons = document.querySelectorAll('a[href="#audit"], button:contains("Start Technical Audit")');
    
    // In a real app, this would trigger a modal. For this demo, we simulate the assessment.
    // This maps to the "Technical Audit Checklist" from your source text[cite: 99].
    
    const riskFactors = [
        { q: "Do you have 'Image-Only' PDFs in critical paths?", weight: 30 }, // [cite: 113]
        { q: "Can a user navigate your 'Give' flow without a mouse?", weight: 40 }, // [cite: 103]
        { q: "Do you use puzzle-based CAPTCHAs?", weight: 20 }, // [cite: 108]
        { q: "Are videos captioned by default?", weight: 10 } // [cite: 110]
    ];

    // Simple console logic for now - imagine this as a React State in Phase 2
    console.log("Omni Auditor Protocol: Risk Logic Loaded.");

    // 3. FORM VALIDATION (WCAG Friendly)
    // Ensures error messages are explicitly associated with inputs [cite: 104]
    const form = document.querySelector('form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('email');
            const emailValue = emailInput.value;
            
            if (!emailValue.includes('@')) {
                // Accessibility Fix: Inject error message into DOM with aria-live
                showError(emailInput, "Please enter a valid email address.");
            } else {
                alert(`Audit Request Received for ${emailValue}. \n\nNext Step: We will test your 'Give' flow using keyboard-only navigation.`);
            }
        });
    }

    function showError(input, message) {
        // Clear previous errors
        const existingError = input.parentElement.querySelector('.error-msg');
        if (existingError) existingError.remove();

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-msg text-red-400 text-sm mt-2 font-bold';
        errorDiv.setAttribute('role', 'alert'); // Screen readers announce this immediately
        errorDiv.innerText = message;
        input.parentElement.appendChild(errorDiv);
        input.setAttribute('aria-invalid', 'true');
        input.focus();
    }
});

// Helper for the selector
jQuery.expr[':'].contains = function(a, i, m) {
  return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};
