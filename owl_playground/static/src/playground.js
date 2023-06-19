/** @odoo-module **/
import { Component } from "@odoo/owl";
import { Counter } from "./counter";
import { TodoList } from "./Todo/todolist";
import { Card } from "./Card/card";



export class Playground extends Component {
    static template = "owl_playground.playground";
    
    static components = { Counter, TodoList, Card};
}
