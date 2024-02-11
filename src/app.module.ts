import { Module } from '@nestjs/common';
import { GeneratePaymentPixMP } from './modules/mercadoPago/pix/services/generatePayment/GeneratePaymentPixMP.module';
import { ConfigModule } from '@nestjs/config';

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
  providers: [],
})
export class AppModule {}
