import { startOfHour } from 'date-fns';
import Appointment from './Appointments.model';
import AppointmentsRepository from './Appointments.repository';

interface Request {
  provider: string;
  date: Date;
}

class AppointmentsService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public createAppointment({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default AppointmentsService;
