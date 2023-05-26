import { IsString, MinLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(6)
  username: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsEmail()
  email: string;
}
