import { Account } from './account.model';

export class Journal {

    $key: string;
    debitAccount: Account;
    creditAccount: Account;
    transactionAmount: number;    
    transactionDate: string;

    constructor({$key, debitAccount, creditAccount, transactionAmount, transactionDate}) {
        this.$key = $key;
        this.debitAccount = debitAccount;
        this.creditAccount = creditAccount;        
        this.transactionAmount = transactionAmount;
        this.transactionDate = transactionDate;
    }

}
