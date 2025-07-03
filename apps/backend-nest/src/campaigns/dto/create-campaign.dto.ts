import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Campaign name must be at least 3 characters long' })
  name: string;
}
