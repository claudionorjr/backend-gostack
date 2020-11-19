import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { uuid } from 'uuidv4';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('time with time zone')
  date: Date;
}

export default Appointment;
