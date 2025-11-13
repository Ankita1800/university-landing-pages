// MIT Landing Page - Enhanced with all requirements
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Pipedream webhook URL - Replace with your actual Pipedream endpoint
const PIPEDREAM_WEBHOOK_URL = 'https://eodq2e90anw6xqz.m.pipedream.net';
const API_BASE_URL = 'http://localhost:3000';

// Lead Form Modal Functionality
const leadFormModal = document.getElementById('leadFormModal');
const applyNowBtn = document.getElementById('applyNowBtn');
const applyNowBtn2 = document.getElementById('applyNowBtn2');
const contactAdmissionsBtn = document.getElementById('contactAdmissionsBtn');
const requestInfoBtn = document.getElementById('requestInfoBtn');
const closeModal = document.getElementById('closeModal');
const leadForm = document.getElementById('leadForm');
const formMessage = document.getElementById('formMessage');

// Fees Modal Functionality
const feesModal = document.getElementById('feesModal');
const checkFeesBtn = document.getElementById('checkFeesBtn');
const viewFeesBtn = document.getElementById('viewFeesBtn');
const closeFeesModal = document.getElementById('closeFeesModal');
const feesContent = document.getElementById('feesContent');

// Download Brochure
const downloadBrochureBtn = document.getElementById('downloadBrochureBtn');

// Load Indian states from API
async function loadStates() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/states`);
        const data = await response.json();
        
        if (data.success) {
            const stateSelect = document.getElementById('stateSelect');
            data.data.forEach(state => {
                const option = document.createElement('option');
                option.value = state;
                option.textContent = state;
                stateSelect.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error loading states:', error);
    }
}

// Load fees from API and display in modal
async function loadFees() {
    try {
        feesContent.innerHTML = '<div class="flex justify-center py-8"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-mit-red"></div></div>';
        
        const response = await fetch(`${API_BASE_URL}/api/fees/mit`);
        const data = await response.json();
        
        if (data.success) {
            let html = '';
            
            // Undergraduate section
            html += '<div class="mb-8"><h4 class="text-2xl font-bold mb-4 text-mit-red border-b-2 border-mit-red pb-2">Undergraduate Programs</h4>';
            html += '<div class="overflow-x-auto"><table class="w-full text-left"><thead class="bg-gray-100"><tr>';
            html += '<th class="px-4 py-3 font-semibold">Course</th>';
            html += '<th class="px-4 py-3 font-semibold">Duration</th>';
            html += '<th class="px-4 py-3 font-semibold">Tuition Fee</th>';
            html += '<th class="px-4 py-3 font-semibold">Additional Fees</th>';
            html += '<th class="px-4 py-3 font-semibold">Total Annual</th>';
            html += '<th class="px-4 py-3 font-semibold">Total Program</th>';
            html += '</tr></thead><tbody>';
            
            data.data.undergraduate.forEach((course, index) => {
                html += `<tr class="${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}">`;
                html += `<td class="px-4 py-3">${course.course}</td>`;
                html += `<td class="px-4 py-3">${course.duration}</td>`;
                html += `<td class="px-4 py-3">${data.currency} ${course.tuitionFee.toLocaleString()}</td>`;
                html += `<td class="px-4 py-3">${data.currency} ${course.additionalFees.toLocaleString()}</td>`;
                html += `<td class="px-4 py-3 font-semibold">${data.currency} ${course.totalAnnual.toLocaleString()}</td>`;
                html += `<td class="px-4 py-3 font-bold text-mit-red">${data.currency} ${course.totalProgram.toLocaleString()}</td>`;
                html += '</tr>';
            });
            html += '</tbody></table></div></div>';
            
            // Postgraduate section
            html += '<div class="mb-8"><h4 class="text-2xl font-bold mb-4 text-mit-red border-b-2 border-mit-red pb-2">Postgraduate Programs</h4>';
            html += '<div class="overflow-x-auto"><table class="w-full text-left"><thead class="bg-gray-100"><tr>';
            html += '<th class="px-4 py-3 font-semibold">Course</th>';
            html += '<th class="px-4 py-3 font-semibold">Duration</th>';
            html += '<th class="px-4 py-3 font-semibold">Tuition Fee</th>';
            html += '<th class="px-4 py-3 font-semibold">Additional Fees</th>';
            html += '<th class="px-4 py-3 font-semibold">Total Annual</th>';
            html += '<th class="px-4 py-3 font-semibold">Total Program</th>';
            html += '</tr></thead><tbody>';
            
            data.data.postgraduate.forEach((course, index) => {
                html += `<tr class="${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}">`;
                html += `<td class="px-4 py-3">${course.course}</td>`;
                html += `<td class="px-4 py-3">${course.duration}</td>`;
                html += `<td class="px-4 py-3">${data.currency} ${course.tuitionFee.toLocaleString()}</td>`;
                html += `<td class="px-4 py-3">${data.currency} ${course.additionalFees.toLocaleString()}</td>`;
                html += `<td class="px-4 py-3 font-semibold">${data.currency} ${course.totalAnnual.toLocaleString()}</td>`;
                html += `<td class="px-4 py-3 font-bold text-mit-red">${data.currency} ${course.totalProgram.toLocaleString()}</td>`;
                html += '</tr>';
            });
            html += '</tbody></table></div></div>';
            
            // PhD section
            html += '<div class="mb-4"><h4 class="text-2xl font-bold mb-4 text-mit-red border-b-2 border-mit-red pb-2">PhD Programs</h4>';
            html += '<div class="bg-green-50 border border-green-200 rounded-lg p-6">';
            data.data.phd.forEach(course => {
                html += `<p class="text-lg font-semibold mb-2">${course.course}</p>`;
                html += `<p class="text-gray-700 mb-1">Duration: ${course.duration}</p>`;
                html += `<p class="text-green-700 font-bold text-xl">${course.tuitionFee}</p>`;
                if (course.note) {
                    html += `<p class="text-sm text-gray-600 mt-2 italic">${course.note}</p>`;
                }
            });
            html += '</div></div>';
            
            html += '<div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">';
            html += '<p class="text-sm text-gray-700"><strong>Note:</strong> MIT offers comprehensive financial aid packages. Over 90% of undergraduate students receive some form of financial assistance.</p>';
            html += '</div>';
            
            feesContent.innerHTML = html;
        }
    } catch (error) {
        console.error('Error loading fees:', error);
        feesContent.innerHTML = '<div class="p-8 text-center text-red-600">Error loading fees data. Please try again later.</div>';
    }
}

// Download Brochure Function
function downloadBrochure() {
    // Create brochure content
    const brochureContent = `
