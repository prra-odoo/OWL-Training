/** @odoo-module **/

import { Component , useState} from "@odoo/owl";
import { Todo } from "../todo/todo";
import { useautofocus } from "../utils";
import { Card } from "../card/card";



export class Todolist extends Component {
    static template = "owl_playground.todolist";
    static components = { Todo ,Card };  

    setup() {
        this.todolist = useState([]);
        useautofocus("input");
        const storedTodolist = localStorage.getItem("todolist");
        if (storedTodolist) {
            this.todolist = useState(JSON.parse(storedTodolist));
        }
    }
    addtodo(ev) {
        if (ev.keyCode === 13  &&  ev.target.value.trim() != "") {
            this.todolist.push({id: this.todolist.length + 1, description: ev.target.value, done:false });          
            ev.target.value = "";
        }
        localStorage.setItem("todolist", JSON.stringify(this.todolist));
    }

    toggle(todoid){
        const todo = this.todolist.find((todo) => todo.id === todoid);
        if (todo) {
            todo.done = !todo.done;
        }

    }
    
    todoremove(todoId) {
        const todoIndex = this.todolist.findIndex((todo) => todo.id === todoId);
        if (todoIndex >= 0) {
            this.todolist.splice(todoIndex, 1);
            this.todolist.length + 1;
        }
        localStorage.setItem("todolist", JSON.stringify(this.todolist));
    }
}
