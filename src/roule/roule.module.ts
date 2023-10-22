import { Module } from '@nestjs/common';
import { RouleService } from './roule.service';
import { RouleController } from './roule.controller';
import { PrismaService } from 'src/prisma';

@Module({
  controllers: [RouleController],
  providers: [RouleService, PrismaService],
  exports: [
    RouleService
  ]
})
export class RouleModule {}
