/** @odoo-module **/
import { Component, useState } from "@odoo/owl";
import { Counter } from "./counter/counter";
import { TodoList } from "./todolist/todolist";
import { Card } from "./card/card";
import { QuoteGenerator } from "./quotegenerator/quotegenerator";


export class Playground extends Component {
    static template = "owl_playground.playground";
    static components = { Counter, TodoList, Card, QuoteGenerator };
}