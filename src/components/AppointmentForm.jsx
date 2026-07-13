// src/components/AppointmentForm.jsx
import emailjs from '@emailjs/browser';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';
import { CalendarCheck, Phone, Mail, Zap, Clock, DollarSign, MapPin, CheckCircle2 } from 'lucide-react';
import { createAppointment, isSupabaseConfigured } from '../lib/su...'

const services = [
  'Teeth Cleaning', 'Teeth Whitening', 'Root Canal Treatment',
  'Dental Implant', 'Veneers & Crowns', 'Fillings & Sealants',
  'Dentures & Bridges', 'Oral Surgery', 'Cosmetic Procedure',
  'Extractions', 'Mouth Guard', 'X-Ray & Check-up',
];

const timeSlots = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
  '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
];

export default function AppointmentForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    time_slot: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!formData.name.trim()) {
      validationErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      validationErrors.phone = 'Phone is required';
    } else if (!/^[0-9+\s-]{10,15}$/.test(formData.phone)) {
      validationErrors.phone = 'Invalid phone number';
    }

    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      validationErrors.email = 'Invalid email';
    }

    if (!formData.service) {
      validationErrors.service = 'Please select a service';
    }

    if (!formData.date) {
      validationErrors.date = 'Date is required';
    }

    if (!formData.time_slot) {
      validationErrors.time_slot = 'Time is required';
    }

    return validationErrors;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      await createAppointment(formData);

      try {
        await emailjs.send(
          'service_2c8sj8t',
          'template_7q4o4ka',
          {
            patient_name: formData.name,
            patient_phone: formData.phone,
            patient_email: formData.email || 'Not provided',
            service: formData.service,
            date: formData.date,
            time: formData.time_slot,
            message: formData.message || 'None',
          },
          'A-rLV3zDOuZKFf4Fr'
        );
      } catch (emailErr) {
        console.error('Email notification failed:', emailErr);
      }

      toast.success(isSupabaseConfigured
        ? 'Appointment booked! We\'ll confirm shortly.'
        : 'Appointment saved locally. Connect Supabase later to sync it online.');
      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        date: '',
        time_slot: '',
        message: ''
      });
      setErrors({});
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error(err);
      if (err?.message?.includes('Database not configured')) {
        toast.error('Database not set up. Please configure Supabase in .env file.');
      } else {
        toast.error(err?.message || 'Something went wrong. Please call us directly.');
      }
    } finally {
      setSubmitting(false);
    }
  };
  
  const demoMode = !isSupabaseConfigured;

  // Get tomorrow's date as minimum
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <section id="appointment" className="appt-section">
      {/* Background */}
      <div className="appt-bg">
        <div className="appt-blob" />
      </div>

      <div className="container appt-container" ref={ref}>
        {/* Left Info */}
        <motion.div
          className="appt-info"
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-tag light-tag">Book a Visit</span>
          <h2 className="heading-lg appt-title">
            Book Your Appointment Today
          </h2>
          <p className="appt-desc">
            Fill out the form and we'll confirm your appointment within 2 hours. 
            Or call us directly for immediate assistance.
          </p>

          <div className="appt-features">
            {[
              { icon: Zap, title: 'Quick Confirmation', desc: 'Within 2 hours' },
              { icon: Clock, title: 'No Wait Time', desc: 'On-time appointments' },
              { icon: DollarSign, title: 'Free Consultation', desc: 'For new patients' },
              { icon: MapPin, title: 'Parking Available', desc: 'At the clinic' },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <div className="appt-feature" key={f.title}>
                  <div className="feature-icon"><Icon size={18} /></div>
                  <div>
                    <p className="feature-title">{f.title}</p>
                    <p className="feature-desc">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="appt-contact-info">
            <a href="tel:+919967869453" className="contact-chip">
              <Phone size={16} />
              +91 99678 69453
            </a>
            <a href="mailto:kaustubhbendre0@gmal.com" className="contact-chip">
              <Mail size={16} />
              kaustubhbendre0@gmal.com
            </a>
          </div>
        </motion.div>

        {/* Right Form */}
        <motion.div
          className="appt-form-wrap"
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {demoMode && !success && (
            <div className="demo-warning">
              <strong>Local mode:</strong> Your booking is being saved on this device for now. Connect Supabase later to sync it online and use the admin dashboard fully.
            </div>
          )}
          {success ? (
            <div className="success-state">
              <div className="success-icon"><CheckCircle2 size={36} /></div>
              <h3>Appointment Requested!</h3>
              <p>Thank you! We'll call you within 2 hours to confirm your appointment.</p>
              <button className="btn-primary" onClick={() => setSuccess(false)}>
                Book Another
              </button>
            </div>
          ) : (
            <form className="appt-form" onSubmit={onSubmit}>
              <h3 className="form-title">
                <CalendarCheck size={22} color="var(--teal)" />
                Request an Appointment
              </h3>

              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    className={errors.name ? 'error' : ''}
                    value={formData.name}
                    onChange={handleFieldChange}
                  />
                  {errors.name && <span className="form-error">{errors.name.message}</span>}
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    className={errors.phone ? 'error' : ''}
                    value={formData.phone}
                    onChange={handleFieldChange}
                  />
                  {errors.phone && <span className="form-error">{errors.phone.message}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com (optional)"
                  className={errors.email ? 'error' : ''}
                  value={formData.email}
                  onChange={handleFieldChange}
                />
                {errors.email && <span className="form-error">{errors.email.message}</span>}
              </div>

              <div className="form-group">
                <label>Service Required *</label>
                <select
                  name="service"
                  className={errors.service ? 'error' : ''}
                  value={formData.service}
                  onChange={handleFieldChange}
                >
                  <option value="">Select a service...</option>
                  {services.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.service && <span className="form-error">{errors.service.message}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Preferred Date *</label>
                  <input
                    type="date"
                    name="date"
                    min={minDate}
                    className={errors.date ? 'error' : ''}
                    value={formData.date}
                    onChange={handleFieldChange}
                  />
                  {errors.date && <span className="form-error">{errors.date.message}</span>}
                </div>
                <div className="form-group">
                  <label>Preferred Time *</label>
                  <select
                    name="time_slot"
                    className={errors.time_slot ? 'error' : ''}
                    value={formData.time_slot}
                    onChange={handleFieldChange}
                  >
                    <option value="">Select time...</option>
                    {timeSlots.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {errors.time_slot && <span className="form-error">{errors.time_slot.message}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Message / Concerns</label>
                <textarea
                  rows={3}
                  name="message"
                  placeholder="Describe your dental concern or any special requirements..."
                  value={formData.message}
                  onChange={handleFieldChange}
                />
              </div>

              <button
                type="submit"
                className="btn-primary submit-btn"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <span className="spinner" /> Booking...
                  </>
                ) : (
                  <>
                    <CalendarCheck size={18} /> Confirm Appointment
                  </>
                )}
              </button>

              <p className="form-note">
                Your information is private and secure. We'll never share it.
              </p>
            </form>
          )}
        </motion.div>
      </div>

      <style>{`
        .appt-section {
          padding: 100px 0;
          position: relative;
          overflow: hidden;
          background: var(--cream);
        }
        .appt-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, var(--ocean-dark) 0%, var(--ocean) 100%);
          z-index: 0;
        }
        .appt-blob {
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,180,216,0.2), transparent);
          top: -200px; right: -200px;
          filter: blur(60px);
        }
        .appt-container {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 60px;
          align-items: start;
          position: relative;
          z-index: 1;
        }
        .appt-info {
          color: var(--white);
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .light-tag {
          color: var(--teal) !important;
        }
        .light-tag::before { background: var(--teal) !important; }
        .appt-title {
          color: var(--white) !important;
          line-height: 1.15;
        }
        .appt-desc {
          color: rgba(255,255,255,0.72);
          font-size: 1rem;
          line-height: 1.7;
        }
        .appt-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .appt-feature {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: rgba(255,255,255,0.07);
          border-radius: var(--radius-md);
          padding: 14px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .feature-icon { font-size: 1.4rem; flex-shrink: 0; }
        .feature-title {
          font-weight: 600;
          font-size: 0.88rem;
          color: var(--white);
          margin-bottom: 2px;
        }
        .feature-desc {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.55);
        }
        .appt-contact-info {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .contact-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,0.8);
          font-size: 0.9rem;
          transition: var(--transition);
        }
        .contact-chip:hover { color: var(--teal); }
        /* Form */
        .appt-form-wrap {
          background: var(--white);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }
        .appt-form {
          padding: 40px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .form-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--ocean-dark);
          margin-bottom: 4px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .submit-btn {
          width: 100%;
          justify-content: center;
          padding: 15px !important;
          font-size: 1rem !important;
          margin-top: 4px;
        }
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.4);
          border-top-color: var(--white);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          display: inline-block;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .form-note {
          text-align: center;
          font-size: 0.78rem;
          color: var(--text-light);
        }
        .success-state {
          padding: 60px 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          text-align: center;
        }
        .success-icon { font-size: 56px; }
        .success-state h3 {
          font-family: var(--font-display);
          font-size: 1.5rem;
          color: var(--ocean-dark);
        }
        .success-state p {
          color: var(--text-mid);
          line-height: 1.6;
        }
        .demo-warning {
          background: rgba(253, 230, 138, 0.2);
          border: 1px solid rgba(245, 158, 11, 0.35);
          color: #92400e;
          padding: 16px 20px;
          border-radius: var(--radius-lg);
          margin: 0 24px 0 24px;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .demo-warning strong {
          color: #78350f;
        }
        @media (max-width: 900px) {
          .appt-container { grid-template-columns: 1fr; }
          .appt-info { display: none; }
          .appt-form-wrap { border-radius: var(--radius-lg); }
        }
        @media (max-width: 560px) {
          .form-row { grid-template-columns: 1fr; }
          .appt-form { padding: 24px; }
          .appt-features { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
