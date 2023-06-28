/** @odoo-module **/

import { Component , useState } from "@odoo/owl";
import { Counter } from "./Couunter/Counter";
import { TodoList } from "./TodoList/todo_list";
import { Card } from "./Card/card";

export class Playground extends Component {
    static template = "owl_playground.playground";
    static components = {Counter,TodoList,Card}
    setup() {
        this.state = useState({ value: 0 });
    }

    increment() {
        this.state.value++;
    }
}


