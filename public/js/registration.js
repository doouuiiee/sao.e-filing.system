// ============================================
// REGISTRATION.JS - Multi-step registration logic
// ============================================

const API_URL = 'http://localhost:5000/api';

// Section data with pins
const sectionData = {
    'Grade 7': [
        { name: 'St. Anthony', pin: '0017' },
        { name: 'St. Elizabeth', pin: '0027' },
        { name: 'St. Francis', pin: '0037' },
        { name: 'St. Joseph', pin: '0047' },
        { name: 'St. Michael', pin: '0057' },
        { name: 'St. Roque', pin: '0067' },
        { name: 'St. Thomas', pin: '0077' }
    ],
    'Grade 8': [
        { name: 'St. Andrew', pin: '0018' },
        { name: 'St. Jude', pin: '0028' },
        { name: 'St. Lorenzo', pin: '0038' },
        { name: 'St. Martin', pin: '0048' },
        { name: 'St. Paul', pin: '0058' },
        { name: 'St. Peter', pin: '0068' }
    ],
    'Grade 9': [
        { name: 'St Agnes', pin: '0019' },
        { name: 'St. Anne', pin: '0029' },
        { name: 'St. Bernadette', pin: '0039' },
        { name: 'St. Bridget', pin: '0049' },
        { name: 'St. Monica', pin: '0059' },
        { name: 'St. Therese', pin: '0069' }
    ],
    'Grade 10': [
        { name: 'St. Benedict', pin: '0101' },
        { name: 'St. John', pin: '0102' },
        { name: 'St. Luke', pin: '0103' },
        { name: 'St. Mark', pin: '0104' },
        { name: 'St. Matthew', pin: '0105' },
        { name: 'St. Phillip', pin: '0106' }
    ],
    'Grade 11': [
        { name: 'St. Gregory', pin: '0111', strand: 'STEM (Science Technology Engineering and Mathematics)' },
        { name: 'St. Ignatius', pin: '0112', strand: 'STEM (Science Technology Engineering and Mathematics)' },
        { name: 'St. Pedro Calungsod', pin: '0113', strand: 'STEM (Science Technology Engineering and Mathematics)' },
        { name: 'St. James', pin: '0114', strand: 'HUMSS (Humanities and Social Sciences)' },
        { name: 'St. Timothy', pin: '0115', strand: 'HUMSS (Humanities and Social Sciences)' },
        { name: 'St. Hannibal', pin: '0116', strand: 'TVL (Technical-Vocational-Livelihood)' },
        { name: 'St. Pio', pin: '0117', strand: 'ABM (Accountancy and Business Management)' }
    ],
    'Grade 12': [
        { name: 'St. Margaret', pin: '0121', strand: 'STEM (Science Technology Engineering and Mathematics)' },
        { name: 'St. Martha', pin: '0122', strand: 'STEM (Science Technology Engineering and Mathematics)' },
        { name: 'St. Rita of Casia', pin: '0123', strand: 'STEM (Science Technology Engineering and Mathematics)' },
        { name: 'St. Philomena', pin: '0124', strand: 'HUMSS (Humanities and Social Sciences)' },
        { name: 'St. Teresa de Avila', pin: '0125', strand: 'HUMSS (Humanities and Social Sciences)' },
        { name: 'St. Agatha', pin: '0126', strand: 'TVL (Technical-Vocational-Livelihood)' },
        { name: 'St. Gertrude', pin: '0127', strand: 'ABM (Accountancy and Business Management)' }
    ]
};

let currentStep = 1;
let studentData = {};

// Role selection
document.getElementById('selectStudent').addEventListener('click', () => {
    document.getElementById('roleSelection').classList.add('hidden');
    document.getElementById('studentRegForm').classList.remove('hidden');
    renderStudentStep(1);
});

document.getElementById('selectTeacher').addEventListener('click', () => {
    document.getElementById('roleSelection').classList.add('hidden');
    document.getElementById('teacherRegForm').classList.remove('hidden');
    populateAdvisorySections();
});

// Populate advisory sections for teacher
function populateAdvisorySections() {
    const select = document.getElementById('teacherAdvisory');
    Object.keys(sectionData).forEach(grade => {
        sectionData[grade].forEach(section => {
            const option = document.createElement('option');
            option.value = `${grade} - ${section.name}`;
            option.textContent = `${grade} - ${section.name}`;
            select.appendChild(option);
        });
    });
}

