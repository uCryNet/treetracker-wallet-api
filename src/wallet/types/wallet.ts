export interface IWalletController {
  id: string;
  limitOptions: {
    limit: number;
    offset: number;
  };
  getTokenCount: any; // TODO: fix
  getWalletCount: any; // TODO fix
}
