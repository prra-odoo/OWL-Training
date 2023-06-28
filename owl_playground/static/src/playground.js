/** @odoo-module **/

import { useState,Component } from "@odoo/owl";
import { Counter } from "./counter/counter";
import { TodoList } from "./TodoList/TodoList"
import { Card } from "./Card/Card";

export class Playground extends Component {
    static template = "owl_playground.playground";
    
    static components = { Counter , TodoList,Card};
}

