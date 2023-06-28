/** @odoo-module **/

import { Component , useState } from "@odoo/owl";
import { Card } from "../card/card";


export class Counter extends Component{
    static template = "owl_playground.counter";
    static components = {Card};

    setup() {
        this.state = useState({ value: 0 });
        if(localStorage.getItem('counterdata')){
            this.state.value = localStorage.getItem('counterdata');
        }
    }

    increment() {
        this.state.value++;
        localStorage.setItem('counterdata',this.state.value);
    }
    
    decrement() {
        if(this.state.value > 0){
            this.state.value--;
        }else{
            window.alert("No negative numbers")        
        }
    }
}
