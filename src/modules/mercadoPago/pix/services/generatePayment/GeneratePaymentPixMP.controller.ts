import { Controller, Post } from '@nestjs/common';
import { GeneratePaymentPixServiceMP } from './GeneratePaymentPixMP.service';

@Controller()
export class GeneratePaymentPixMPController {
  constructor(private service: GeneratePaymentPixServiceMP) {}

  @Post('api/v1/mercado-pago/pix/generate-payment')
  async execute() {
    const retorno = this.service.execute();
    return retorno;
  }
}
