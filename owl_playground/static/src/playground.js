/** @odoo-module **/

import { Component } from "@odoo/owl";
import {Counter} from "./counter/counter"
import { TodoList } from "./todolist/todolist";
import { Card } from "./card/card";
export class Playground extends Component {
    static template = "owl_playground.playground";
    setup(){
    }
    static components = {Counter , TodoList, Card}
    
}
