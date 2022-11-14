import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
class UsersEntity {
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column()
  public coin: number;
}
 
export default UsersEntity;