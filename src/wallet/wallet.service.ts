import { Injectable } from '@nestjs/common';
import { Session } from './path/to/Session';
import { Wallet } from './path/to/Wallet';
import { Token } from './path/to/Token';
import { v4 as uuidValidate } from 'uuid';
import { WalletIdDto } from './dto/wallet-get.dto';

@Injectable()
export class WalletService {
  private readonly _session: Session;
  private readonly _wallet: Wallet;

  constructor() {
    this._session = new Session();
    this._wallet = new Wallet(this._session);
  }

  async getSubWallets(id: string) {
    return this._wallet.getSubWallets(id);
  }

  async getById(id: string) {
    return this._wallet.getById(id);
  }

  async getByName(name: string) {
    return this._wallet.getByName(name);
  }

  async getWallet(walletId: string) {
    return this._wallet.getWallet(walletId);
  }

  async getByIdOrName(idOrName: string) {
    let wallet;
    if (uuidValidate(idOrName)) {
      wallet = await this.getById(idOrName);
    } else {
      wallet = await this.getByName(idOrName);
    }
    return wallet;
  }

  async createWallet(loggedInWalletId: string, wallet: any) {
    try {
      await this._session.beginTransaction();

      const addedWallet = await this._wallet.createWallet(
        loggedInWalletId,
        wallet,
      );

      await this._session.commitTransaction();

      return { wallet: addedWallet.name, id: addedWallet.id };
    } catch (e) {
      if (this._session.isTransactionInProgress()) {
        await this._session.rollbackTransaction();
      }
      throw e;
    }
  }

  // TODO: use DTO or create interface
  async getAllWallets(
    id: WalletIdDto,
    limitOptions: any,
    name: string,
    getTokenCount = true,
    getWalletCount = true,
  ) {
    if (getTokenCount) {
      const token = new Token(this._session);
      const { wallets, count } = await this._wallet.getAllWallets(
        id,
        limitOptions,
        name,
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
    return this._wallet.getAllWallets(id, limitOptions, name, getWalletCount);
  }

  async hasControlOver(parentId: string, childId: string) {
    return this._wallet.hasControlOver(parentId, childId);
  }
}
