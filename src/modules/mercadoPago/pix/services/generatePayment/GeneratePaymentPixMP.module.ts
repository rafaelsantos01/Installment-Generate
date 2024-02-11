import { Module } from '@nestjs/common';
import { GeneratePaymentPixServiceMP } from './GeneratePaymentPixMP.service';
import { GeneratePaymentPixMPController } from './GeneratePaymentPixMP.controller';
import MercadoPagoProvider from 'src/shared/MercadoPago/provider';

@Module({
  imports: [],
  controllers: [GeneratePaymentPixMPController],
  providers: [GeneratePaymentPixServiceMP, MercadoPagoProvider],
})
export class GeneratePaymentPixMP {}
