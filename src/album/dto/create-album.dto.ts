import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  year: number;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  artistId: string | null;
}
