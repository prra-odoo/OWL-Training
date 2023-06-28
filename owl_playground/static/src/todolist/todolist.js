/** @odoo-module **/

import { Todo } from "../todo/todo";
import { Component, useState, useRef, onMounted } from "@odoo/owl";
// import { useRef } from "@web/core/utils/hooks";

export class Todolist extends Component {
  static template = "owl_playground.todolist";
  static components = { Todo };

  setup() {
    this.id = 0;
    this.todos = useState([]);
    this.inputRef = useRef("input");

    onMounted(() => {
      this.inputRef.el.focus();
    });
  }

  addTodo(ev) {
    // debugger;
    if (ev.keyCode == 13 && ev.target.value != "") {
      this.todos.push({
        id: this.id++,
        description: ev.target.value,
        done: false,
      });
      ev.target.value = "";
    }
  }

  toggleTodo(todoId) {
    console.log('hello');
    debugger;
    for (let todo of this.todos) {
      if (todo.id === todoId) {
        todo.done = !todo.done;
      }
    }
  }

  removeTodo(todoId) {
    const index = this.todos.findIndex((todo) => todo.id === todoId);
    if (index >= 0) {
      // remove the element at index from list
      this.todos.splice(index, 1);
    }
  }
}