// Render student registration steps
function renderStudentStep(step) {
    currentStep = step;
    const container = document.getElementById('studentFormContent');
    
    let html = `
        <div class="mb-6">
            <div class="flex justify-between items-center mb-4">
                ${[1, 2, 3, 4].map(s => `
                    <div class="flex-1 ${s < 4 ? 'mr-2' : ''}">
                        <div class="h-2 rounded-full ${s <= step ? 'bg-primary' : 'bg-gray-300'}"></div>
                        <p class="text-xs text-center mt-1 ${s <= step ? 'text-primary font-semibold' : 'text-gray-400'}">
                            Step ${s}
                        </p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    if (step === 1) {
        html += `
            <form id="step1Form" class="space-y-4">
                <h3 class="text-lg font-semibold text-primary mb-4">Student Information</h3>
                
                <input type="text" id="lrn" placeholder="LRN (e.g. 2024120001)" required
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
                
                <input type="text" id="fullName" placeholder="Full Name (Last Name, First Name, Middle Name)" required
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
                
                <select id="gradeLevel" required class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="">Select Grade Level</option>
                    <option value="Grade 7">Grade 7</option>
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                </select>
                
                <select id="section" required class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="">Select Section</option>
                </select>
                
                <input type="text" id="strand" placeholder="Strand (Auto-filled for Grade 11-12)" readonly
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100">
                
                <input type="email" id="email" placeholder="Email (e.g. student@gmail.com)" required
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
                
                <input type="password" id="password" placeholder="Password" required
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
                
                <select id="gender" required class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                
                <button type="submit" class="w-full bg-primary hover:bg-secondary text-white py-3 rounded-xl font-medium transition duration-300">
                    Next
                </button>
            </form>
        `;
    } else if (step === 2) {
        html += `
            <form id="step2Form" class="space-y-4">
                <h3 class="text-lg font-semibold text-primary mb-4">Parent/Guardian Information</h3>
                
                <input type="text" id="parentFullName" placeholder="Full Name" required
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
                
                <input type="email" id="parentEmail" placeholder="Email" required
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
                
                <input type="tel" id="parentContact" placeholder="Contact Number" required
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
                
                <select id="parentRelationship" required class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="">Select Relationship</option>
                    <option value="Mother">Mother</option>
                    <option value="Father">Father</option>
                    <option value="Guardian">Guardian</option>
                </select>
                
                <textarea id="homeAddress" placeholder="Home Address" required rows="3"
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
                
                <label class="flex items-start space-x-2">
                    <input type="checkbox" id="parentalConsent" required class="mt-1">
                    <span class="text-sm text-gray-700">I give consent for my child's information to be collected and processed by Cordova Catholic Cooperative School for academic and administrative purposes.</span>
                </label>
                
                <div class="flex space-x-4">
                    <button type="button" id="backBtn1" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 rounded-xl font-medium transition duration-300">
                        Back
                    </button>
                    <button type="submit" class="flex-1 bg-primary hover:bg-secondary text-white py-3 rounded-xl font-medium transition duration-300">
                        Next
                    </button>
                </div>
            </form>
        `;
    } else if (step === 3) {
        html += `
            <div class="space-y-4">
                <h3 class="text-lg font-semibold text-primary mb-4">Review Information</h3>
                
                <div class="bg-gray-50 p-4 rounded-xl space-y-2">
                    <h4 class="font-semibold text-secondary">Student Information</h4>
                    <p><span class="font-medium">LRN:</span> ${studentData.lrn}</p>
                    <p><span class="font-medium">Name:</span> ${studentData.fullName}</p>
                    <p><span class="font-medium">Grade:</span> ${studentData.gradeLevel}</p>
                    <p><span class="font-medium">Section:</span> ${studentData.section}</p>
                    ${studentData.strand ? `<p><span class="font-medium">Strand:</span> ${studentData.strand}</p>` : ''}
                    <p><span class="font-medium">Email:</span> ${studentData.email}</p>
                    <p><span class="font-medium">Gender:</span> ${studentData.gender}</p>
                </div>
                
                <div class="bg-gray-50 p-4 rounded-xl space-y-2">
                    <h4 class="font-semibold text-secondary">Parent/Guardian Information</h4>
                    <p><span class="font-medium">Name:</span> ${studentData.parentFullName}</p>
                    <p><span class="font-medium">Email:</span> ${studentData.parentEmail}</p>
                    <p><span class="font-medium">Contact:</span> ${studentData.parentContact}</p>
                    <p><span class="font-medium">Relationship:</span> ${studentData.parentRelationship}</p>
                    <p><span class="font-medium">Address:</span> ${studentData.homeAddress}</p>
                </div>
                
                <div class="flex space-x-4">
                    <button type="button" id="backBtn2" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 rounded-xl font-medium transition duration-300">
                        Back
                    </button>
                    <button type="button" id="submitBtn" class="flex-1 bg-primary hover:bg-secondary text-white py-3 rounded-xl font-medium transition duration-300">
                        Submit
                    </button>
                </div>
            </div>
        `;
    } else if (step === 4) {
        html += `
            <div class="text-center space-y-4">
                <div class="text-green-500 text-6xl mb-4">
                    <ion-icon name="checkmark-circle"></ion-icon>
                </div>
                <h3 class="text-2xl font-bold text-primary">Registration Complete!</h3>
                <p class="text-gray-700">Your account has been created successfully.</p>
                <button id="viewProfileBtn" class="bg-primary hover:bg-secondary text-white px-8 py-3 rounded-xl font-medium transition duration-300">
                    View Profile
                </button>
            </div>
        `;
    }
    
    container.innerHTML = html;
    attachStepEventListeners(step);
}

