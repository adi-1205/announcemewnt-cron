import { IsDate, IsDateString, IsNotEmpty } from "class-validator";

export class AnnouncementDto{

    @IsNotEmpty()
    title: string

    @IsDateString()
    @IsNotEmpty()
    publishAt: Date

}