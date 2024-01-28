import {
  IsInt,
  IsString,
  IsOptional,
  Min,
  Max,
  IsISO8601,
  IsEnum,
} from 'class-validator';
import { Order, SortBy } from '../../common/types/types';

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

  @IsEnum(['created_at', 'name'])
  sort_by: SortBy = 'created_at';

  @IsEnum(['asc', 'desc'])
  order: Order = 'desc';

  @IsOptional()
  @IsISO8601()
  created_at_start_date: string;

  @IsOptional()
  @IsISO8601()
  created_at_end_date: string;
}

export class WalletIdDto {
  @IsString()
  wallet_id: string;
}
