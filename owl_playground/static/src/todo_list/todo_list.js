/** @odoo-module **/

import { Todo } from "../todo/todo";
import { useAutofocus } from "../utils";
import { Component, useState, useRef } from "@odoo/owl";

export class TodoList extends Component {
  static template = "owl_playground.todoList";

  static components = { Todo };

  setup() {
    this.numberList = 1;
    this.todo = useState([]);
    useAutofocus("inputTodoList");
    // this.inputRef = useRef("inputTodoList");
  }

  addTodo(ev) {
    if (ev.keyCode === 13) {
      // console.log(this.inputRef.el.value)
      // document.write(ev.target.value)
      if (ev.target.value == "") {
        alert("Invalid Input");
        return;
      }
      this.todo.push({
        id: this.numberList++,
        description: ev.target.value,
        done: false,
      });
      ev.target.value = "";
    }
  }

  toggleTodo(todoId) {
    const todo = this.todo.find((todo) => todo.id === todoId);
    if (todo) {
      todo.done = !todo.done;
    }
  }

  removeTodo(todoId) {
    // console.log("index",this.todo)
    const todoIndex = this.todo.findIndex((todo) => todo.id === todoId);
    // console.log("todo Index",todoIndex)
    if (todoIndex >= 0) {
        this.todo.splice(todoIndex, 1);
    }
}
}
