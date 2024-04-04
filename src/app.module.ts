import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Announcement } from './db/models/announcement.model';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [DbModule,
  SequelizeModule.forFeature([Announcement]),
  ScheduleModule.forRoot()
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
