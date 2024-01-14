import {
  IsInt,
  IsString,
  IsOptional,
  Min,
  Max,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class WalletGetQueryDto {
  @IsInt({ message: 'limit can only be non-negative integer' })
  @Min(1, { message: 'limit can only be non-negative integer' })
  @Max(2000)
  limit: number = 1000;

  @IsInt({ message: 'offset can only be non-negative integer' })
  @Min(0, { message: 'offset can only be non-negative integer' })
  offset: number = 0;

  @IsString()
  @IsOptional()
  name?: string;
}

export class WalletIdDto {
  @IsString()
  wallet_id: string;
}

export class CombinedWalletDto {
  @ValidateNested()
  @Type(() => WalletGetQueryDto)
  query: WalletGetQueryDto;

  @ValidateNested()
  @Type(() => WalletIdDto)
  id: WalletIdDto;
}
