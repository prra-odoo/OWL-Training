/** @odoo-module **/

import { Component,useState, useRef, onMounted, onRendered, onPatched, onError } from "@odoo/owl";
import { Todo } from "../todo/todo";
import { useAutoFocus } from "./utils";

export class TodoList extends Component{
    static template = "owl_playground.Todolist";
    static components = { Todo };
   
    setup() {
            // this.todolist = [{ id: 3, description: ". buy milk", done: true },
            //                 { id: 4, description: ". buy eggs", done: true },
            //                 { id: 5, description: ". buy avocado", done: true },
            //                 ];
            this.id = 0;
            this.todolist = useState([]);
            // this.inputRef = useRef("input");
            useAutoFocus("input");

            // onRendered(() => {
            //     console.log(this.id + "  onrendered");
            //   });
    
            // onMounted(() => {
            //     this.inputRef.el.focus();
            // });

            // onPatched(() => {
            //     console.log(this.id + "  onpatched");
            //     this.inputRef.el.focus();
            //   });

            // onPatched(() => {
            //     console.log(this.id + "  onpatched");
            //     this.inputRef.el.focus();
            //   });

            // onError((e) => {
            //     console.log(this.id + "  onerror" + e);
            //   }); 
    }
    
    addTodo(ev){
        if (ev.keyCode === 13 && ev.target.value.trim() !="") {
            this.todolist.push({ id: ++this.id, description: ev.target.value.trim(), done: false });
            ev.target.value ="";
        }
    }

    toggleState(todoId) {
        const todo = this.todolist.find((todo) => todo.id === todoId)
        if( todo) {
            todo.done = !(todo.done);
        }

    }

    removeTodo(todoId) {
        const index = this.todolist.findIndex((todo) => todo.id === todoId);
        if (index >= 0) {
            this.todolist.splice(index, 1);
            }
        }
}
