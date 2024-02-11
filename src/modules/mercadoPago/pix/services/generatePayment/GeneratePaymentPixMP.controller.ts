import { Body, Controller, Post } from '@nestjs/common';
import { GeneratePaymentPixServiceMP } from './GeneratePaymentPixMP.service';
import { GeneratePaymentPixDTO } from './dto/GeneratePaymentPixDTO';

@Controller()
export class GeneratePaymentPixMPController {
  constructor(private service: GeneratePaymentPixServiceMP) {}

  @Post('api/v1/mercado-pago/pix/generate-payment')
  async execute(@Body() data: GeneratePaymentPixDTO) {
    const retorno = this.service.execute(data);
    return retorno;
  }
}
