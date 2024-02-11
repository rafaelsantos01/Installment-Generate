import { Module } from '@nestjs/common';
import { GeneratePaymentPixMP } from './modules/mercadoPago/pix/services/generatePayment/GeneratePaymentPixMP.module';
import { ConfigModule } from '@nestjs/config';
import { GlobalExceptionFilter } from './errors/implementations/ErrorHandle';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      ignoreEnvFile: false,
    }),
    GeneratePaymentPixMP,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
