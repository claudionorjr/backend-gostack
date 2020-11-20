import { request, response, Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import UsersService from '../entities/Users/Users.service';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const route = Router();
const upload = multer(uploadConfig);

route.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const createUser = new UsersService();
  const user = await createUser.createUser({
    name,
    email,
    password,
  });

  delete user.password;

  return response.status(201).json(user);
});

route.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UsersService();
    const user = await updateUserAvatar.updateAvatar({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.status(200).json(user);
  },
);

export default route;
