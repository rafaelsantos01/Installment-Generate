import { Injectable } from '@nestjs/common';
import MercadoPagoProvider from 'src/shared/MercadoPago/provider';

@Injectable()
export class GeneratePaymentPixServiceMP {
  constructor(private service: MercadoPagoProvider) {}

  async execute() {
    const teste = await this.service.createPayment({
      description: 'teste',
      transaction_amount: 100,
      payer: {
        name: 'teste',
        email: 'rafael@rafael.com',
      },
      items: {
        id: '1',
        title: 'teste',
        description: 'teste',
        picture_url: 'teste',
        category_id: 'teste',
        quantity: 1,
        unit_price: 100,
      },
    });
    return teste;
  }
}
