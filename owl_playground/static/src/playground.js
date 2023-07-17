/** @odoo-module **/

import {Component } from "@odoo/owl";
// import {Counter} from "./counter/counter";
// import { Todolist } from "./todolist/todolist";
// import { Todo } from "./todo/todo"
// import { Card} from "./card/card"
import {Menu} from "./menu/menu"


export class Playground extends Component {
  static template = "owl_playground.playground";
//   static components = { Counter, Todolist ,Todo, Card};
  static components = { Menu };

//   setup() {
//   this.todoObj = { id: 3, description: ". Buy Milk", done: false };
//   }
  
}
