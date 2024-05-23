import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  confirm_password: string;
}
