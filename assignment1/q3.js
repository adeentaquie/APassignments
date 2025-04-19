function createBankAccount(initialDeposit) {
    const bankAccount = {
        balance: initialDeposit, 
        history: [], 
        
        deposit(amount) {
            this.balance += amount;
            this.history.push({ type: "Deposit", amount });
            console.log(`Deposited: ${amount}. New Balance: ${this.balance}`);
        },

        withdraw(amount) {
            let totalDeduction = amount + 5; 
            if (totalDeduction > this.balance) {
                console.log("Error: Insufficient balance.");
                return;
            }
            this.balance -= totalDeduction;
            this.history.push({ type: "Withdraw", amount: amount, fee: 5 });
            console.log(`Withdrew: ${amount} (Fee: 5). New Balance: ${this.balance}`);
        },

        getBalance() {
            return this.balance;
        },

        getHistory() {
            return this.history;
        },

        resetAccount() {
            this.balance = initialDeposit;
            this.history = [];
            console.log("Account reset to initial deposit.");
        },

        getAccountSummary: () => {
            //This won't work as expected because this in an arrow function refers to the outer lexical scope
            return `Current Balance: ${this.balance}, Transactions: ${this.history.length}`;
        },

        getAccountSummaryFixed() {
            return `Current Balance: ${this.balance}, Transactions: ${this.history.length}`;
        }
    };

    return bankAccount;
}

const myAccount = createBankAccount(90); 

myAccount.deposit(80);
myAccount.withdraw(20);
console.log("Balance:", myAccount.getBalance());
console.log("Transaction History:", myAccount.getHistory());

// console.log(myAccount.getAccountSummary()); 
console.log(myAccount.getAccountSummaryFixed()); 

myAccount.resetAccount();
console.log("Balance after reset:", myAccount.getBalance());
console.log("History after reset:", myAccount.getHistory());
