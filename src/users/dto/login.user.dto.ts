import { IsNotEmpty } from 'class-validator';

export class LoginUserDTO {
  @IsNotEmpty()
  username_or_email: string;

  @IsNotEmpty()
  password: string;
}
