# 🔐 Default Passwords Reference
## SAO E-Record Filing System

This document contains all default passwords organized by grade level and section.

---

## 📋 How Default Passwords Work

1. **Auto-Fill on Registration**: When students select their section during registration, the password field automatically fills with the default password
2. **Editable**: Students can change the default password to their own custom password for more privacy
3. **Format**: `[SECTION_CODE][GRADE][SECTION_NUMBER]`
   - Example: `MARG1201` = Margaret (MARG) + Grade 12 (12) + Section 01 (01)

---

## 🎓 Grade 7 Default Passwords

| Section | PIN | Default Password |
|---------|-----|------------------|
| St. Anthony | 0017 | **ANTH0701** |
| St. Elizabeth | 0027 | **ELIZ0702** |
| St. Francis | 0037 | **FRAN0703** |
| St. Joseph | 0047 | **JOSE0704** |
| St. Michael | 0057 | **MICH0705** |
| St. Roque | 0067 | **ROQU0706** |
| St. Thomas | 0077 | **THOM0707** |

---

## 🎓 Grade 8 Default Passwords

| Section | PIN | Default Password |
|---------|-----|------------------|
| St. Andrew | 0018 | **ANDR0801** |
| St. Jude | 0028 | **JUDE0802** |
| St. Lorenzo | 0038 | **LORE0803** |
| St. Martin | 0048 | **MART0804** |
| St. Paul | 0058 | **PAUL0805** |
| St. Peter | 0068 | **PETE0806** |

---

## 🎓 Grade 9 Default Passwords

| Section | PIN | Default Password |
|---------|-----|------------------|
| St. Agnes | 0019 | **AGNE0901** |
| St. Anne | 0029 | **ANNE0902** |
| St. Bernadette | 0039 | **BERN0903** |
| St. Bridget | 0049 | **BRID0904** |
| St. Monica | 0059 | **MONI0905** |
| St. Therese | 0069 | **THER0906** |

---

## 🎓 Grade 10 Default Passwords

| Section | PIN | Default Password |
|---------|-----|------------------|
| St. Benedict | 0101 | **BENE1001** |
| St. John | 0102 | **JOHN1002** |
| St. Luke | 0103 | **LUKE1003** |
| St. Mark | 0104 | **MARK1004** |
| St. Matthew | 0105 | **MATT1005** |
| St. Phillip | 0106 | **PHIL1006** |

---

## 🎓 Grade 11 Default Passwords

### STEM (Science Technology Engineering and Mathematics)

| Section | PIN | Default Password |
|---------|-----|------------------|
| St. Gregory | 0111 | **GREG1101** |
| St. Ignatius | 0112 | **IGNA1102** |
| St. Pedro Calungsod | 0113 | **PEDR1103** |

### HUMSS (Humanities and Social Sciences)

| Section | PIN | Default Password |
|---------|-----|------------------|
| St. James | 0114 | **JAME1104** |
| St. Timothy | 0115 | **TIMO1105** |

### TVL (Technical-Vocational-Livelihood)

| Section | PIN | Default Password |
|---------|-----|------------------|
| St. Hannibal | 0116 | **HANN1106** |

### ABM (Accountancy and Business Management)

| Section | PIN | Default Password |
|---------|-----|------------------|
| St. Pio | 0117 | **PIO1107** |

---

## 🎓 Grade 12 Default Passwords

### STEM (Science Technology Engineering and Mathematics)

| Section | PIN | Default Password |
|---------|-----|------------------|
| St. Margaret | 0121 | **MARG1201** |
| St. Martha | 0122 | **MART1202** |
| St. Rita of Casia | 0123 | **RITA1203** |

### HUMSS (Humanities and Social Sciences)

| Section | PIN | Default Password |
|---------|-----|------------------|
| St. Philomena | 0124 | **PHIL1204** |
| St. Teresa de Avila | 0125 | **TERE1205** |

### TVL (Technical-Vocational-Livelihood)

| Section | PIN | Default Password |
|---------|-----|------------------|
| St. Agatha | 0126 | **AGAT1206** |

### ABM (Accountancy and Business Management)

| Section | PIN | Default Password |
|---------|-----|------------------|
| St. Gertrude | 0127 | **GERT1207** |

---

## 🔒 Security Notes

1. **Default passwords are temporary** - Students should change them after first login
2. **Passwords are case-sensitive** - Must be entered exactly as shown
3. **Firebase Authentication** - All passwords are securely hashed
4. **Password Requirements**:
   - Minimum 6 characters (Firebase requirement)
   - Can include letters, numbers, and special characters
   - Default passwords are 8 characters for better security

---

## 📝 For Administrators

### Resetting Student Passwords

If a student forgets their password:

1. **Option 1: Use Default Password**
   - Look up their section's default password from this document
   - Have them login with the default password
   - Instruct them to change it immediately

2. **Option 2: Firebase Console**
   - Go to Firebase Console → Authentication
   - Find the user by email
   - Click "Reset password"
   - Send password reset email

3. **Option 3: SAO Coordinator**
   - SAO can manually reset passwords through the system
   - New temporary password will be sent to student's email

---

## 🎯 Quick Reference

### Most Common Passwords (Grade 12 St. Margaret - Seeded Data)

- **Grade 12 St. Margaret (STEM)**: `MARG1201`
- All 51 seeded students use this password by default

### Testing Accounts

For testing purposes, you can use:
- **Email**: Any from Grade 12 St. Margaret list
- **Password**: `MARG1201`
- **Example**: 
  - Email: `doouuiiee@gmail.com`
  - Password: `MARG1201`

---

## 📞 Support

If you need help with passwords:
- **Email**: sao.digital.records@gmail.com
- **Phone**: 09*********

---

**Last Updated**: March 12, 2026
**Version**: 2.0
