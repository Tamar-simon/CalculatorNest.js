import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalcModule } from './calc/calc.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [CalcModule],
})
export class AppModule {}
