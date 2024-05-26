// test/conversion-helper.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { ConversionHelper } from '../src/helpers/conversion.helpers';

describe('ConversionHelper', () => {
  let conversionHelper: ConversionHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConversionHelper],
    }).compile();

    conversionHelper = module.get<ConversionHelper>(ConversionHelper);
  });

  it('should be defined', () => {
    expect(conversionHelper).toBeDefined();
  });

  it('should convert cm to feet correctly', () => {
    const cm = 160;
    const result = conversionHelper.convertCmToFeet(cm);
    expect(result).toBe('5');
  });

  it('should return "0" for zero input', () => {
    const cm = 0;
    const result = conversionHelper.convertCmToFeet(cm);
    expect(result).toBe('0');
  });

  it('should handle fractional values', () => {
    const cm = 30.48; // exactly 1 foot
    const result = conversionHelper.convertCmToFeet(cm);
    expect(result).toBe('1');
  });
});
