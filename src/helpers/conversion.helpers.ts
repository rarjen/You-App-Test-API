import { Injectable } from '@nestjs/common';

@Injectable()
export class ConversionHelper {
  convertCmToFeet(cm: number): string {
    const inches = cm * 0.393701;
    const result = Math.floor(inches / 12);
    return result.toString();
  }
}
