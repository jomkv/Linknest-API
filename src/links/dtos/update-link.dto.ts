import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateLinkDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsUrl()
  @IsOptional()
  link?: string;

  @IsBoolean()
  @IsOptional()
  isEnabled?: boolean;

  @IsNumber()
  @IsOptional()
  index?: number;
}
