// Delhi University Landing Page - Enhanced with all requirements
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
const PIPEDREAM_WEBHOOK_URL = 'https://eojt37qtzxgief2.m.pipedream.net';
const API_BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://university-landing-pages.onrender.com';

// Lead Form Modal Functionality
const leadFormModal = document.getElementById('leadFormModal');
const applyNowBtn = document.getElementById('applyNowBtn');
const applyNowBtn2 = document.getElementById('applyNowBtn2');
const getStartedBtn = document.getElementById('getStartedBtn');
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
        feesContent.innerHTML = '<div class="flex justify-center py-8"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-du-burgundy"></div></div>';
        
        console.log('🔄 Fetching fees from:', `${API_BASE_URL}/api/fees/delhi-university`);
        console.log('🌐 Current hostname:', window.location.hostname);
        
        // Add timeout to prevent infinite loading
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
        
        const response = await fetch(`${API_BASE_URL}/api/fees/delhi-university`, {
            signal: controller.signal,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('✅ Fees data received:', data);
        
        if (data.success) {
            let html = '';
            
            // Undergraduate section
            html += '<div class="mb-8"><h4 class="text-2xl font-bold mb-4 text-du-burgundy border-b-2 border-du-burgundy pb-2">Undergraduate Programs</h4>';
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
                html += `<td class="px-4 py-3 font-bold text-du-burgundy">${data.currency} ${course.totalProgram.toLocaleString()}</td>`;
                html += '</tr>';
            });
            html += '</tbody></table></div></div>';
            
            // Postgraduate section
            html += '<div class="mb-8"><h4 class="text-2xl font-bold mb-4 text-du-burgundy border-b-2 border-du-burgundy pb-2">Postgraduate Programs</h4>';
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
                html += `<td class="px-4 py-3 font-bold text-du-burgundy">${data.currency} ${course.totalProgram.toLocaleString()}</td>`;
                html += '</tr>';
            });
            html += '</tbody></table></div></div>';
            
            // PhD section
            html += '<div class="mb-4"><h4 class="text-2xl font-bold mb-4 text-du-burgundy border-b-2 border-du-burgundy pb-2">PhD Programs</h4>';
            html += '<div class="bg-green-50 border border-green-200 rounded-lg p-6">';
            data.data.phd.forEach(course => {
                html += `<p class="text-lg font-semibold mb-2">${course.course}</p>`;
                html += `<p class="text-gray-700 mb-1">Duration: ${course.duration}</p>`;
                html += `<p class="text-gray-700 mb-1">Tuition Fee: ${data.currency} ${course.tuitionFee.toLocaleString()}/year</p>`;
                html += `<p class="text-gray-700 mb-1">Additional Fees: ${data.currency} ${course.additionalFees.toLocaleString()}/year</p>`;
                html += `<p class="text-green-700 font-bold text-xl mb-2">Total Annual: ${data.currency} ${course.totalAnnual.toLocaleString()}</p>`;
                if (course.note) {
                    html += `<p class="text-sm text-gray-600 mt-2 italic">${course.note}</p>`;
                }
            });
            html += '</div></div>';
            
            html += '<div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">';
            html += '<p class="text-sm text-gray-700"><strong>Note:</strong> Delhi University offers various scholarships and financial assistance programs for eligible students. Contact admissions office for more details.</p>';
            html += '</div>';
            
            feesContent.innerHTML = html;
        }
    } catch (error) {
        console.error('❌ Error loading fees:', error);
        
        let errorMessage = error.message;
        if (error.name === 'AbortError') {
            errorMessage = 'Request timeout - The API server may be sleeping (cold start). Please try again in 30 seconds.';
        } else if (error.message.includes('Failed to fetch')) {
            errorMessage = 'Network error - Cannot reach API server. Check your internet connection.';
        }
        
        feesContent.innerHTML = `<div class="p-8 text-center">
            <div class="text-red-600 mb-4">
                <svg class="mx-auto h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="font-bold text-lg mb-2">Error Loading Fees</p>
                <p class="text-sm mb-3">${errorMessage}</p>
            </div>
            <button onclick="loadFees()" class="bg-du-burgundy text-white px-6 py-2 rounded-lg hover:bg-du-burgundy/90 transition-colors">
                Retry
            </button>
            <p class="text-xs mt-4 text-gray-500">API Endpoint: ${API_BASE_URL}/api/fees/delhi-university</p>
        </div>`;
    }
}

// Download Brochure Function
function downloadBrochure() {
    const brochureContent = `
Delhi University - University of Delhi
Admissions Brochure 2025

ABOUT DELHI UNIVERSITY
Founded in 1922, Delhi University is one of India's premier educational institutions with a legacy of excellence spanning over a century.

PROGRAMS OFFERED
- B.A. Economics
- B.Sc. Computer Science
- B.Com (Hons.)
- B.A. English (Hons.)
- M.A. Economics
- M.Sc. Mathematics
- MBA
- PhD Programs

FACILITIES
- Modern Research Labs
- Central Library (1.5M+ books)
- Sports Complex
- Hostels & Residential Facilities

PLACEMENTS
- 85% Placement Rate
- ₹6.5 LPA Average Package
- ₹25 LPA Highest Package
- 300+ Top Recruiters

CONTACT
Email: admissions@du.ac.in
Phone: +91-11-27667725
Website: https://www.du.ac.in

© 2025 University of Delhi
    `;
    
    const blob = new Blob([brochureContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'DU_Brochure_2025.txt';
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
    loadStates();
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
if (getStartedBtn) getStartedBtn.addEventListener('click', openModal);
if (closeModal) closeModal.addEventListener('click', closeModalFunc);

if (checkFeesBtn) checkFeesBtn.addEventListener('click', openFeesModal);
if (viewFeesBtn) viewFeesBtn.addEventListener('click', openFeesModal);
if (closeFeesModal) closeFeesModal.addEventListener('click', closeFeesModalFunc);

if (downloadBrochureBtn) downloadBrochureBtn.addEventListener('click', downloadBrochure);

// Close modals on outside click
if (leadFormModal) {
    leadFormModal.addEventListener('click', (e) => {
        if (e.target === leadFormModal) {
            closeModalFunc();
        }
    });
}

if (feesModal) {
    feesModal.addEventListener('click', (e) => {
        if (e.target === feesModal) {
            closeFeesModalFunc();
        }
    });
}

// Close modals on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (leadFormModal && !leadFormModal.classList.contains('hidden')) {
            closeModalFunc();
        }
        if (feesModal && !feesModal.classList.contains('hidden')) {
            closeFeesModalFunc();
        }
    }
});

// Enhanced Form submission with all required fields
if (leadForm) {
    leadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = leadForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
        
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
            university: 'Delhi University',
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            state: formData.get('state'),
            course: formData.get('course'),
            intakeYear: formData.get('intakeYear'),
            message: formData.get('message') || '',
            consent: true,
            timestamp: new Date().toISOString(),
            source: 'Delhi University Landing Page'
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
}

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const spans = mobileMenuBtn.querySelectorAll('span');
        
        if (!mobileMenu.classList.contains('hidden')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        });
    });
}

console.log('Delhi University landing page initialized with all enhanced features');
