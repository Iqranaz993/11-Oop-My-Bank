#! /user/bin/env node
import inquirer from "inquirer";

// bank account interface
interface bankAccount {
    accountNumber: number;
    balance: number;
    withdraw(amount: number): void
    deposit(amount: number): void
    checkBalance(): void
}

// bank account class
class bankAccount implements bankAccount {
    accountNumber: number;
    balance: number;
    constructor(accountNumber: number, balance: number) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // debit account money amount

    withdraw(amount: number): void {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawing ${amount} successfully. Remaining balance: ${this.balance}`);

        } else {
            console.log("Insufficient balance.");

        }
    }
    deposit(amount: number): void {
        if (amount > 100) {
            amount -= 1;
        } this.balance += amount;
        console.log(`Deposit: ${amount}successfully. Remaining balance: ${this.balance}`);

    }
    // check balance
    checkBalance(): void {
        console.log(`Current balance: ${this.balance}`);

    }

}
// customer class
class Customer {
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: string;
    account: bankAccount;
    constructor(firstName: string, lastName: string, gender: string, age: number, mobileNumber: string, account: bankAccount) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }

}






// creat bank account
const accounts: bankAccount[] = [
    new bankAccount(1001, 500),
    new bankAccount(1002, 1000),
    new bankAccount(1003, 2000)
]

// creat customers 
const customers: Customer[] = [
    new Customer("Ahmed", "Ali", "Male", 30, "03116579445", accounts[0]),
    new Customer("Sana", "Khan", "Female", 25, "03458796543", accounts[1]),
    new Customer("Muhammad", "Raza", "Male", 40, "03218795987", accounts[2])

]

async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"
        })
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`Welcome ${customer.firstName} ${customer.lastName}\n `);
            const ans = await inquirer.prompt([{
                name: "select",
                type: "list",
                message: "Select an operations",
                choices: ["Check Balance", "Deposit", "Withdraw", "Exit"]
            }])

            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "depositAmount",
                        type: "number",
                        message: "Enter deposit amount:"
                    })
                    customer.account.deposit(depositAmount.depositAmount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "withdrawAmount",
                        type: "number",
                        message: "Enter withdraw amount:"
                    })
                    customer.account.withdraw(withdrawAmount.withdrawAmount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Thank you for using our services!");
                    process.exit(0);
                    break;
                default:
            }

        } else {
            console.log("Invalid account Number! please try again");

        }

    } while (true)
}

service();