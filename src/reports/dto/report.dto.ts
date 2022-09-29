import { Expose, Transform } from "class-transformer";

// ReportResponseDto
export class ReportDto {

    @Expose()
    id: number;

    @Expose()
    make: string;

    @Expose()
    model: string;

    @Expose()
    year: number;

    @Expose()
    mileage: number;

    @Expose()
    lng: number;

    @Expose()
    lat: number;

    @Expose()
    price: number;

    @Expose()
    approved: boolean;

    // obj is equal to original report entity
    @Transform(({ obj }) =>  obj.user.id )
    @Expose()
    userId: number;

}