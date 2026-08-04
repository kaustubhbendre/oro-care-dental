export function scrollToSection(id) {
  const target = document.getElementById(id);

  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function scrollToAppointment() {
  scrollToSection('appointment');
}
