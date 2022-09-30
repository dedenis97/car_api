import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entity/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ApproveReportDto } from './dto/approve-report.dto';
import { CreateReportDto } from './dto/create-report.dto';
import { GetEstimateDto } from './dto/get-estimate.dto';
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

        return this.repo.findOneBy({ id })
    }


    estimate(estimateDto: GetEstimateDto) {

        return this.repo.createQueryBuilder()
            .select("AVG(price)", 'price')

            .where('make = :make', { make: estimateDto.make })
            .andWhere('model = :model', { model: estimateDto.model })
            .andWhere('lng - :lng BETWEEN -5 AND 5', { lng: estimateDto.lng })
            .andWhere('lat - :lat BETWEEN -5 AND 5', { lat: estimateDto.lat })
            .andWhere('year - :year BETWEEN -3 AND 3', { lat: estimateDto.lat })

            .orderBy("ABS(mileage - :mileage)", "DESC")
            .setParameters({mileage: estimateDto.mileage})

            .limit(3)
            .getRawOne()

    }
}
