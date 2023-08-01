import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateUserdDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
