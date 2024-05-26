import { IsDateString, IsIn } from 'class-validator';

export class CreateProfileDTO {
  display_name: string;

  @IsIn(['Male', 'Female'])
  gender: string;

  @IsDateString()
  birthday: string;

  horoscope?: string;

  zodiac?: string;

  height: number;

  heightInCentimeter: string;

  heightInFeet: string;

  weight: number;

  weightInKilograms: string;
}
