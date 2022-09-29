import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportEntity } from './entity/report.entity';

@Injectable()
export class ReportsService {

    constructor(@InjectRepository(ReportEntity) private reportRepo: Repository<ReportEntity>) {}

    create(dto: CreateReportDto, user: UserEntity) {

        const report = this.reportRepo.create(dto)
        report.user = user;
        return this.reportRepo.save(report)
    }

    findAll() {
        return this.reportRepo.find()
    }

}
