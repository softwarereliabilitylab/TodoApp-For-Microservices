import { IsDate, IsNumber, IsString } from 'class-validator';

export class UpdateBoarditemDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  ip: string;

  @IsString()
  comment: string;
}
