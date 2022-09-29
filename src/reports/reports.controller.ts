import { Body, Controller, Get, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entity/user.entity';
import { AuthGuard } from 'src/users/guard/auth.guard';
import { ApproveReportDto } from './dto/approve-report.dto';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportDto } from './dto/report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {

    constructor(private reportService: ReportsService) { }

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: UserEntity) {
        return this.reportService.create(body, user)
    }

    @Get()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    getAllReports() {
        return this.reportService.findAll()
    }

    @Patch("/:id")
    @UseGuards(AuthGuard)
    async approveReport(@Param("id") id: string, @Body() body: ApproveReportDto, @CurrentUser() user: UserEntity) {
        const report = await this.reportService.findOne(parseInt(id))

        if (!report) {
            throw new NotFoundException("report id " + id + " not found")
        }

        report.approved = body.approved

        return this.reportService.update(report, user)

    }


}
