/** @odoo-module **/

import { useState, Component, useRef, onMounted } from "@odoo/owl";
import { Todo } from "../Todo/todo";

export class TodoList extends Component {
    static template = "owl_playground.TodoList";

    setup() {
        this.todos = useState(JSON.parse(localStorage.getItem('todos'))||[]);
        this.number = useState({value:localStorage.getItem("number") || 1});
        console.log(this.number.value);
        this.inputval = useRef('InputTodo');
        onMounted(() => this.inputval.el.focus());

    }

    addTodo(ev) {
        if (ev.keyCode === 13) {
            if (ev.target.value.trim() != "") {
                console.log(this.number.value)
                this.todos.push({ id: this.number.value, description: ev.target.value, done: false });
                this.number.value++;
                ev.target.value = "";
               
                localStorage.setItem("todos",JSON.stringify(this.todos)); 
                localStorage.setItem("number",this.number.value);
            }
            
            
        }
    }
    toggleState(val) {
        for (let todo of this.todos) {
            if (todo.id === val) {
                todo.done = !todo.done;

            }
        }

    }

    removeTodo(elemId) {
        let index = this.todos.findIndex((todo) => todo.id === elemId);
        if (index >= 0) {
            this.todos.splice(index, 1);
            localStorage.setItem("todos",JSON.stringify(this.todos)); 
        }

    }

    static components = { Todo };

}

