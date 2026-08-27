'use client';

import styles from './appointment_section_ds.module.css';

function AppointmentSectionDS() {
  return (
    <section
      id="agendamento"
      className={styles.sectionAppointment}
      aria-labelledby="appointment-title"
    >
      <div className="container">
        <div className="mb-5 text-center">
          <h2
            id="appointment-title"
            className={`${styles.sectionTitle} fw-bold`}
          >
            Agende uma conversa
          </h2>
          <p className={`${styles.sectionSubtitle} lead`}>
            Escolha o melhor horário para falar com nossos especialistas.
          </p>
        </div>

        <div className={styles.scheduleCard}>
          <iframe
            title="Agendamento de reunião com a DevSolar"
            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0YzIy-55fksudBHfr6xjkWQ8AX9nEP7Sb6PFZPeDvuklWgS8vmh9SpHylse3zzIODKVR-MoMr9?gv=true"
            style={{ border: 0 }}
            width="100%"
            height="600"
            frameBorder="0"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

export default AppointmentSectionDS;

// "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0YzIy-55fksudBHfr6xjkWQ8AX9nEP7Sb6PFZPeDvuklWgS8vmh9SpHylse3zzIODKVR-MoMr9?gv=true" style="border: 0" width="100%" height="600" frameborder="0"
// AcZssZ3PUeqfxkAaA-tuis9nLP86LerSe8FrBxXbZXFXwp3bFWPG5dlZY7pUidlUg6iXU87cnNtAKQM8?gv=true
