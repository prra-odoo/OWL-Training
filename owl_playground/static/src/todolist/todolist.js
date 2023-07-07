/** @odoo-module */

import { Component, useState, useRef, onPatched, onMounted, onRendered, onError } from "@odoo/owl";
import { Todo } from "../todo/todo";
import { useAutofocus } from "../utils";


export class TodoList extends Component {
    setup() {
        this.nextId = 0;
        this.todoList = useState([]);
        useAutofocus("todoListInput");
        this.rijaRef = useRef("rija");
        onRendered(() => {
        });
        onMounted(() => {
            this.rijaRef.el.focus();
        });
        onPatched(() => {
            this.rijaRef.el.focus();
        });
        onError((e) => {
            console.log(this.id + "onerror" + e);
        });
    }

    addTodo(ev) {
        if (ev.keyCode === 13 && ev.target.value.trim() != "") {
            this.todoList.push({ id: ++this.nextId, description: ev.target.value.trim(), done: false });
            // console.log(this.nextId, ev.target.value);
            ev.target.value = "";
        }
        // if (ev.keyCode === 13 && this.rijaRef.el.value.trim() !="") {
        //     this.todoList.push({ id: ++this.nextId, description: this.rijaRef.el.value.trim(), done: false });
        //     ev.target.value ="";
        // }
    }
    toggleTodo(todoId) {
        const todo = this.todoList.find((todo) => todo.id === todoId);
        if (todo) {
            todo.done = !todo.done;
        }
    }

    removeTodo(elemId) {
        const index = this.todoList.findIndex((elem) => elem.id === elemId);
        if (index >= 0) {
            this.todoList.splice(index, 1);
        }
    }

    static components = { Todo }
    static template = "owl_playground.todoList";
}