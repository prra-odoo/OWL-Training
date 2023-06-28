/** @odoo-module **/

import { Component, useState } from "@odoo/owl";

export class Counter extends Component {

    setup(){
        this.state = useState({value: 0})
        if(localStorage.getItem("counterData")){
            this.state.value = localStorage.getItem("counterData");
        }
    }

    increment(){
        this.state.value++;
        localStorage.setItem("counterData", this.state.value);
    }

    decrement(){
        this.state.value--;
        localStorage.setItem("counterData", this.state.value);
    }
}

Counter.template = "owl_playground.counter";
