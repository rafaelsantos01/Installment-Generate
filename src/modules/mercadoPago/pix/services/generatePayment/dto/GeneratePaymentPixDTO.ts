import { IsNotEmpty } from 'class-validator';
import { PayerDTO } from './PayerDTO';
import { ItemsDTO } from './ItemsDTO';

export class GeneratePaymentPixDTO {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  transaction_amount: number;

  items: ItemsDTO[];

  payer: PayerDTO;
}
