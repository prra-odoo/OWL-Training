/** @odoo-module **/

import { Card } from "./card/card";
import { Component } from "@odoo/owl";
import { Counter } from "./counter/counter"; 
import { TodoList } from "./todolist/todolist";
import { Transaction } from "./transaction/transaction";
import { TransactionList } from "./transaction_list/transaction_list";
import { Expense } from "./expense/expense";
import { Income } from "./expense/income/income";
export class Playground extends Component {
    static template = "owl_playground.playground";
    static components = { Counter, TodoList, Card, Transaction, TransactionList, Income, Expense };
    // setup() {
    //     [
    //         this.todo = { id: 3, description: ". buy milk", done: true },
    //         this.todo = { id: 4, description: ". buy eggs", done: true },
    //         this.todo = { id: 5, description: ". buy avocado", done: true },
    //     ];
    // }
    // // static components = {Todo}
}

// Playground.template = "owl_playground.playground";
