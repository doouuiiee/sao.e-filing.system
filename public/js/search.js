// ============================================
// SEARCH FUNCTIONALITY
// ============================================

class SearchBar {
    constructor(options = {}) {
        this.placeholder = options.placeholder || 'Search...';
        this.onSearch = options.onSearch || (() => {});
        this.debounceTime = options.debounceTime || 300;
        this.debounceTimer = null;
    }

    // Create search bar HTML
    createSearchBar() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <div class="search-wrapper">
                <ion-icon name="search-outline" class="search-icon"></ion-icon>
                <input 
                    type="text" 
                    class="search-input" 
                    placeholder="${this.placeholder}"
                    id="searchInput"
                >
                <button class="search-clear" id="searchClear" style="display: none;">
                    <ion-icon name="close-circle" style="font-size: 20px;"></ion-icon>
                </button>
            </div>
        `;

        return searchContainer;
    }

    // Initialize search functionality
    init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container with id "${containerId}" not found`);
            return;
        }

        // Add search bar to container
        const searchBar = this.createSearchBar();
        container.appendChild(searchBar);

        // Get elements
        const searchInput = document.getElementById('searchInput');
        const searchClear = document.getElementById('searchClear');

        // Handle input with debounce
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            
            // Show/hide clear button
            searchClear.style.display = query ? 'flex' : 'none';

            // Debounce search
            clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => {
                this.onSearch(query);
            }, this.debounceTime);
        });

        // Handle clear button
        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            searchClear.style.display = 'none';
            this.onSearch('');
        });

        // Handle Enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = searchInput.value.trim();
                this.onSearch(query);
            }
        });
    }
}

// Search utility functions
const SearchUtils = {
    // Search in students
    searchStudents: async (query) => {
        try {
            const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
            const response = await fetch(`/api/students/search?q=${encodeURIComponent(query)}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Search failed');
            return await response.json();
        } catch (error) {
            console.error('Student search error:', error);
            return [];
        }
    },

    // Search in appointments
    searchAppointments: async (query) => {
        try {
            const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
            const response = await fetch(`/api/appointments/search?q=${encodeURIComponent(query)}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Search failed');
            return await response.json();
        } catch (error) {
            console.error('Appointment search error:', error);
            return [];
        }
    },

    // Search in attendance
    searchAttendance: async (query) => {
        try {
            const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
            const response = await fetch(`/api/attendance/search?q=${encodeURIComponent(query)}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Search failed');
            return await response.json();
        } catch (error) {
            console.error('Attendance search error:', error);
            return [];
        }
    },

    // Filter array locally
    filterArray: (array, query, fields) => {
        if (!query) return array;
        
        const lowerQuery = query.toLowerCase();
        return array.filter(item => {
            return fields.some(field => {
                const value = field.split('.').reduce((obj, key) => obj?.[key], item);
                return value && value.toString().toLowerCase().includes(lowerQuery);
            });
        });
    },

    // Highlight search terms
    highlightText: (text, query) => {
        if (!query) return text;
        
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
};

// Export for use in other files
window.SearchBar = SearchBar;
window.SearchUtils = SearchUtils;