MIT - Massachusetts Institute of Technology
Admissions Brochure 2025

ABOUT MIT
Founded in 1861, MIT is a world-renowned institution dedicated to advancing knowledge in science, technology, and innovation.

PROGRAMS OFFERED
- B.Tech Computer Science
- B.Tech Electrical Engineering
- B.Sc. Physics
- B.Arch Architecture
- M.Tech Computer Science
- MBA (Sloan School)
- M.Sc. Data Science
- PhD Programs

FACILITIES
- State-of-Art Research Labs
- World-Class Library (5M+ volumes)
- Olympic-size Sports Complex
- Modern Student Housing

PLACEMENTS
- 92% Placement Rate
- $85,000 Average Salary
- $150,000 Highest Package
- 500+ Top Recruiters

CONTACT
Email: admissions@mit.edu
Phone: +1-617-253-1000
Website: https://www.mit.edu

© 2025 Massachusetts Institute of Technology
    `;
    
    // Create blob and download
    const blob = new Blob([brochureContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'MIT_Brochure_2025.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    alert('✓ Brochure downloaded successfully!');
}

// Open lead form modal
function openModal() {
    leadFormModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    loadStates(); // Load states when modal opens
}

// Close lead form modal
function closeModalFunc() {
    leadFormModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    leadForm.reset();
    formMessage.classList.add('hidden');
}

// Open fees modal
function openFeesModal() {
    feesModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    loadFees();
}

// Close fees modal
function closeFeesModalFunc() {
    feesModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Event listeners for opening modals
if (applyNowBtn) applyNowBtn.addEventListener('click', openModal);
if (applyNowBtn2) applyNowBtn2.addEventListener('click', openModal);
if (contactAdmissionsBtn) contactAdmissionsBtn.addEventListener('click', openModal);
if (requestInfoBtn) requestInfoBtn.addEventListener('click', openModal);
if (closeModal) closeModal.addEventListener('click', closeModalFunc);

if (checkFeesBtn) checkFeesBtn.addEventListener('click', openFeesModal);
if (viewFeesBtn) viewFeesBtn.addEventListener('click', openFeesModal);
if (closeFeesModal) closeFeesModal.addEventListener('click', closeFeesModalFunc);

if (downloadBrochureBtn) downloadBrochureBtn.addEventListener('click', downloadBrochure);

// Close modals on outside click
leadFormModal.addEventListener('click', (e) => {
    if (e.target === leadFormModal) {
        closeModalFunc();
    }
});

feesModal.addEventListener('click', (e) => {
    if (e.target === feesModal) {
        closeFeesModalFunc();
    }
});

// Close modals on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (!leadFormModal.classList.contains('hidden')) {
            closeModalFunc();
        }
        if (!feesModal.classList.contains('hidden')) {
            closeFeesModalFunc();
        }
    }
});

// Enhanced Form submission with all required fields
leadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = leadForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    // Get form data
    const formData = new FormData(leadForm);
    
    // Validate 10-digit phone number
    const phone = formData.get('phone');
    if (!/^\d{10}$/.test(phone)) {
        formMessage.textContent = '✗ Please enter a valid 10-digit phone number';
        formMessage.className = 'p-3 rounded-lg text-sm bg-red-100 text-red-800';
        formMessage.classList.remove('hidden');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        return;
    }
    
    // Check consent checkbox
    if (!formData.get('consent')) {
        formMessage.textContent = '✗ Please accept the consent checkbox to proceed';
        formMessage.className = 'p-3 rounded-lg text-sm bg-red-100 text-red-800';
        formMessage.classList.remove('hidden');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        return;
    }
    
    const data = {
        university: 'MIT',
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        state: formData.get('state'),
        course: formData.get('course'),
        intakeYear: formData.get('intakeYear'),
        message: formData.get('message') || '',
        consent: true,
        timestamp: new Date().toISOString(),
        source: 'MIT Landing Page'
    };
    
    try {
        // Send to Pipedream
        const response = await fetch(PIPEDREAM_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            formMessage.textContent = '✓ Application submitted successfully! We\'ll contact you soon.';
            formMessage.className = 'p-3 rounded-lg text-sm bg-green-100 text-green-800';
            formMessage.classList.remove('hidden');
            leadForm.reset();
            
            // Close modal after 2 seconds
            setTimeout(() => {
                closeModalFunc();
            }, 2000);
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        formMessage.textContent = '✗ Error submitting form. Please try again.';
        formMessage.className = 'p-3 rounded-lg text-sm bg-red-100 text-red-800';
        formMessage.classList.remove('hidden');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
});

console.log('MIT landing page initialized with all enhanced features');
