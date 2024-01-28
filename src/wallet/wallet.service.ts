import { Injectable } from '@nestjs/common';
import { WalletIdDto } from './dto/wallet-get.dto';
import { Order, SortBy } from '../common/types/types';
import { Session } from '../infra/database/session';

@Injectable()
export class WalletService {
  constructor(
    //     this._session = new Session();
    //     this._wallet = new Wallet(this._session);
    //     this._event = new Event(this._session);
    private readonly _session: Session,
  ) {}

  async getWallet(walletId: WalletIdDto) {
    return this._wallet.getWallet(walletId);
  }

  // TODO: use DTO or create interface
  async getAllWallets(
    id: WalletIdDto,
    limitOptions: any,
    name: string,
    sort_by: SortBy,
    order: Order,
    created_at_start_date: string,
    created_at_end_date: string,
    getTokenCount = true,
    getWalletCount = true,
  ) {
    if (getTokenCount) {
      const token = new Token(this._session);
      const { wallets, count } = await this._wallet.getAllWallets(
        id,
        limitOptions,
        name,
        sort_by,
        order,
        created_at_start_date,
        created_at_end_date,
        getWalletCount,
      );
      return {
        wallets: await Promise.all(
          wallets.map(async (wallet) => {
            const json = { ...wallet };
            json.tokens_in_wallet = await token.countTokenByWallet(wallet.id);
            return json;
          }),
        ),
        count,
      };
    }
    return this._wallet.getAllWallets(
      id,
      limitOptions,
      name,
      sort_by,
      order,
      created_at_start_date,
      created_at_end_date,
      getWalletCount,
    );
  }
}
