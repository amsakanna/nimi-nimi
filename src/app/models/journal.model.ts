import { Account } from './account.model';

export class Journal
{

    $key: string;
    debitAccount: Account;
    creditAccount: Account;
    transactionAmount: number;    
    transactionDate: string;

    constructor({$key, debitAccount, creditAccount, transactionAmount, transactionDate})
    {
        this.$key = $key;
        this.debitAccount = new Account({ $key: debitAccount, name: '' });
        this.creditAccount = new Account({ $key: creditAccount, name: '' });
        this.transactionAmount = transactionAmount;
        this.transactionDate = transactionDate;
    }

}
