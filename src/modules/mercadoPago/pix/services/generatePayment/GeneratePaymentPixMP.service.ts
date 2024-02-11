import { Injectable } from '@nestjs/common';
import MercadoPagoProvider from 'src/shared/MercadoPago/provider';
import { GeneratePaymentPixDTO } from './dto/GeneratePaymentPixDTO';

@Injectable()
export class GeneratePaymentPixServiceMP {
  constructor(private service: MercadoPagoProvider) {}

  async execute(data: GeneratePaymentPixDTO) {
    const valueTotal = data.items.reduce((total, item) => {
      return total + item.quantity * item.unit_price;
    }, 0);

    if (valueTotal != data.transaction_amount) {
      throw new Error('Valor total incorreto');
    }

    const newPix = await this.service.createPayment({
      description: data.description,
      transaction_amount: data.transaction_amount,
      payer: data.payer,
      items: data.items,
    });

    return newPix;
  }
}
