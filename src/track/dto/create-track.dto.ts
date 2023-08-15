import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  artistId: string | null;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  albumId: string | null;

  @IsNotEmpty()
  @IsInt()
  duration: number;
}
