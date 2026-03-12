// ============================================
// SAO DASHBOARD.JS - SAO Coordinator dashboard functionality
// ============================================

const API_URL = 'http://localhost:5000/api';
let saoProfile = null;

// Check authentication
const token = localStorage.getItem('token');
if (!token) {
    window.location.href = 'index.html';
}

// Fetch SAO profile
async function fetchProfile() {
    try {
        const response = await fetch(`${API_URL}/teacher/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            saoProfile = await response.json();
            document.getElementById('sidebarName').textContent = saoProfile.fullName;
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
        case 'sections':
            contentArea.innerHTML = await renderSections();
            break;
        case 'appointments':
            contentArea.innerHTML = await renderAppointments();
            break;
        case 'notifications':
            contentArea.innerHTML = await renderNotifications();
            attachNotificationHandlers();
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
                        <h2 class="text-2xl font-bold text-primary mb-4">SAO Coordinator Profile</h2>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm text-gray-600">Name</p>
                                <p class="font-semibold">${saoProfile.fullName}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Email</p>
                                <p class="font-semibold">${saoProfile.userId.email}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Office</p>
                                <p class="font-semibold">${saoProfile.office}</p>
                            </div>
                        </div>
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
            <h2 class="text-2xl font-bold text-primary mb-6">SAO Overview</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <p class="text-gray-600 text-sm">Total Students</p>
                    <p class="text-3xl font-bold text-primary">0</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <p class="text-gray-600 text-sm">Pending Appointments</p>
                    <p class="text-3xl font-bold text-yellow-600">0</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <p class="text-gray-600 text-sm">Violations</p>
                    <p class="text-3xl font-bold text-red-600">0</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <p class="text-gray-600 text-sm">Attendance Issues</p>
                    <p class="text-3xl font-bold text-orange-600">0</p>
                </div>
            </div>
        </div>
    `;
}

// Render Sections
async function renderSections() {
    try {
        const response = await fetch(`${API_URL}/sao/sections`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const sections = await response.json();
        
        return `
            <div class="max-w-6xl mx-auto">
                <h2 class="text-2xl font-bold text-primary mb-6">Section Folders</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    ${Object.keys(sections).map(sectionName => `
                        <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
                            <div class="flex items-center space-x-3 mb-4">
                                <ion-icon name="folder-outline" class="text-4xl text-primary"></ion-icon>
                                <div>
                                    <h3 class="text-lg font-bold text-primary">${sectionName}</h3>
                                    <p class="text-sm text-gray-600">${sections[sectionName].length} students</p>
                                </div>
                            </div>
                            <button class="w-full bg-accent hover:bg-primary text-white py-2 rounded-lg text-sm">
                                View Records
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } catch (error) {
        return '<p class="text-red-600">Error loading sections</p>';
    }
}

// Render Appointments
async function renderAppointments() {
    try {
        const response = await fetch(`${API_URL}/sao/appointments`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const appointments = await response.json();
        
        return `
            <div class="max-w-6xl mx-auto">
                <h2 class="text-2xl font-bold text-primary mb-6">Appointments</h2>
                <div class="bg-white rounded-2xl shadow-lg p-8">
                    ${appointments.length === 0 ? '<p class="text-gray-600">No appointments</p>' : `
                    <table class="w-full">
                        <thead>
                            <tr class="border-b">
                                <th class="text-left py-3">Student</th>
                                <th class="text-left py-3">Type</th>
                                <th class="text-left py-3">Reason</th>
                                <th class="text-left py-3">Date</th>
                                <th class="text-left py-3">Status</th>
                                <th class="text-left py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${appointments.map(apt => `
                                <tr class="border-b hover:bg-gray-50">
                                    <td class="py-3">${apt.studentId.fullName}</td>
                                    <td class="py-3">
                                        <span class="px-2 py-1 rounded text-xs ${apt.type === 'Violation' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}">
                                            ${apt.type}
                                        </span>
                                    </td>
                                    <td class="py-3">${apt.reason}</td>
                                    <td class="py-3">${new Date(apt.date).toLocaleDateString()}</td>
                                    <td class="py-3">
                                        <span class="px-2 py-1 rounded text-xs ${
                                            apt.status === 'Done' ? 'bg-green-100 text-green-600' :
                                            apt.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                                            apt.status === 'Cancelled' ? 'bg-red-100 text-red-600' :
                                            'bg-blue-100 text-blue-600'
                                        }">
                                            ${apt.status}
                                        </span>
                                    </td>
                                    <td class="py-3">
                                        ${apt.status !== 'Done' ? `
                                        <button class="text-primary hover:underline text-sm">Edit</button>
                                        ` : ''}
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    `}
                </div>
            </div>
        `;
    } catch (error) {
        return '<p class="text-red-600">Error loading appointments</p>';
    }
}

// Render Notifications
async function renderNotifications() {
    try {
        // Fetch categories
        const violationRes = await fetch(`${API_URL}/sao/violation-categories`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const violationCategories = await violationRes.json();
        
        const attendanceRes = await fetch(`${API_URL}/sao/attendance-categories`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const attendanceCategories = await attendanceRes.json();
        
        return `
            <div class="max-w-4xl mx-auto">
                <h2 class="text-2xl font-bold text-primary mb-6">Send Notification</h2>
                <div class="bg-white rounded-2xl shadow-lg p-8">
                    <form id="notificationForm" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Student</label>
                            <input type="text" id="studentSearch" placeholder="Search student by name or LRN" required
                                class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
                            <input type="hidden" id="selectedStudentId">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
                            <select id="notificationType" required class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
                                <option value="">Select Type</option>
                                <option value="Violation">Violation</option>
                                <option value="Attendance Matter">Attendance Matter</option>
                            </select>
                        </div>
                        
                        <div id="categoryContainer" class="hidden">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select id="category" required class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
                                <option value="">Select Category</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Additional Description (Optional)</label>
                            <textarea id="description" rows="3" placeholder="Add any additional details..."
                                class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
                                <input type="date" id="appointmentDate" required
                                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Time</label>
                                <input type="time" id="appointmentTime" required
                                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
                            </div>
                        </div>
                        
                        <button type="submit" class="w-full bg-primary hover:bg-secondary text-white py-3 rounded-xl font-medium transition duration-300">
                            Send Notification
                        </button>
                    </form>
                </div>
            </div>
        `;
    } catch (error) {
        return '<p class="text-red-600">Error loading notification form</p>';
    }
}

function attachNotificationHandlers() {
    const typeSelect = document.getElementById('notificationType');
    const categoryContainer = document.getElementById('categoryContainer');
    const categorySelect = document.getElementById('category');
    
    // Load categories when type changes
    typeSelect?.addEventListener('change', async (e) => {
        const type = e.target.value;
        categoryContainer.classList.remove('hidden');
        categorySelect.innerHTML = '<option value="">Select Category</option>';
        
        if (type === 'Violation') {
            const response = await fetch(`${API_URL}/sao/violation-categories`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const categories = await response.json();
            categories.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat;
                option.textContent = cat;
                categorySelect.appendChild(option);
            });
        } else if (type === 'Attendance Matter') {
            const response = await fetch(`${API_URL}/sao/attendance-categories`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const categories = await response.json();
            categories.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat;
                option.textContent = cat;
                categorySelect.appendChild(option);
            });
        }
    });
    
    document.getElementById('notificationForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const studentId = document.getElementById('selectedStudentId').value;
        const type = document.getElementById('notificationType').value;
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value;
        const date = document.getElementById('appointmentDate').value;
        const time = document.getElementById('appointmentTime').value;
        
        if (!studentId) {
            alert('Please select a student');
            return;
        }
        
        try {
            const response = await fetch(`${API_URL}/sao/appointments`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    studentId,
                    type,
                    category,
                    description,
                    date,
                    time
                })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                alert('Notification sent successfully!');
                loadPage('appointments');
            } else {
                alert(data.message || 'Failed to send notification');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
        }
    });
}

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'index.html';
});

// Initialize
fetchProfile();
