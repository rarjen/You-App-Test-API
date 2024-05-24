import { IsDateString, IsIn } from 'class-validator';

export class UpdateProfileDTO {
  display_name: string;

  @IsIn(['Male', 'Female'])
  gender: string;

  @IsDateString()
  birthday: string;

  height: number;

  heightInCentimeter: string;

  heightInInches: string;

  weight: number;

  weightInKilograms: string;
}
