/** @odoo-module **/

import { Component , xml, onWillRender, onWillStart, onRendered, onMounted, onWillUpdateProps, onWillPatch, onPatched, onWillUnmount, onWillDestroy, onError} from "@odoo/owl";
import { Counter } from "@owl_playground/counter/counter"
import { TodoList } from "@owl_playground/todolist/todolist"
import { Card } from "@owl_playground/card/card"
export class Playground extends Component {
    static template = "owl_playground.playground";
    static components = { Counter, TodoList, Card};
}
