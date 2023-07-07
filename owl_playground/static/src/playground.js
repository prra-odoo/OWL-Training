/** @odoo-module **/

import { Card } from "./card/card";
import { Component } from "@odoo/owl";
import { Counter } from "./counter/counter";
import { TodoList } from "./todolist/todolist";

export class Playground extends Component {
    static components = { Counter, TodoList, Card };
}
Playground.template = "owl_playground.playground";
