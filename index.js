#! /usr/bin/env node
import inquirer from 'inquirer';
class ATM {
    account = null;
    accounts = [
        { accountNumber: '12345', pin: '1234', balance: 100000 },
    ];
    async start() {
        console.log("Welcome to the ATM!");
        await this.login();
        if (this.account) {
            while (true) {
                const { action } = await inquirer.prompt({
                    type: 'list',
                    name: 'action',
                    message: 'What would you like to do?',
                    choices: ['Check Balance', 'Deposit', 'Withdraw', 'Fast Cash', 'Exit']
                });
                switch (action) {
                    case 'Check Balance':
                        this.checkBalance();
                        break;
                    case 'Deposit':
                        await this.deposit();
                        break;
                    case 'Withdraw':
                        await this.withdraw();
                        break;
                    case 'Fast Cash':
                        await this.fastCash();
                        break;
                    case 'Exit':
                        console.log('Thank you for using the ATM. Goodbye!');
                        return;
                }
            }
        }
    }
    async login() {
        const { accountNumber } = await inquirer.prompt({
            type: 'input',
            name: 'accountNumber',
            message: 'Enter your account number (hint:12345):'
        });
        const { pin } = await inquirer.prompt({
            type: 'password',
            name: 'pin',
            message: 'Enter your PIN (hint:1234):'
        });
        const account = this.accounts.find(acc => acc.accountNumber === accountNumber && acc.pin === pin);
        if (account) {
            console.log('Login successful.');
            this.account = account;
        }
        else {
            console.log('Invalid account number or PIN. Please try again.');
            await this.login();
        }
    }
    checkBalance() {
        console.log(`Your current balance is $${this.account.balance}`);
    }
    async deposit() {
        const { amount } = await inquirer.prompt({
            type: 'number',
            name: 'amount',
            message: 'Enter the amount you want to deposit:'
        });
        if (amount > 0) {
            this.account.balance += amount;
            console.log(`$${amount} deposited successfully.`);
        }
        else {
            console.log('Invalid amount. Please enter a positive number.');
        }
    }
    async withdraw() {
        const { amount } = await inquirer.prompt({
            type: 'number',
            name: 'amount',
            message: 'Enter the amount you want to withdraw:'
        });
        if (amount > 0 && amount <= this.account.balance) {
            this.account.balance -= amount;
            console.log(`$${amount} withdrawn successfully.`);
        }
        else if (amount > this.account.balance) {
            console.log('Insufficient funds.');
        }
        else {
            console.log('Invalid amount. Please enter a positive number.');
        }
    }
    async fastCash() {
        const { option } = await inquirer.prompt({
            type: 'list',
            name: 'option',
            message: 'Select the amount for fast cash:',
            choices: ['500', '1000', '2000', '5000', '10000', '20000']
        });
        const amount = parseInt(option);
        if (amount <= this.account.balance) {
            this.account.balance -= amount;
            console.log(`$${amount} dispensed successfully.`);
        }
        else {
            console.log('Insufficient funds.');
        }
    }
}
// Usage
const atm = new ATM();
atm.start();
