import { Account } from './account.model';

export class Journal
{

    $key: string;
    debitAccount: Account;
    creditAccount: Account;
    transactionAmount: number;    
    transactionDate: string;

    constructor(object?: {$key, debitAccount, creditAccount, transactionAmount, transactionDate})
    {
        this.$key = object ? object.$key : '';
        this.debitAccount = object ? new Account({ $key: object.debitAccount, name: '' }) : new Account({ $key: '', name: '' });
        this.creditAccount = object ? new Account({ $key: object.creditAccount, name: '' }) : new Account({ $key: '', name: '' });
        this.transactionAmount =  object ? object.transactionAmount : 0;
        this.transactionDate = object ? object.transactionDate : '';
    }

}
