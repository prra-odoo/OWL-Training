/** @odoo-module **/

import { Component, useState } from "@odoo/owl";

export class Counter extends Component {
    setup() {
        this.state = useState({ value: 0 });
    }
    increment() {
        this.state.value = this.state.value + 1;
    }

}

Counter.template = "owl_playground.Counter";