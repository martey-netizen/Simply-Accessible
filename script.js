// SIMPLY ACCESSIBLE - CORE LOGIC v2.0 (NO DEPENDENCIES)
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SAFEGUARD: "Skip to Content" smooth scroll
    const skipLink = document.querySelector('.skip-link');
    if(skipLink) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector('#main-content');
            if(target) {
                target.setAttribute('tabindex', '-1');
                target.focus();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // 2. THE LEAD MAGNET: "Get Risk Score" Logic
    const auditTriggers = document.querySelectorAll('a[href="#audit"], button');
    
    auditTriggers.forEach(btn => {
        // Only attach to the specific "Start Technical Audit" button
        if(btn.innerText && btn.innerText.includes('Start Technical Audit')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                runSimulation();
            });
        }
        // Attach to the Risk Score link
        if(btn.getAttribute('href') === '#audit') {
            btn.addEventListener('click', (e) => {
                // Allow default scrolling, but log it
                console.log('Navigating to Audit section...');
            });
        }
    });

    function runSimulation() {
        alert("SIMULATION STARTED:\n\n1. Scanning contrast ratios...\n2. Checking PDF tags...\n3. Verifying keyboard paths...\n\nRESULT: Your site requires a Title II remediation plan.");
    }

    // 3. FORM VALIDATION
    const form = document.querySelector('form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('email');
            const emailValue = emailInput ? emailInput.value : '';
            
            if (!emailValue.includes('@')) {
                alert("Please enter a valid email address.");
            } else {
                alert(`Audit Request Sent for: ${emailValue}`);
            }
        });
    }
});
     
