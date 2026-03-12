// ============================================
// TEACHER DASHBOARD.JS - Teacher dashboard functionality
// ============================================

const API_URL = 'http://localhost:5000/api';
let teacherProfile = null;

// Check authentication
const token = localStorage.getItem('token');
if (!token) {
    window.location.href = 'index.html';
}

// Fetch teacher profile
async function fetchProfile() {
    try {
        const response = await fetch(`${API_URL}/teacher/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            teacherProfile = await response.json();
            document.getElementById('sidebarName').textContent = teacherProfile.fullName;
            loadPage('dashboard');
        } else {
            localStorage.clear();
            window.location.href = 'index.html';
        }
    } catch (error) {
        console.error('Error fetching profile:', error);
    }
}

// Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('bg-secondary'));
        link.classList.add('bg-secondary');
        loadPage(link.dataset.page);
    });
});

// Load page content
async function loadPage(page) {
    const contentArea = document.getElementById('contentArea');
    
    switch(page) {
        case 'profile':
            contentArea.innerHTML = await renderProfile();
            break;
        case 'dashboard':
            contentArea.innerHTML = await renderDashboard();
            break;
        case 'masterlist':
            contentArea.innerHTML = await renderMasterlist();
            break;
        case 'subjects':
            contentArea.innerHTML = await renderSubjects();
            attachSubjectHandlers();
            break;
        case 'officers':
            contentArea.innerHTML = await renderOfficers();
            break;
    }
}

// Render Profile
async function renderProfile() {
    return `
        <div class="max-w-4xl mx-auto">
            <div class="bg-white rounded-2xl shadow-lg p-8">
                <div class="flex items-start space-x-6 mb-6">
                    <div class="flex-shrink-0">
                        <img src="https://via.placeholder.com/150" alt="Profile" class="w-32 h-32 rounded-full">
                    </div>
                    <div class="flex-1">
                        <h2 class="text-2xl font-bold text-primary mb-4">Profile Information</h2>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm text-gray-600">Name</p>
                                <p class="font-semibold">${teacherProfile.fullName}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Email</p>
                                <p class="font-semibold">${teacherProfile.userId.email}</p>
                            </div>
                            ${teacherProfile.advisorySection ? `
                            <div>
                                <p class="text-sm text-gray-600">Advisory Section</p>
                                <p class="font-semibold">${teacherProfile.advisorySection}</p>
                            </div>
                            ` : ''}
                            <div>
                                <p class="text-sm text-gray-600">Office</p>
                                <p class="font-semibold">${teacherProfile.office}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="border-t pt-6">
                    <h3 class="text-xl font-bold text-primary mb-4">Calendar</h3>
                    <div id="calendar" class="bg-gray-50 p-4 rounded-lg">
                        <p class="text-gray-600">Calendar view for appointments</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render Dashboard
async function renderDashboard() {
    return `
        <div class="max-w-6xl mx-auto">
            <h2 class="text-2xl font-bold text-primary mb-6">Section Summary</h2>
            
            <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h3 class="text-xl font-bold text-primary mb-4">Attendance Overview</h3>
                <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p class="text-gray-600">Graph visualization would go here</p>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <p class="text-gray-600 text-sm">Total Students</p>
                    <p class="text-3xl font-bold text-primary">0</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <p class="text-gray-600 text-sm">Absences</p>
                    <p class="text-3xl font-bold text-red-600">0</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <p class="text-gray-600 text-sm">Late</p>
                    <p class="text-3xl font-bold text-yellow-600">0</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <p class="text-gray-600 text-sm">Excused</p>
                    <p class="text-3xl font-bold text-blue-600">0</p>
                </div>
            </div>
        </div>
    `;
}

// Render Masterlist
async function renderMasterlist() {
    try {
        const response = await fetch(`${API_URL}/teacher/masterlist`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const students = await response.json();
        
        return `
            <div class="max-w-6xl mx-auto">
                <h2 class="text-2xl font-bold text-primary mb-6">Class Masterlist</h2>
                <div class="bg-white rounded-2xl shadow-lg p-8">
                    ${students.length === 0 ? '<p class="text-gray-600">No students in your advisory section</p>' : `
                    <table class="w-full">
                        <thead>
                            <tr class="border-b">
                                <th class="text-left py-3">LRN</th>
                                <th class="text-left py-3">Name</th>
                                <th class="text-left py-3">Gender</th>
                                <th class="text-left py-3">Position</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${students.map(s => `
                                <tr class="border-b hover:bg-gray-50">
                                    <td class="py-3">${s.lrn}</td>
                                    <td class="py-3">${s.fullName}</td>
                                    <td class="py-3">${s.gender}</td>
                                    <td class="py-3">${s.position || '-'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    `}
                </div>
            </div>
        `;
    } catch (error) {
        return '<p class="text-red-600">Error loading masterlist</p>';
    }
}

// Render Subjects
async function renderSubjects() {
    const subjects = teacherProfile.subjectsHandled || [];
    
    return `
        <div class="max-w-6xl mx-auto">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-primary">Subjects Handled</h2>
                <button id="addSubjectBtn" class="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg">
                    Add Subject
                </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                ${subjects.map(subject => `
                    <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                        <h3 class="text-lg font-bold text-primary mb-2">${subject.subjectName}</h3>
                        <p class="text-gray-600 text-sm mb-4">Section: ${subject.section}</p>
                        <div class="flex space-x-2">
                            <button class="flex-1 bg-accent hover:bg-primary text-white px-4 py-2 rounded-lg text-sm">
                                View Attendance
                            </button>
                            <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm">
                                Remove
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function attachSubjectHandlers() {
    document.getElementById('addSubjectBtn')?.addEventListener('click', () => {
        // Add subject modal logic here
        alert('Add subject functionality');
    });
}

// Render Officers
async function renderOfficers() {
    return `
        <div class="max-w-6xl mx-auto">
            <h2 class="text-2xl font-bold text-primary mb-6">Class Officers</h2>
            
            <div class="space-y-6">
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-lg font-bold text-secondary mb-4">Board of Directors</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <p class="text-sm text-gray-600">Chairperson</p>
                            <input type="text" placeholder="Search student..." class="w-full px-3 py-2 border rounded-lg">
                        </div>
                        <div>
                            <p class="text-sm text-gray-600">Vice-Chairperson</p>
                            <input type="text" placeholder="Search student..." class="w-full px-3 py-2 border rounded-lg">
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-lg font-bold text-secondary mb-4">Supervisory Committee</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <p class="text-sm text-gray-600">Chairperson</p>
                            <input type="text" placeholder="Search student..." class="w-full px-3 py-2 border rounded-lg">
                        </div>
                        <div>
                            <p class="text-sm text-gray-600">Vice-Chairperson</p>
                            <input type="text" placeholder="Search student..." class="w-full px-3 py-2 border rounded-lg">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'index.html';
});

// Initialize
fetchProfile();
