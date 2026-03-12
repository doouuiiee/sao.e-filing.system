// ============================================
// EMAIL SERVICE - Nodemailer configuration and email templates
// ============================================

const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Email templates
const emailTemplates = {
  // Student - Violation
  studentViolation: (studentName, violationType, date, time) => ({
    subject: 'Notice of Violation and Scheduled Meeting',
    html: `
      <p>Good day,</p>
      <p>This is to inform you that a violation has been recorded under your name in the Student Affairs Office (SAO) system.</p>
      <p><strong>Violation Recorded:</strong> ${violationType}</p>
      <p>To address this matter properly, you are required to attend a meeting with the SAO Coordinator.</p>
      <p><strong>Appointment Details:</strong></p>
      <ul>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Time:</strong> ${time}</li>
        <li><strong>Location:</strong> Student Affairs Office</li>
      </ul>
      <p>Please be reminded that attendance is mandatory. If you are unable to attend on the scheduled date and time, you may request a reschedule through the system, subject to approval by the SAO Coordinator.</p>
      <p>Failure to comply may result in further disciplinary action.</p>
      <p>Thank you for your cooperation.</p>
      <p>Sincerely,<br>
      Student Affairs Office (SAO)<br>
      Cordova Catholic Cooperative School</p>
    `
  }),

  // Student - Attendance Matter
  studentAttendance: (studentName, attendanceMatter, date, time) => ({
    subject: 'Attendance Concern Notification',
    html: `
      <p>Good day,</p>
      <p>This email serves as a notification regarding an attendance matter recorded under your name in the Student Affairs Office (SAO) system.</p>
      <p><strong>Attendance Concern:</strong> ${attendanceMatter}</p>
      <p>To clarify and address this concern, you are requested to attend a meeting with the SAO Coordinator.</p>
      <p><strong>Appointment Details:</strong></p>
      <ul>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Time:</strong> ${time}</li>
        <li><strong>Location:</strong> Student Affairs Office</li>
      </ul>
      <p>You may bring any supporting documents (such as an excuse slip or explanation letter) during the meeting. If you are unable to attend on the scheduled date, you may request a change of schedule through the system, subject to approval.</p>
      <p>Your cooperation is appreciated.</p>
      <p>Sincerely,<br>
      Student Affairs Office (SAO)<br>
      Cordova Catholic Cooperative School</p>
    `
  }),

  // Parent/Guardian - Violation
  parentViolation: (studentName, violationType, date, time) => ({
    subject: 'Notice of Student Violation and Scheduled Meeting',
    html: `
      <p>Good day,</p>
      <p>This is to formally inform you that a violation has been recorded under your child's name in the Student Affairs Office (SAO) system.</p>
      <p><strong>Violation Recorded:</strong> ${violationType}</p>
      <p>In order to properly address this matter, your child is required to attend a conference with the SAO Coordinator. Your presence as a parent/guardian is highly encouraged to ensure proper guidance and resolution.</p>
      <p><strong>Appointment Details:</strong></p>
      <ul>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Time:</strong> ${time}</li>
        <li><strong>Location:</strong> Student Affairs Office</li>
      </ul>
      <p>If you are unavailable on the scheduled date and time, a request for rescheduling may be submitted through the system, subject to approval.</p>
      <p>We seek your cooperation in helping us guide your child appropriately. Failure to comply may result in further disciplinary action.</p>
      <p>Thank you for your understanding and support.</p>
      <p>Sincerely,<br>
      Student Affairs Office (SAO)<br>
      Cordova Catholic Cooperative School</p>
    `
  }),

  // Parent/Guardian - Attendance Matter
  parentAttendance: (studentName, attendanceMatter, date, time) => ({
    subject: 'Attendance Concern Notification',
    html: `
      <p>Good day,</p>
      <p>This email serves as a formal notification regarding an attendance concern recorded under your child's name in the Student Affairs Office (SAO) system.</p>
      <p><strong>Attendance Concern:</strong> ${attendanceMatter}</p>
      <p>To clarify and properly address this concern, your child is requested to attend a meeting with the SAO Coordinator. Your presence as a parent/guardian is encouraged.</p>
      <p><strong>Appointment Details:</strong></p>
      <ul>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Time:</strong> ${time}</li>
        <li><strong>Location:</strong> Student Affairs Office</li>
      </ul>
      <p>Kindly advise your child to bring any supporting documents (e.g., excuse slip, medical certificate, explanation letter). If you are unable to attend on the scheduled date, you may request a change of schedule through the system, subject to approval.</p>
      <p>We appreciate your cooperation in helping us monitor and support your child's attendance.</p>
      <p>Sincerely,<br>
      Student Affairs Office (SAO)<br>
      Cordova Catholic Cooperative School</p>
    `
  }),

  // Class Adviser - Violation
  adviserViolation: (studentName, violationType, date, time) => ({
    subject: 'Student Violation Notification – For Your Information',
    html: `
      <p>Good day,</p>
      <p>This is to inform you that a violation has been recorded in the SAO system under the name of your advisee.</p>
      <p><strong>Student:</strong> ${studentName}</p>
      <p><strong>Violation Recorded:</strong> ${violationType}</p>
      <p>The student has been scheduled for a meeting with the SAO Coordinator on the following date:</p>
      <p><strong>Appointment Details:</strong></p>
      <ul>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Time:</strong> ${time}</li>
        <li><strong>Location:</strong> Student Affairs Office</li>
      </ul>
      <p>We are informing you for monitoring and guidance purposes. Your support in reinforcing proper conduct and values is highly appreciated.</p>
      <p>Thank you for your cooperation.</p>
      <p>Sincerely,<br>
      Student Affairs Office (SAO)<br>
      Cordova Catholic Cooperative School</p>
    `
  }),

  // Class Adviser - Attendance Matter
  adviserAttendance: (studentName, attendanceMatter, date, time) => ({
    subject: 'Attendance Matter Recorded – For Monitoring',
    html: `
      <p>Good day,</p>
      <p>This is to inform you that an attendance concern has been recorded in the SAO system under your advisee's name.</p>
      <p><strong>Student:</strong> ${studentName}</p>
      <p><strong>Attendance Concern:</strong> ${attendanceMatter}</p>
      <p>The student has been requested to attend a meeting with the SAO Coordinator on the following schedule:</p>
      <p><strong>Appointment Details:</strong></p>
      <ul>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Time:</strong> ${time}</li>
        <li><strong>Location:</strong> Student Affairs Office</li>
      </ul>
      <p>We are providing this notice for your monitoring and guidance. Your assistance in reminding and advising the student is greatly appreciated.</p>
      <p>Thank you for your cooperation.</p>
      <p>Sincerely,<br>
      Student Affairs Office (SAO)<br>
      Cordova Catholic Cooperative School</p>
    `
  })
};

// Send email function
const sendEmail = async (to, template) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: template.subject,
      html: template.html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error: error.message };
  }
};

// Send password reset email
const sendPasswordResetEmail = async (email, resetLink) => {
  const mailOptions = {
    from: `"SAO E-Record System" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Password Reset Request - SAO E-Record System',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #374426;">Password Reset Request</h2>
        <p>Hello,</p>
        <p>We received a request to reset your password for the SAO E-Record Filing System.</p>
        <p>Click the button below to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" 
             style="background-color: #374426; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>Or copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #666;">${resetLink}</p>
        <p><strong>This link will expire in 1 hour.</strong></p>
        <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">
          This is an automated email from the SAO E-Record Filing System.<br>
          Cordova Catholic School Multipurpose Cooperative
        </p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent to:', email);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

module.exports = { sendEmail, emailTemplates, sendPasswordResetEmail };
