/** @odoo-module **/

import { Component, useState, onMounted, useRef, onWillStart, onWillRender, onRendered, onWillUpdateProps, onWillPatch, onPatched, onWillUnmount, onError } from "@odoo/owl";
import { Todo } from "../todo/todo";

export class TodoList extends Component {
	static components = { Todo };

	setup() {
        this.inputRef = useRef('inputRef');
        this.nextId = 0;
        this.todoList = useState([]);
        this.inputRef = useRef("input_facuse");

        onMounted(() => {
      		this.inputRef.el.focus();
    	});
    	
        /*onWillStart(async () => {
            console.log("onWillStart")
        });

        onWillRender(() => {
            console.log("onWillRender")
        });

        onRendered(() => {
            console.log("onRendered")
        });

        onWillUpdateProps(nextProps => {
            console.log("onWillUpdateProps")
        });

        onWillPatch(() => {
            console.log("onWillPatch")
        });

        onPatched(() => {
            console.log("onPatched")
        });

        onWillUnmount(() => {
            console.log("onWillUnmount")
        });

        onError(() => {
           console.log("onError")
        });*/

    	/*{ id: 3, description: "buy milk", done: true}, 
        { id: 4, description: "milk", done: true}, 
        { id: 5, description: "water", done: false}];*/
    }

	addTodoList(ev) {
        if (ev.keyCode === 13 && ev.target.value.trim() != "") {
            this.todoList.push({ id: this.nextId++, description: ev.target.value, done: false });
            ev.target.value = "";
        }
    }

    toggleTodo(todoId) {
        const todo = this.todoList.find((todo) => todo.id === todoId);
        if (todo) {
            todo.done = !todo.done;
        }
    }

    removeTodo(todoId) {
        const index = this.todoList.findIndex((todo) => todo.id === todoId);
        if (index >= 0) {
            this.todoList.splice(index, 1);
        }
    }
}

TodoList.template = 'owl_playground.todolist';
