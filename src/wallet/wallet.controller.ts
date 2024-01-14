import { Body, Controller, Get, Query, Req } from '@nestjs/common';
import { WalletGetQueryDto, WalletIdDto } from './dto/wallet-get.dto';
import { WalletService } from './wallet.service';
import { WalletPostDto } from './dto/wallet-post.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  async walletGet(
    @Query() query: WalletGetQueryDto,
    @Body('wallet_id') wallet_id: WalletIdDto,
  ) {
    const { name, limit, offset } = query;
    console.log(wallet_id);
    return this.walletService.getAllWallets(
      wallet_id,
      {
        limit,
        offset,
      },
      name,
    );

    //     res.status(200).json({
    //     total: count,
    //     query: { ...validatedQuery, limit, offset },
    //     wallets,
    //   });
  }

  async walletPost(@Body() body: WalletPostDto, @Req() request: WalletIdDto) {
    return this.walletService.createWallet(request.wallet_id, body);

    //     res.status(201).json({
    //     id,
    //     wallet,
    //   });
  }

  async walletSingleGet() {}
}
