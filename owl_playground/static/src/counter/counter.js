/** @odoo-module **/

import { useState,Component } from "@odoo/owl"; //hooks

export class Counter extends Component {
    static template = "owl_playground.counter";

    state = useState({ value: 0 });
    
    increment() { //increament method
      this.state.value++;
      }
    decrement(){
      this.state.value--;
    }
}