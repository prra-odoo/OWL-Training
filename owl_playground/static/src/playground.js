/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { Card } from "./Card/card";
import { Counter } from "./counter/counter";
import { TodoList } from "./todolist/todolist";


export class Playground extends Component {
    static template = "owl_playground.playground";

    setup() {
        
      
        this.todo = useState({
            list: [{ id: 3, description: "buy milk", done: false }]
        });
    }

}

Playground.components = { Counter, TodoList ,Card};