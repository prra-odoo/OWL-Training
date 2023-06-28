/** @odoo-module **/

import { Component, useState, useRef } from "@odoo/owl";
import { Todo } from "../todo/todo";
import { useAutofocus } from "../utils";

export class Todolist extends Component {

    setup(){
        this.todoList = useState([]);
        this.inputRef = useRef("myinput");
        useAutofocus(this.inputRef);
    }

    addTodo(ev){
        if(ev.keyCode === 13 && ev.target.value.trim()){
            const description = ev.target.value;
            const id = this.todoList.length + 1;
            const done = false;
            const todo = { id, description, done };
            this.todoList.push(todo);
            ev.target.value = ""; 
        }
    }

    toggleState(todoId){
        const todo = this.todoList.find((todo) => todo.id === todoId);
        todo.done = !todo.done;
    }

    removeTodo(todoId){
        const index = this.todoList.findIndex((todo) => todo.id === todoId);
        if (index >= 0) {
            this.todoList.splice(index, 1);
        }
    }
}

Todolist.template = "owl_playground.Todolist";
Todolist.components = { Todo };