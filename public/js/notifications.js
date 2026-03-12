// ============================================
// NOTIFICATION SYSTEM
// ============================================

class NotificationManager {
    constructor() {
        this.notifications = [];
        this.unreadCount = 0;
        this.init();
    }

    // Initialize notification system
    init() {
        this.createNotificationBell();
        this.loadNotifications();
        this.setupEventListeners();
        
        // Check for new notifications every 30 seconds
        setInterval(() => this.checkNewNotifications(), 30000);
    }

    // Create notification bell UI
    createNotificationBell() {
        const bellHTML = `
            <div class="notification-bell" id="notificationBell">
                <ion-icon name="notifications-outline" style="font-size: 24px;"></ion-icon>
                <span class="notification-badge" id="notificationBadge" style="display: none;">0</span>
            </div>
            
            <div class="notification-dropdown" id="notificationDropdown" style="display: none;">
                <div class="notification-header">
                    <h3>Notifications</h3>
                    <button class="mark-all-read" id="markAllRead">Mark all as read</button>
                </div>
                <div class="notification-list" id="notificationList">
                    <div class="notification-empty">
                        <ion-icon name="notifications-off-outline" style="font-size: 48px;"></ion-icon>
                        <p>No notifications yet</p>
                    </div>
                </div>
            </div>
        `;

        // Find navbar or header to append notification bell
        const navbar = document.querySelector('.navbar') || document.querySelector('header');
        if (navbar) {
            const bellContainer = document.createElement('div');
            bellContainer.className = 'notification-container';
            bellContainer.innerHTML = bellHTML;
            navbar.appendChild(bellContainer);
        }
    }

    // Setup event listeners
    setupEventListeners() {
        const bell = document.getElementById('notificationBell');
        const dropdown = document.getElementById('notificationDropdown');
        const markAllRead = document.getElementById('markAllRead');

        if (bell) {
            bell.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
            });
        }

        if (markAllRead) {
            markAllRead.addEventListener('click', () => this.markAllAsRead());
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.notification-container')) {
                dropdown.style.display = 'none';
            }
        });
    }

    // Load notifications from backend
    async loadNotifications() {
        try {
            const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
            const response = await fetch('/api/notifications', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Failed to load notifications');

            const data = await response.json();
            this.notifications = data.notifications || [];
            this.updateUI();
        } catch (error) {
            console.error('Error loading notifications:', error);
        }
    }

    // Check for new notifications
    async checkNewNotifications() {
        await this.loadNotifications();
    }

    // Update notification UI
    updateUI() {
        const badge = document.getElementById('notificationBadge');
        const list = document.getElementById('notificationList');

        // Count unread notifications
        this.unreadCount = this.notifications.filter(n => !n.read).length;

        // Update badge
        if (this.unreadCount > 0) {
            badge.textContent = this.unreadCount > 99 ? '99+' : this.unreadCount;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }

        // Update notification list
        if (this.notifications.length === 0) {
            list.innerHTML = `
                <div class="notification-empty">
                    <ion-icon name="notifications-off-outline" style="font-size: 48px;"></ion-icon>
                    <p>No notifications yet</p>
                </div>
            `;
        } else {
            list.innerHTML = this.notifications.map(notification => this.createNotificationItem(notification)).join('');
            
            // Add click handlers
            list.querySelectorAll('.notification-item').forEach((item, index) => {
                item.addEventListener('click', () => this.markAsRead(this.notifications[index]._id));
            });
        }
    }

    // Create notification item HTML
    createNotificationItem(notification) {
        const timeAgo = this.getTimeAgo(notification.createdAt);
        const unreadClass = notification.read ? '' : 'unread';
        
        let icon = 'notifications-outline';
        if (notification.type === 'appointment') icon = 'calendar-outline';
        if (notification.type === 'violation') icon = 'warning-outline';
        if (notification.type === 'attendance') icon = 'time-outline';

        return `
            <div class="notification-item ${unreadClass}" data-id="${notification._id}">
                <div class="notification-icon">
                    <ion-icon name="${icon}"></ion-icon>
                </div>
                <div class="notification-content">
                    <h4>${notification.title}</h4>
                    <p>${notification.message}</p>
                    <span class="notification-time">${timeAgo}</span>
                </div>
                ${!notification.read ? '<div class="notification-dot"></div>' : ''}
            </div>
        `;
    }

    // Mark notification as read
    async markAsRead(notificationId) {
        try {
            const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
            await fetch(`/api/notifications/${notificationId}/read`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Update local state
            const notification = this.notifications.find(n => n._id === notificationId);
            if (notification) notification.read = true;
            
            this.updateUI();
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    }

    // Mark all as read
    async markAllAsRead() {
        try {
            const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
            await fetch('/api/notifications/read-all', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Update local state
            this.notifications.forEach(n => n.read = true);
            this.updateUI();
        } catch (error) {
            console.error('Error marking all as read:', error);
        }
    }

    // Get time ago string
    getTimeAgo(date) {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        
        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
        return new Date(date).toLocaleDateString();
    }

    // Show toast notification
    static showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <ion-icon name="${type === 'success' ? 'checkmark-circle' : type === 'error' ? 'close-circle' : 'information-circle'}"></ion-icon>
            <span>${message}</span>
        `;

        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Initialize notification manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.notificationManager = new NotificationManager();
});

// Export for use in other files
window.NotificationManager = NotificationManager;
