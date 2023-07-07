/** @odoo-module **/

import { Component, useState, } from "@odoo/owl";
import { useAutofocus } from "../util";
import { Todo } from "../todo/todo";
export class TodoList extends Component {
    // static template = "owl_playground.todolist";
    // static components = { Todo };
    setup() {
        this.id = 1;
        this.todolist = useState([]);

        
    };

    addTodo(ev) {
        if (ev.keyCode === 13 && ev.target.value.trim() != "") {
            if (this.todolist.length === 0) {
                this.id = 1;
            }
            this.todolist.push({ 
                id: this.id++, 
                description: ev.target.value.trim(), 
                done: false 
            });
            ev.target.value = "";
        }
    }

    toggleState(todoId) {
        const todo = this.todolist.find((todo) => todo.id === todoId);
        if (todo) {
            todo.done = !todo.done;
        }
    }

    removeTodo(elemId) {
        // debugger;
        const index = this.todolist.findIndex((elem) => elem.id === elemId);
        this.todolist.splice(index, 1);
        // if (index >= 0) {
        //     // remove the element at index from list
        // }
    }
}
TodoList.template = "owl_playground.todolist";
TodoList.components = { Todo };