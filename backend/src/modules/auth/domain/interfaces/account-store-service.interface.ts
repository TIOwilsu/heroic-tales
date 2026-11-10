import type { AccountRecordDTO } from "../dtos/account-record.dto";

export interface IAccountStoreService {
  findByEmail(email: string): Promise<AccountRecordDTO | undefined>;
  findById(id: string): Promise<AccountRecordDTO | undefined>;
  create(account: AccountRecordDTO): Promise<void>;
}
