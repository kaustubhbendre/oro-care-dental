import React, { useState } from 'react';

export default function PatientDashboard({ userEmail, onLogout }) {
  const [activeTab, setActiveTab] = useState('appointments');

  // Sample data - replace with backend API calls
  const appointments = [
    { id: 1, date: '2024-07-15', time: '2:00 PM', doctor: 'Dr. Shashank Kumar', service: 'Teeth Cleaning', status: 'Completed' },
    { id: 2, date: '2024-08-20', time: '3:30 PM', doctor: 'Dr. Shashank Kumar', service: 'Root Canal', status: 'Upcoming' },
  ];

  const treatments = [
    { id: 1, name: 'Teeth Cleaning', date: '2024-07-15', doctor: 'Dr. Shashank Kumar', cost: '$50' },
    { id: 2, name: 'Dental Implant', date: '2024-06-10', doctor: 'Dr. Shashank Kumar', cost: '$1200' },
  ];

  const payments = [
    { id: 1, treatment: 'Teeth Cleaning', date: '2024-07-15', amount: '$50', status: 'Paid' },
    { id: 2, treatment: 'Dental Implant', date: '2024-06-10', amount: '$1200', status: 'Paid' },
  ];

  return (
    <div style={{ padding: '30px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Patient Dashboard</h1>
        <button onClick={onLogout} style={{ padding: '10px 20px', background: '#c41e3a', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
      </div>

      <p style={{ fontSize: '16px', color: '#666', marginBottom: '20px' }}>Welcome, {userEmail}</p>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '2px solid #ddd' }}>
        <button onClick={() => setActiveTab('appointments')} style={{ padding: '10px 20px', background: activeTab === 'appointments' ? '#1a3766' : '#f0f0f0', color: activeTab === 'appointments' ? 'white' : 'black', border: 'none', cursor: 'pointer' }}>Appointments</button>
        <button onClick={() => setActiveTab('treatments')} style={{ padding: '10px 20px', background: activeTab === 'treatments' ? '#1a3766' : '#f0f0f0', color: activeTab === 'treatments' ? 'white' : 'black', border: 'none', cursor: 'pointer' }}>Treatments</button>
        <button onClick={() => setActiveTab('payments')} style={{ padding: '10px 20px', background: activeTab === 'payments' ? '#1a3766' : '#f0f0f0', color: activeTab === 'payments' ? 'white' : 'black', border: 'none', cursor: 'pointer' }}>Payments</button>
      </div>

      {activeTab === 'appointments' && (
        <div>
          <h2>Your Appointments</h2>
          {appointments.map(apt => (
            <div key={apt.id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '15px', borderRadius: '5px' }}>
              <p><strong>Date:</strong> {apt.date} at {apt.time}</p>
              <p><strong>Doctor:</strong> {apt.doctor}</p>
              <p><strong>Service:</strong> {apt.service}</p>
              <p><strong>Status:</strong> {apt.status}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'treatments' && (
        <div>
          <h2>Treatment History</h2>
          {treatments.map(treat => (
            <div key={treat.id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '15px', borderRadius: '5px' }}>
              <p><strong>Treatment:</strong> {treat.name}</p>
              <p><strong>Date:</strong> {treat.date}</p>
              <p><strong>Doctor:</strong> {treat.doctor}</p>
              <p><strong>Cost:</strong> {treat.cost}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'payments' && (
        <div>
          <h2>Payment History</h2>
          {payments.map(pay => (
            <div key={pay.id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '15px', borderRadius: '5px' }}>
              <p><strong>Treatment:</strong> {pay.treatment}</p>
              <p><strong>Date:</strong> {pay.date}</p>
              <p><strong>Amount:</strong> {pay.amount}</p>
              <p><strong>Status:</strong> <span style={{ color: 'green', fontWeight: 'bold' }}>{pay.status}</span></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}