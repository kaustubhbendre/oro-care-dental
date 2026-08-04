// src/pages/Home.jsx
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Reviews from '../components/Reviews';
import AppointmentForm from '../components/AppointmentForm';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Services />
        <About />
        <Reviews />
        <AppointmentForm />
        <Contact />
      </main>
    </>
  );
}
