// ============================================
// STUDENT DASHBOARD.JS - Student dashboard functionality
// ============================================

const API_URL = 'http://localhost:5000/api';
let studentProfile = null;

// Check authentication
const token = localStorage.getItem('token');
if (!token) {
    window.location.href = 'index.html';
}

// Fetch student profile
async function fetchProfile() {
    try {
        const response = await fetch(`${API_URL}/student/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            studentProfile = await response.json();
            document.getElementById('sidebarName').textContent = studentProfile.fullName;
            
            // Check if Supervisory Committee
            if (studentProfile.position && studentProfile.position.includes('Supervisory Committee')) {
                document.getElementById('attendanceSheetNav').classList.remove('hidden');
            }
            
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
        case 'documentation':
            contentArea.innerHTML = await renderDocumentation();
            break;
        case 'classes':
            contentArea.innerHTML = await renderClasses();
            break;
        case 'attendance-sheet':
            contentArea.innerHTML = await renderAttendanceSheet();
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
                        <button class="mt-2 text-sm text-primary hover:underline">Upload Photo</button>
                    </div>
                    <div class="flex-1">
                        <h2 class="text-2xl font-bold text-primary mb-4">Profile Information</h2>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm text-gray-600">Name</p>
                                <p class="font-semibold">${studentProfile.fullName}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Role</p>
                                <p class="font-semibold">Regular Student</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">LRN</p>
                                <p class="font-semibold">${studentProfile.lrn}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Grade</p>
                                <p class="font-semibold">${studentProfile.gradeLevel}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Section</p>
                                <p class="font-semibold">${studentProfile.section}</p>
                            </div>
                            ${studentProfile.strand ? `
                            <div>
                                <p class="text-sm text-gray-600">Strand</p>
                                <p class="font-semibold">${studentProfile.strand}</p>
                            </div>
                            ` : ''}
                            <div>
                                <p class="text-sm text-gray-600">Email</p>
                                <p class="font-semibold">${studentProfile.userId.email}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Gender</p>
                                <p class="font-semibold">${studentProfile.gender}</p>
                            </div>
                            ${studentProfile.position ? `
                            <div class="col-span-2">
                                <p class="text-sm text-gray-600">Position</p>
                                <p class="font-semibold text-accent">${studentProfile.position}</p>
                            </div>
                            ` : ''}
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
    try {
        const summaryResponse = await fetch(`${API_URL}/student/attendance/summary`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const summary = await summaryResponse.json();
        
        return `
            <div class="max-w-6xl mx-auto">
                <h2 class="text-2xl font-bold text-primary mb-6">Semestral Summary</h2>
                
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm">Total Records</p>
                                <p class="text-3xl font-bold text-primary">${summary.totalRecords}</p>
                            </div>
                            <ion-icon name="document-outline" class="text-4xl text-primary"></ion-icon>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm">Absences</p>
                                <p class="text-3xl font-bold text-red-600">${summary.absent}</p>
                            </div>
                            <ion-icon name="close-circle-outline" class="text-4xl text-red-600"></ion-icon>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm">Late</p>
                                <p class="text-3xl font-bold text-yellow-600">${summary.late}</p>
                            </div>
                            <ion-icon name="time-outline" class="text-4xl text-yellow-600"></ion-icon>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm">Excused</p>
                                <p class="text-3xl font-bold text-blue-600">${summary.excused}</p>
                            </div>
                            <ion-icon name="checkmark-circle-outline" class="text-4xl text-blue-600"></ion-icon>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-xl font-bold text-primary mb-4">Attendance Graph</h3>
                    <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <p class="text-gray-600">Graph visualization would go here</p>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        return '<p class="text-red-600">Error loading dashboard</p>';
    }
}

// Render Documentation
async function renderDocumentation() {
    return `
        <div class="max-w-4xl mx-auto">
            <div class="bg-white rounded-2xl shadow-lg p-8">
                <h2 class="text-2xl font-bold text-primary mb-6">Documentation</h2>
                <div class="space-y-4">
                    <p class="text-gray-600">Upload and view excuse slips and documentation here.</p>
                    <button class="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg">
                        Upload Document
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Render Classes
async function renderClasses() {
    return `
        <div class="max-w-6xl mx-auto">
            <h2 class="text-2xl font-bold text-primary mb-6">My Classes</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
                    <h3 class="text-lg font-bold text-primary mb-2">Mathematics</h3>
                    <p class="text-gray-600 text-sm mb-4">Section: ${studentProfile.section}</p>
                    <div class="flex justify-between text-sm">
                        <span class="text-green-600">Present: 45</span>
                        <span class="text-red-600">Absent: 2</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render Attendance Sheet (Supervisory Committee only)
async function renderAttendanceSheet() {
    return `
        <div class="max-w-6xl mx-auto">
            <h2 class="text-2xl font-bold text-primary mb-6">Attendance Sheet</h2>
            <div class="bg-white rounded-2xl shadow-lg p-8">
                <p class="text-gray-600 mb-4">Submit daily attendance for your section</p>
                <button class="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg">
                    Create New Attendance Sheet
                </button>
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
