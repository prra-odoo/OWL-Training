/** @odoo-module **/

import { Component,useState, useRef, onMounted } from "@odoo/owl";
import { Transaction } from "../transaction/transaction";
import { Expense } from "../expense/expense";
import { Income } from "../expense/income/income";

export class TransactionList extends Component{
    static template = "owl_playground.transactionlist";  
    static components = {  Expense, Income,Transaction }  

    setup(){
        this.id = 0;
        this.total = 0;
        // this.transactionlist = {id: 2, amount:2200};
        this.transactionlist = useState([]);
        this.expenselist = useState([]);
        this.incomelist = useState([]);
        this.descRef = useRef("desc");
        this.inputRef = useRef("input");

        onMounted(() => {
            this.inputRef.el.focus();
            this.descRef.el.focus();
        })
    }

    newExpense(ev){
        if (ev.keyCode === 13 && ev.target.value.trim() !="") {
            this.transactionlist.push({ id: ++this.id, amount: ev.target.value.trim()});
            ev.target.value ="";
        }
    }

    addExpense(){
        let expense = this.inputRef.el.value;
        let description = this.descRef.el.value;
        this.total = this.total - parseInt(expense);
        this.expenselist.push({ id: ++this.id, amount: expense.trim(), desc:description.trim()});
        this.inputRef.el.value= "";
        this.descRef.el.value="";
        alert("Total updated!!");
    }

    addIncome(){
        let income = this.inputRef.el.value;
        let description = this.descRef.el.value;
        this.total = this.total + parseInt(income);
        this.incomelist.push({ id: ++this.id, amount: income.trim(), desc:description.trim()});
        this.inputRef.el.value= "";
        this.descRef.el.value="";
        alert("Total updated!!");
    }
}
