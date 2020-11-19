import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from './Appointments.model';
import AppointmentsRepository from './Appointments.repository';

interface Request {
  provider_id: string;
  date: Date;
}

class AppointmentsService {
  private appointmentsRepository: AppointmentsRepository;

  constructor() {
    this.appointmentsRepository = getCustomRepository(AppointmentsRepository);
  }

  public async createAppointment({
    provider_id,
    date,
  }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await this.appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsService;
