import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../entities/Appointments/Appointments.repository';
import AppointmentsService from '../entities/Appointments/Appointments.service';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.findAll();
  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);
    const appointmentsService = new AppointmentsService(appointmentsRepository);
    const appointment = appointmentsService.createAppointment({
      provider,
      date: parsedDate,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
