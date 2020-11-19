import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../entities/Appointments/Appointments.repository';
import AppointmentsService from '../entities/Appointments/Appointments.service';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const route = Router();

route.use(ensureAuthenticated);

route.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});

route.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);
    const appointmentsService = new AppointmentsService();
    const appointment = await appointmentsService.createAppointment({
      provider_id,
      date: parsedDate,
    });

    return response.status(200).json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default route;
