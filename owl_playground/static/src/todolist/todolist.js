/** @odoo-module **/

import { Component,useRef, onMounted , useState } from "@odoo/owl";
import { Todo } from "../todo/todo";

export class Todolist extends Component {

    setup() {
        this.todolist = useState([])
        this.id = 1;
        this.inputRef = useRef("input");
        onMounted(() => this.focus());
        
    }

    toggle(todoId){
        const todo = this.todolist.find((todo) => todo.id === todoId);
        if (todo) {
            todo.done = !todo.done;
        }
    }

    addTodo(ev){
        if(ev.keyCode === 13 && ev.target.value !=""){
            this.todolist.push({id: this.id++, description: ev.target.value, done: false })
            ev.target.value = ""
        }
    }

    focus(){
        this.inputRef.el.focus();
    }

    removeid(todoId){
        const todo = this.todolist.findIndex((todo) => todo.id === todoId);
        if(todo >= 0){
        this.todolist.splice(todo, 1);
        }
    }

}

Todolist.components = { Todo }
Todolist.template = "owl_playground.todolist";