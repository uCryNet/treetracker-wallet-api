import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { WalletGetQueryDto, WalletIdDto } from './dto/wallet-get.dto';
import { WalletService } from './wallet.service';
import { WalletPostDto } from './dto/wallet-post.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  async walletGet(
    @Query() walletDto: WalletGetQueryDto,
    @Body('wallet_id') wallet_id: WalletIdDto,
  ) {
    /** Контролер готовий */
    // TODO: перевірити
    const {
      name,
      limit,
      offset,
      sort_by,
      order,
      created_at_start_date,
      created_at_end_date,
    } = walletDto;

    return this.walletService.getAllWallets(
      wallet_id,
      {
        limit,
        offset,
      },
      name,
      sort_by,
      order,
      created_at_start_date,
      created_at_end_date,
    );

    /** оригінал респонсу: */
    //     res.status(200).json({
    //     total: count,
    //     query: { ...validatedQuery, limit, offset },
    //     wallets,
    //   });
  }

  // @Post('/:wallet_id')
  // async walletPost(@Req() req, @Res() res: Response, @Body() walletDto) {
  //   console.log(`===`)
  //   console.log(req.wallet_id)
  //   console.log(walletDto)
  //   console.log(`===`)
  //
  //   return {
  //     'ol': 'ok'
  //   }
  // }

  @Get(':wallet_id')
  async walletSingleGet(@Param('wallet_id') walletId: WalletIdDto) {
    return this.walletService.getWallet(walletId);

    /** оригінал респонсу: */
    // res.status(200).send(wallet);
  }
}
