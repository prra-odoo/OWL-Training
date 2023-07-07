/** @odoo-module **/

import { Component, useState, useRef, onPatched, onMounted, onRendered, onError, useEffect } from "@odoo/owl";
import { Todo } from "../todo/todo";
import { useAutofocus } from "../utils";

export class Todolist extends Component {
    // static template = "owl_playground.Todolist";
    setup() {
        this.id = 0;
        this.todolist = useState([]);
        // this.toggleState = this.toggleState.bind(this);
        useAutofocus("aktr");
        // useEffect(() => console.log(this.abc));
    }

    addTodo(ev){
        if (ev.keyCode === 13 && ev.target.value.trim() !="") {
            this.todolist.push({ id: ++this.id, description: ev.target.value.trim(), done: false });
            ev.target.value ="";
        }
    }
    toggleState(todoId) {
        this.todolist.forEach(element => {
            if(element.id === todoId) {
                element.done =!element.done;
            }
        });
    }
    
    removeTodo(todoId) {
        const index = this.todolist.findIndex((elem) => elem.id === todoId);
        if (index >= 0) {
            this.todolist.splice(index, 1);
        }
        this.todolist.slice(index).forEach( element => {
            element.id = element.id - 1;
        }
        );
    }
    
    get abc() {
        return this.todolist;
    }
}

Todolist.template = "owl_playground.Todolist";
Todolist.components = { Todo };
