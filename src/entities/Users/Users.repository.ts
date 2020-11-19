import { EntityRepository, Repository } from 'typeorm';
import Users from './Users.model';

@EntityRepository(Users)
class UsersRepository extends Repository<Users> {}

export default UsersRepository;
