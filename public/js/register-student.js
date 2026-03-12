// Firebase configuration
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { 
    getAuth, 
    createUserWithEmailAndPassword,
    updateProfile
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBJRzX4adp_LFOARTc53UzX9OuOMHS0Tus",
    authDomain: "logininfo-c2e4a.firebaseapp.com",
    databaseURL: "https://logininfo-c2e4a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "logininfo-c2e4a",
    storageBucket: "logininfo-c2e4a.firebasestorage.app",
    messagingSenderId: "1044079063505",
    appId: "1:1044079063505:web:a331dd290feacfb2b5f0f0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Section data with default passwords
const sectionData = {
    'Grade 7': {
        sections: [
            { name: 'St. Anthony', password: 'ANTH0701' },
            { name: 'St. Elizabeth', password: 'ELIZ0702' },
            { name: 'St. Francis', password: 'FRAN0703' },
            { name: 'St. Joseph', password: 'JOSE0704' },
            { name: 'St. Michael', password: 'MICH0705' },
            { name: 'St. Roque', password: 'ROQU0706' },
            { name: 'St. Thomas', password: 'THOM0707' }
        ]
    },
    'Grade 8': {
        sections: [
            { name: 'St. Andrew', password: 'ANDR0801' },
            { name: 'St. Jude', password: 'JUDE0802' },
            { name: 'St. Lorenzo', password: 'LORE0803' },
            { name: 'St. Martin', password: 'MART0804' },
            { name: 'St. Paul', password: 'PAUL0805' },
            { name: 'St. Peter', password: 'PETE0806' }
        ]
    },
    'Grade 9': {
        sections: [
            { name: 'St Agnes', password: 'AGNE0901' },
            { name: 'St. Anne', password: 'ANNE0902' },
            { name: 'St. Bernadette', password: 'BERN0903' },
            { name: 'St. Bridget', password: 'BRID0904' },
            { name: 'St. Monica', password: 'MONI0905' },
            { name: 'St. Therese', password: 'THER0906' }
        ]
    },
    'Grade 10': {
        sections: [
            { name: 'St. Benedict', password: 'BENE1001' },
            { name: 'St. John', password: 'JOHN1002' },
            { name: 'St. Luke', password: 'LUKE1003' },
            { name: 'St. Mark', password: 'MARK1004' },
            { name: 'St. Matthew', password: 'MATT1005' },
            { name: 'St. Phillip', password: 'PHIL1006' }
        ]
    },
    'Grade 11': {
        'STEM': [
            { name: 'St. Gregory', password: 'GREG1101' },
            { name: 'St. Ignatius', password: 'IGNA1102' },
            { name: 'St. Pedro Calungsod', password: 'PEDR1103' }
        ],
        'HUMSS': [
            { name: 'St. James', password: 'JAME1104' },
            { name: 'St. Timothy', password: 'TIMO1105' }
        ],
        'TVL': [
            { name: 'St. Hannibal', password: 'HANN1106' }
        ],
        'ABM': [
            { name: 'St. Pio', password: 'PIO1107' }
        ]
    },
    'Grade 12': {
        'STEM': [
            { name: 'St. Margaret', password: 'MARG1201' },
            { name: 'St. Martha', password: 'MART1202' },
            { name: 'St. Rita of Casia', password: 'RITA1203' }
        ],
        'HUMSS': [
            { name: 'St. Philomena', password: 'PHIL1204' },
            { name: 'St. Teresa de Avila', password: 'TERE1205' }
        ],
        'TVL': [
            { name: 'St. Agatha', password: 'AGAT1206' }
        ],
        'ABM': [
            { name: 'St. Gertrude', password: 'GERT1207' }
        ]
    }
};

// Auto-fill password when section is selected
document.getElementById('section').addEventListener('change', function() {
    const grade = document.getElementById('gradeLevel').value;
    const strand = document.getElementById('strand').value;
    const section = this.value;
    const passwordInput = document.getElementById('password');

    if (!section) return;

    let defaultPassword = '';

    // For Grade 7-10 (no strands)
    if (grade === 'Grade 7' || grade === 'Grade 8' || grade === 'Grade 9' || grade === 'Grade 10') {
        const sectionObj = sectionData[grade].sections.find(s => s.name === section);
        if (sectionObj) {
            defaultPassword = sectionObj.password;
        }
    }
    // For Grade 11-12 (with strands)
    else if ((grade === 'Grade 11' || grade === 'Grade 12') && strand && strand !== 'N/A') {
        const sectionObj = sectionData[grade][strand].find(s => s.name === section);
        if (sectionObj) {
            defaultPassword = sectionObj.password;
        }
    }

    if (defaultPassword) {
        passwordInput.value = defaultPassword;
    }
});

// Handle form submission
document.getElementById('registrationForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Get form data
    const formData = {
        lrn: document.getElementById('lrn').value,
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        gradeLevel: document.getElementById('gradeLevel').value,
        strand: document.getElementById('strand').value,
        section: document.getElementById('section').value,
        gender: document.getElementById('gender').value,
        password: document.getElementById('password').value,
        parentGuardian: {
            name: document.getElementById('parentName').value,
            email: document.getElementById('parentEmail').value,
            contactNumber: document.getElementById('parentContact').value,
            relationship: document.getElementById('relationship').value,
            address: document.getElementById('homeAddress').value
        }
    };

    try {
        // Create Firebase user
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        // Update profile with display name
        await updateProfile(user, {
            displayName: formData.fullName
        });

        // Get ID token
        const idToken = await user.getIdToken();

        // Send student data to backend (MongoDB)
        const response = await fetch('/api/auth/register/student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Failed to register student in database');
        }

        const result = await response.json();

        // Store auth info
        localStorage.setItem('authToken', idToken);
        localStorage.setItem('userRole', 'student');

        alert('Registration successful! Redirecting to your dashboard...');
        window.location.href = 'student-dashboard.html';

    } catch (error) {
        console.error('Registration error:', error);
        
        let errorMsg = 'Registration failed. Please try again.';
        
        if (error.code === 'auth/email-already-in-use') {
            errorMsg = 'This email is already registered.';
        } else if (error.code === 'auth/weak-password') {
            errorMsg = 'Password should be at least 6 characters.';
        } else if (error.code === 'auth/invalid-email') {
            errorMsg = 'Invalid email address.';
        }

        alert(errorMsg);
    }
});
