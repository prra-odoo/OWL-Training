/** @odoo-module **/

import { useState,Component } from "@odoo/owl"; //hooks
import { Counter } from "./counter/counter";
import { Todolist } from  "./todolist/todolist";
import { Card } from "./card/card";

export class Playground extends Component {
    static template = "owl_playground.playground";
    static components = {Counter, Todolist, Card};
}
