/** @odoo-module **/

import { Todo } from "../todo/todo";
import { useAutofocus } from "../utils";
import {Component, useState} from "@odoo/owl";
export class TodoList extends Component {

    setup() {
    //     this.todolist=[{ id:3, description:"Buy milk", done:false},
    //     {id:4, description:"Buy Chocolate", done:true},
    //     {id:5, description:"Buy Cake", done:true}
    // ];


    this.todolist=useState([]);
    this.inc=0;
    useAutofocus("todoListInput");
    }

    addTodo(ev){
        if(ev.keyCode=== 13 && ev.target.value.trim() != ""){
            this.todolist.push({id: this.inc++, description: ev.target.value, done: false});
            ev.target.value="";
        }   
    }

   toggleTodo(todoId){
    const todo=this.todolist.find((todo)=>todo.id === todoId);
    if(todo){
        todo.done=!todo.done;
    }
   }

   removeTodo(todoId){
    const index=this.todolist.findIndex((todo)=> todo.id===todoId);
    if(index>=0){
        this.todolist.splice(index,1);
    }

    
    
    

    

   }


   
  
   
  
  

   

} 

TodoList.components={Todo};
TodoList.template="owl_playground.TodoList";