// Attach event listeners for each step
function attachStepEventListeners(step) {
    if (step === 1) {
        const gradeSelect = document.getElementById('gradeLevel');
        const sectionSelect = document.getElementById('section');
        const strandInput = document.getElementById('strand');
        
        gradeSelect.addEventListener('change', (e) => {
            const grade = e.target.value;
            sectionSelect.innerHTML = '<option value="">Select Section</option>';
            strandInput.value = '';
            
            if (grade && sectionData[grade]) {
                sectionData[grade].forEach(section => {
                    const option = document.createElement('option');
                    option.value = section.name;
                    option.textContent = section.name;
                    option.dataset.strand = section.strand || '';
                    option.dataset.password = section.password || '';
                    sectionSelect.appendChild(option);
                });
            }
        });
        
        sectionSelect.addEventListener('change', (e) => {
            const selectedOption = e.target.options[e.target.selectedIndex];
            strandInput.value = selectedOption.dataset.strand || '';
            
            // Auto-fill password based on section
            const passwordInput = document.getElementById('password');
            const defaultPassword = selectedOption.dataset.password || '';
            if (defaultPassword && passwordInput) {
                passwordInput.value = defaultPassword;
                passwordInput.placeholder = 'Default password (you can change this)';
            }
        });
        
        document.getElementById('step1Form').addEventListener('submit', (e) => {
            e.preventDefault();
            studentData = {
                lrn: document.getElementById('lrn').value,
                fullName: document.getElementById('fullName').value,
                gradeLevel: document.getElementById('gradeLevel').value,
                section: document.getElementById('section').value,
                strand: document.getElementById('strand').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                gender: document.getElementById('gender').value
            };
            renderStudentStep(2);
        });
    } else if (step === 2) {
        document.getElementById('backBtn1').addEventListener('click', () => renderStudentStep(1));
        
        document.getElementById('step2Form').addEventListener('submit', (e) => {
            e.preventDefault();
            studentData.parentFullName = document.getElementById('parentFullName').value;
            studentData.parentEmail = document.getElementById('parentEmail').value;
            studentData.parentContact = document.getElementById('parentContact').value;
            studentData.parentRelationship = document.getElementById('parentRelationship').value;
            studentData.homeAddress = document.getElementById('homeAddress').value;
            studentData.parentalConsent = document.getElementById('parentalConsent').checked;
            renderStudentStep(3);
        });
    } else if (step === 3) {
        document.getElementById('backBtn2').addEventListener('click', () => renderStudentStep(2));
        
        document.getElementById('submitBtn').addEventListener('click', async () => {
            try {
                const response = await fetch(`${API_URL}/auth/register/student`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: studentData.email,
                        password: studentData.password,
                        lrn: studentData.lrn,
                        fullName: studentData.fullName,
                        gradeLevel: studentData.gradeLevel,
                        section: studentData.section,
                        gender: studentData.gender,
                        parentFullName: studentData.parentFullName,
                        parentEmail: studentData.parentEmail,
                        parentContactNumber: studentData.parentContact,
                        parentRelationship: studentData.parentRelationship,
                        parentHomeAddress: studentData.homeAddress,
                        parentalConsent: studentData.parentalConsent
                    })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    renderStudentStep(4);
                } else {
                    alert(data.message || 'Registration failed');
                }
            } catch (error) {
                console.error('Registration error:', error);
                alert('An error occurred during registration');
            }
        });
    } else if (step === 4) {
        document.getElementById('viewProfileBtn').addEventListener('click', () => {
            document.getElementById('registerModal').classList.add('hidden');
            document.getElementById('loginModal').classList.remove('hidden');
        });
    }
}

// Teacher registration
document.getElementById('teacherForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const teacherData = {
        fullName: document.getElementById('teacherFullName').value,
        email: document.getElementById('teacherEmail').value,
        password: document.getElementById('teacherPassword').value,
        advisorySection: document.getElementById('teacherAdvisory').value,
        office: document.getElementById('teacherOffice').value
    };
    
    try {
        const response = await fetch(`${API_URL}/auth/register/teacher`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(teacherData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('Registration successful! Please login.');
            document.getElementById('registerModal').classList.add('hidden');
            document.getElementById('loginModal').classList.remove('hidden');
        } else {
            alert(data.message || 'Registration failed');
        }
    } catch (error) {
        console.error('Registration error:', error);
        alert('An error occurred during registration');
    }
});
