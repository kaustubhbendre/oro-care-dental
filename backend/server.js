const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

app.post('/api/send-appointment-email', async (req, res) => {
  const { patientEmail, patientName, date, time, doctor, service } = req.body;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: patientEmail,
    subject: 'Appointment Confirmation - Oro-Care Dental',
    html: `
      <h2>Appointment Confirmed!</h2>
      <p>Dear ${patientName},</p>
      <p>Your appointment has been scheduled:</p>
      <ul>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Time:</strong> ${time}</li>
        <li><strong>Doctor:</strong> ${doctor}</li>
        <li><strong>Service:</strong> ${service}</li>
      </ul>
      <p>Thank you for choosing Oro-Care Dental!</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent to:', patientEmail);
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('❌ Email error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log('🚀 Backend running on port 5000');
});