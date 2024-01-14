import { IsString, Length, Matches } from 'class-validator';

export class WalletPostDto {
  @IsString({
    message: 'wallet must be a string',
  })
  @Length(3, 254, {
    message: 'wallet length must be between 3 and 254 characters',
  })
  @Matches(/^[A-Za-z0-9-@.]+$/, {
    message: 'wallet can only contain numbers, letters, and the - . @ symbols',
  })
  wallet: string;
}
