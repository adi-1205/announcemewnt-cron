import { BadRequestException, Injectable } from '@nestjs/common';
import { Announcement } from './db/models/announcement.model';
import { InjectModel } from '@nestjs/sequelize';
import { Interval } from '@nestjs/schedule';
import * as moment from 'moment';
import { Op } from 'sequelize';
import { AnnouncementDto } from './dto/announcement.dto';
import { UpdateAnnouncementDto } from './dto/update.announcement.dto';

@Injectable()
export class AppService {

  constructor(
    @InjectModel(Announcement) private AnnouncementModel: typeof Announcement
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async createAnnouncement(body: AnnouncementDto) {
    if (moment(body.publishAt).isBefore(moment()))
      throw new BadRequestException('Publish date should not be in past')
    return await this.AnnouncementModel.create({
      title: body.title,
      publish_at: body.publishAt,
      is_published: false,
    })
  }

  async updateAnnouncement(id: string, body: UpdateAnnouncementDto) {
    const announcement = await this.AnnouncementModel.findByPk(id);
    if (!announcement) {
      throw new BadRequestException('Announcement not found');
    }
    if (moment(body.publishAt).isBefore(moment())) {
      throw new BadRequestException('Publish date should not be in the past');
    }
    announcement.title = body.title || announcement.title;
    announcement.publish_at = body.publishAt || announcement.publish_at;
    await announcement.save();
    return announcement;
  }

  async deleteAnnouncement(id: string) {
    const announcement = await this.AnnouncementModel.findByPk(id);
    if (!announcement) {
      throw new BadRequestException('Announcement not found');
    }
    await announcement.destroy();
    return announcement;
  }


  @Interval(1000 * 60 * 5)
  async getInPast() {
    moment().format()
    let announcements = await this.AnnouncementModel.findAll({
      where: {
        publish_at: {
          [Op.lte]: moment().toJSON()
        },
        is_published: false
      }
    })

    for (let an of announcements) {
      console.log(an.title);
      an.is_published = true
      await an.save()
    }

    return announcements
  }
}


// nextTimeGap(gap) {
//   return moment().add(gap, 'm').toJSON()
// }