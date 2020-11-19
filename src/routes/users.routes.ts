import { Router } from 'express';
import UsersService from '../entities/Users/Users.service';

const route = Router();

route.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUser = new UsersService();
    const user = await createUser.createUser({
      name,
      email,
      password,
    });

    delete user.password;

    return response.status(201).json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default route;
