/** @odoo-module **/

import { Component, useState } from "@odoo/owl";

export class Counter extends Component {
    static template = "owl_playground.counter";

    setup() {
        if(localStorage.getItem('countValue')){

        };
        this.state = useState({ value: localStorage.getItem('countValue') ? localStorage.getItem('countValue') : 0 });
    }

    increment() {
        this.state.value++;
        localStorage.setItem('countValue', this.state.value);
    }

    decrement() {
        if(this.state.value > 0){
            this.state.value--;
        }
        else{
            window.alert("decrement will not work if counter value is 0")
        }
        localStorage.setItem('countValue', this.state.value);
    }
}