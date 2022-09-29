import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';
import { ApproveReportDto } from './dto/approve-report.dto';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportEntity } from './entity/report.entity';

@Injectable()
export class ReportsService {

    constructor(@InjectRepository(ReportEntity) private repo: Repository<ReportEntity>) { }

    create(dto: CreateReportDto, user: UserEntity) {

        const report = this.repo.create(dto)
        report.user = user;
        return this.repo.save(report)
    }

    update(report: ReportEntity, user: UserEntity) {
        report.user = user;
        return this.repo.save(report)
    }
    
    findAll() {
        return this.repo.find()
    }

    findOne(id: number) {
        if (id == null) {
            return null
        }

        return this.repo.findOneBy({id})
    }

    changeApproval(id: number, approved: boolean, user: UserEntity){

    }

}
