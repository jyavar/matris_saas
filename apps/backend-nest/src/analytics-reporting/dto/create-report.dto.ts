import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsObject()
  data: Record<string, unknown>;
}
