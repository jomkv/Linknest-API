import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateLinkDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  link: string;

  @IsBoolean()
  @IsOptional()
  isEnabled?: boolean;
}
