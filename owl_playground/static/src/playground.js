/** @odoo-module **/
import { Card } from "./card/card";
import { Counter } from "./Counter/counter";
import { TodoList } from "./todo_list/todo_list";
import { Todo } from "./todo/todo";
import { Component, useState } from "@odoo/owl";

export class Playground extends Component {
  static template = "owl_playground.playground";

  setup(){
    
  }

  static components = { Counter, TodoList, Card, Todo };
}
