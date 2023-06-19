/** @odoo-module **/
import { Component, useState, useRef } from "@odoo/owl";
import { Todo } from "./todo";

export class TodoList extends Component {
    static template = "owl_playground.todolist";

    setup() {
        this.todolists = useState(JSON.parse(localStorage.getItem('allTodos')) || []);
        this.idNumber=useState({value: JSON.parse(localStorage.getItem('idNumber')) || 1 });
        // this.todolists=useState([]);
        this.incrementId = 0;
        this.inputRef = useRef("todolistInput");
    }

 
     // for setting the data in localStorage

    addTodo(e) {
        // console.log(this.inputRef.el);

        if (e.keyCode === 13 && e.target.value != "") {
            this.todolists.push({ id: this.idNumber.value++, description: e.target.value, done: false })
            e.target.value = "";
        }
        localStorage.setItem("allTodos",JSON.stringify(this.todolists));
        localStorage.setItem("idNumber",JSON.stringify(this.idNumber.value));
    }

    toggleTodo(todoId) {
        for (let todo of this.todolists) {
            if (todo.id === todoId) {
                todo.done = !todo.done;
                // console.log(todo.done)
            }
        }
        // console.log(this.todolists.done);
    }

    removeTodo(elemId) {
        const index = this.todolists.findIndex((elem) => elem.id === elemId);
        if (index >= 0) {
            // remove the element at index from list
            this.todolists.splice(index, 1);
        }
        localStorage.setItem("allTodos",JSON.stringify(this.todolists));
        localStorage.setItem("idNumber",JSON.stringify(this.idNumber.value));
    }

    static components = { Todo };
}
