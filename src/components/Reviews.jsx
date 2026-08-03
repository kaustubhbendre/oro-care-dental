// src/components/Reviews.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote, Search } from 'lucide-react';

const reviews = [
  {
    name: 'Priya Sharma',
    initials: 'PS',
    color: '#0a4a6e',
    rating: 5,
    text: 'They created a treatment plan just for me. The personal care really stood out, and I’m so happy with the results.',
    service: 'Teeth Whitening',
    date: '2 weeks ago',
  },
  {
    name: 'Rahul Mehta',
    initials: 'RM',
    color: '#00b4d8',
    rating: 5,
    text: 'Dr. Shashank is kind and easy to talk to. The clinic is clean, calming, and I felt comfortable the whole time.',
    service: 'Root Canal',
    date: '1 month ago',
  },
  {
    name: 'Anjali Gupta',
    initials: 'AG',
    color: '#c9a84c',
    rating: 5,
    text: 'I felt calm from the start, and my implant looks so natural. I love my new smile.',
    service: 'Dental Implant',
    date: '3 weeks ago',
  },
  {
    name: 'Vikram Nair',
    initials: 'VN',
    color: '#2d6a4f',
    rating: 5,
    text: 'I was nervous about the visit, but the team made everything painless and so supportive. They really took great care of me.',
    service: 'Check-up & Cleaning',
    date: '1 month ago',
  },
  {
    name: 'Deepika Joshi',
    initials: 'DJ',
    color: '#7b2d8b',
    rating: 5,
    text: 'My veneers look incredible. Dr. Kumar has a gentle, artistic touch and listened to exactly what I wanted.',
    service: 'Veneers',
    date: '2 months ago',
  },
  {
    name: 'Arun Patel',
    initials: 'AP',
    color: '#c0392b',
    rating: 5,
    text: 'I brought my whole family here and everyone felt comfortable. The kids even smiled after their appointments.',
    service: 'Family Check-up',
    date: '3 months ago',
  },
];

export default function Reviews() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="reviews" className="reviews-section">
      <div className="container">
        <div className="section-header" ref={ref}>
          <motion.span
            className="section-tag"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
          >
            Patient Stories
          </motion.span>
          <motion.h2
            className="heading-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            What Our Patients Say
          </motion.h2>

          {/* Overall rating */}
          <motion.div
            className="overall-rating"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <div className="rating-big">
              <span className="rating-num">5.0</span>
              <div className="rating-stars-big">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="#c9a84c" color="#c9a84c" />
                ))}
              </div>
              <span className="rating-count">Based on 140 Google Reviews</span>
            </div>
          </motion.div>
        </div>

        <div className="reviews-grid">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              className="review-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(10,74,110,0.12)' }}
            >
              <div className="review-header">
                <div className="review-avatar" style={{ background: review.color }}>
                  {review.initials}
                </div>
                <div>
                  <p className="review-name">{review.name}</p>
                  <p className="review-service">{review.service} · {review.date}</p>
                </div>
                <div className="review-quote-icon">
                  <Quote size={20} color="var(--teal)" opacity={0.4} />
                </div>
              </div>
              <div className="review-stars">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="#c9a84c" color="#c9a84c" />
                ))}
              </div>
              <p className="review-text">"{review.text}"</p>
            </motion.div>
          ))}
        </div>

        {/* Google CTA */}
        <motion.div
          className="google-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p>Love our clinic? Share your experience!</p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline google-btn"
          >
            <Search size={16} /> Leave a Google Review
          </a>
        </motion.div>
      </div>

      <style>{`
        .reviews-section {
          padding: 100px 0;
          background: var(--white);
          position: relative;
        }
        .section-header {
          text-align: center;
          margin-bottom: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .overall-rating {
          display: flex;
          justify-content: center;
        }
        .rating-big {
          display: flex;
          align-items: center;
          gap: 16px;
          background: linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.04));
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: var(--radius-full);
          padding: 12px 28px;
        }
        .rating-num {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 700;
          color: var(--ocean-dark);
        }
        .rating-stars-big {
          display: flex;
          gap: 3px;
        }
        .rating-count {
          font-size: 0.85rem;
          color: var(--text-mid);
          font-weight: 500;
        }
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 48px;
        }
        .review-card {
          background: var(--cream);
          border: 1px solid rgba(10,74,110,0.07);
          border-radius: var(--radius-lg);
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: all 0.3s ease;
          cursor: default;
        }
        .review-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .review-avatar {
          width: 44px; height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white);
          font-weight: 700;
          font-size: 0.95rem;
          flex-shrink: 0;
        }
        .review-name {
          font-weight: 600;
          font-size: 0.92rem;
          color: var(--text-dark);
        }
        .review-service {
          font-size: 0.78rem;
          color: var(--text-light);
        }
        .review-quote-icon {
          margin-left: auto;
        }
        .review-stars {
          display: flex;
          gap: 2px;
        }
        .review-text {
          font-size: 0.9rem;
          color: var(--text-mid);
          line-height: 1.65;
          font-family: var(--font-accent);
          font-style: italic;
        }
        .google-cta {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .google-cta p {
          color: var(--text-mid);
          font-size: 1rem;
        }
        .google-btn {
          gap: 8px;
        }
        @media (max-width: 900px) {
          .reviews-grid { grid-template-columns: repeat(2, 1fr); }
          .rating-big { flex-wrap: wrap; justify-content: center; }
        }
        @media (max-width: 560px) {
          .reviews-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
