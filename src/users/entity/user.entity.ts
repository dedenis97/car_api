import { ReportEntity } from "src/reports/entity/report.entity";
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string; 

    @OneToMany(() => ReportEntity, (report) => report.user)
    reports: ReportEntity[];


    // the hook will not executed if at method 'save' in repo
    // this will not be pass, but passed arg like ({email, password})

    // only work with repo.save() and repo.remove()

    // execute fn on each insertion in to db

    @AfterInsert()
    logIn() {
        console.log('Inserted user id: ', this.id);
    }

    @AfterUpdate()
    logUp() {
        console.log('Updated user id: ', this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log('Removed user id: ', this.id);
    }

}
