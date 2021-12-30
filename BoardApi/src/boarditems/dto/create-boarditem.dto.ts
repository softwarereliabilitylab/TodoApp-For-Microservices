import { IsString } from 'class-validator';

export class CreateBoarditemDto {
  @IsString()
  name: string;

  @IsString()
  ip: string;

  @IsString()
  comment: string;
}
