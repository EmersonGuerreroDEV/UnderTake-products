import { Module } from '@nestjs/common';
import { AppController } from './products.controller';
import { AppService } from './products.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
