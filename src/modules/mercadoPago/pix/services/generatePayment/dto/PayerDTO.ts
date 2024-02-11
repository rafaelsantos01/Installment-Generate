import { IsEmail, IsNotEmpty } from 'class-validator';

export class PayerDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  constructor(email: string, name: string) {
    this.email = email;
    this.name = name;
  }
}
