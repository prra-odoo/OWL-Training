/** @odoo-module **/

import { Component } from "@odoo/owl";
import { Counter } from "./counter/counter";
import { Todo } from "./todo/todo";
import { TodoList } from "./todo_list/todo_list";
import { Card } from "./card/card";


export class Playground extends Component {

};
Playground.template = "owl_playground.playground";
Playground.components = { Counter, TodoList, Todo, Card};


