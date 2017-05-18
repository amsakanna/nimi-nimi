import { Account } from './account.model';

export class Journal {

    $key: string;
    debitAccount: Account;
    creditAccount: Account;
    transactionAmount: number;    
    transactionDate: '';

    constructor({$key, debitAccount, creditAccount, transactionAmount, transactionDate}) {
        this.$key = $key;
        this.debitAccount = debitAccount;
        this.creditAccount = creditAccount;        
        this.transactionAmount = transactionAmount;
        this.transactionDate = transactionDate;
    }

}
