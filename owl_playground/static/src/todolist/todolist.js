/** @odoo-module **/
import { Todo } from "../todo/todo";
import { Component, useState, useRef } from "@odoo/owl";

export class TodoList extends Component {
    static template = "owl_playground.todolist";


    setup() {
        this.id="1";
        this.todos = useState([]);
        this.inputRef = useRef("Input");
        
    }

    addTodo(ev) {
        // debugger;
        // console.log(this.inputRef.el);

        if (ev.keyCode === 13) {
            if(ev.target.value==""){
                alert("Invalid Input");
                return;
            }
            this.todos.push({id:this.id++,description:ev.target.value,done:false})
            ev.target.value = "";
        }
    }

    toggleState(id){
        // const todo = this.todos.find(t=>t.id===id);
        // todo.done =!todo.done;
        for(let todo of this.todos){
            if(todo.id===id){
                console.log(todo.done);
                todo.done =!todo.done;
                console.log(todo.done);
            }
        }
    }
    
    removeTodo(id)  {
        const index = this.todos.findIndex((elem) => elem.id === id);
        if (index >= 0) {
    
            this.todos.splice(index, 1);
        }
    }
    
}

TodoList.components = { Todo };




   

    