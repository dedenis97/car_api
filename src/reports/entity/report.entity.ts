import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ReportEntity{
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    price: number;

    @Column()
    make: string
    // honda, toyota

    @Column()
    model: string

    @Column()
    year: number

    @Column()
    lng: number

    @Column()
    lat: number

    @Column()
    mileage: number
}