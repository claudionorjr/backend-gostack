import { Router } from 'express';
import AuthenticateUserService from '../entities/Users/AuthenticateUser.service';

const route = Router();

route.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  delete user.password;

  return response.status(200).json({ user, token });
});

export default route;
