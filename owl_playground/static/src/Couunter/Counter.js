/** @odoo-module **/

import { Component , useState } from "@odoo/owl";


export class Counter extends Component {
    static template = "owl_playground.counter";
    setup() {
        this.state1 = useState({ value: 0 });
    }

    increment() {
        this.state1.value++;
    }

}
