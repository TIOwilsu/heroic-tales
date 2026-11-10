import { Injectable } from "@nestjs/common";
import type { AccountRecordDTO } from "../../domain/dtos/account-record.dto";
import type { IAccountStoreService } from "../../domain/interfaces/account-store-service.interface";

@Injectable()
export class AccountStoreService implements IAccountStoreService {
  private readonly _records = new Map<string, AccountRecordDTO>();

  public async findByEmail(email: string): Promise<AccountRecordDTO | undefined> {
    return [...this._records.values()].find((record) => record.email === email);
  }

  public async findById(id: string): Promise<AccountRecordDTO | undefined> {
    return this._records.get(id);
  }

  public async create(account: AccountRecordDTO): Promise<void> {
    this._records.set(account.id, account);
  }
}
