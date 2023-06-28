/** @odoo-module **/

import { Component, useState, useRef, onMounted } from "@odoo/owl";
import { ToDo } from "../todo/todo";
import { useAutofocus } from "../utils"

export class Todolist extends Component {
    setup() {
        if(localStorage.getItem('todovalues')){
            this.todolist = localStorage.getItem('todovalues')
        }
        this.todolist = useState(JSON.parse(localStorage.getItem('todovalues')) ? JSON.parse(localStorage.getItem('todovalues')) : []);
        useAutofocus("input");
    }

    addTodo(ev) {
        if(ev.keyCode === 13 && ev.target.value.trim() != ""){
            this.todolist.push({id: this.todolist.length + 1, description: ev.target.value, done: false});
            ev.target.value = "";
        }
        localStorage.setItem('todovalues', JSON.stringify(this.todolist));
    }

    toggle(todoId) {
        const todo = this.todolist.find((todo) => todo.id === todoId)
        if (todo) {
            todo.done = !(todo.done);
        }
        localStorage.setItem('todovalues', JSON.stringify(this.todolist));
    }

    removetodo(todoId) {
        const index = this.todolist.findIndex((todo) => todo.id === todoId);
        if (index >= 0) {
            this.todolist.splice(index, 1);
        }
        localStorage.setItem('todovalues', JSON.stringify(this.todolist));
    }
}

Todolist.template = "owl_playground.todolist"
Todolist.components = { ToDo }