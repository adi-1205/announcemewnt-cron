import { IsDateString, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateAnnouncementDto {

    @IsOptional()
    @IsNotEmpty()
    title: string
    
    @IsOptional()
    @IsDateString()
    @IsNotEmpty()
    publishAt: Date

}