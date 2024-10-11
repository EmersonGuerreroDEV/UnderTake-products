import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
// Asegúrate de tener la ruta correcta

@Entity()
export class Size {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string; // Nombre de la talla

}
