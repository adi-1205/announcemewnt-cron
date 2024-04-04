import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { AnnouncementDto } from './dto/announcement.dto';
import { UpdateAnnouncementDto } from './dto/update.announcement.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getInPast() {
    return await this.appService.getInPast();
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  async createAnnouncement(@Body() body: AnnouncementDto) {
    return await this.appService.createAnnouncement(body)
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async updateAnnouncement(@Param('id') id: string, @Body() body: UpdateAnnouncementDto) {
    try {
      return await this.appService.updateAnnouncement(id, body);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Delete(':id')
  async deleteAnnouncement(@Param('id') id: string) {
    try {
      return await this.appService.deleteAnnouncement(id);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
}
