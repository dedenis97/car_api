import { Body, Controller, Get, NotFoundException, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { from } from 'rxjs';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { AdminGuard } from 'src/guard/admin.guard';
import { AuthGuard } from 'src/guard/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserEntity } from 'src/users/entity/user.entity';
import { ApproveReportDto } from './dto/approve-report.dto';
import { CreateReportDto } from './dto/create-report.dto';
import { GetEstimateDto } from './dto/get-estimate.dto';
import { ReportDto } from './dto/report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {

    constructor(private reportService: ReportsService) { }

    @Get()
    @UseGuards(AuthGuard)
    getEstimate(@Query() query: GetEstimateDto) {
       return this.reportService.estimate(query)
    }

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: UserEntity) {
        return this.reportService.create(body, user)
    }

    @Patch("/:id")
    @UseGuards(AdminGuard)
    @Serialize(ReportDto)
    async approveReport(@Param("id") id: string, @Body() body: ApproveReportDto, @CurrentUser() user: UserEntity) {

        const report = await this.reportService.findOne(parseInt(id))

        if (!report) {
            throw new NotFoundException("report id " + id + " not found")
        }

        report.approved = body.approved

        return this.reportService.update(report, user)

    }


}
