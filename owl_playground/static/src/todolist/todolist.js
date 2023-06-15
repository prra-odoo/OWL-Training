/** @odoo-module **/

import { Component, useState, useRef,onMounted } from "@odoo/owl";
import {Todo} from "../todo/todo"
// import {Image} from "../../../assets/img/main.png";
// var script = document.createElement('script');
// script.src = 'https://code.jquery.com/jquery-3.6.3.min.js'; // Check https://jquery.com/ for the current version
// document.getElementsByTagName('head')[0].appendChild(script);

export class TodoList extends Component {
    static template = "owl_playground.todolist";
    static components = { Todo,Image };
    
    setup(){
        this.todos = useState(JSON.parse(localStorage.getItem('allTodos')) || []);
        // this.imageUrl = "../../../assets/img/main.png";
        // this.todos = useState([]);
        
        this.number = useState({value:localStorage.getItem("number") || 1});
        this.input = useRef("todoInput");
        onMounted(()=>this.input.el.focus());
    }


    addTodo(ev) {
        // console.log($("#todo_input").val())
        // console.log(this.input.el);
        if (ev.keyCode === 13) {
            if(ev.target.value.trim()==""){
                alert("Invalid Input");
                return;
            }
            this.todos.push({id:this.number.value++,description:ev.target.value,done:false});
            ev.target.value = "";
        }
        localStorage.setItem("number",this.number.value);
        localStorage.setItem("allTodos",JSON.stringify(this.todos));
    }

    toggleState(eid){
        for(let todo of this.todos){
            if(todo.id===eid){
                todo.done = ! todo.done;
            }
        }
        localStorage.setItem("allTodos",JSON.stringify(this.todos));
    }

    deleteTodo(eid){
        let index;
        for(let i=0;i<this.todos.length;i++){
            if(this.todos[i].id===eid){
                index = i;
            }
        }
        if (index > -1) {
            this.todos.splice(index, 1);
        }
        localStorage.setItem("allTodos",JSON.stringify(this.todos));
    }
    // onClickDeleteAll(){
    //     // this.todos = useState([]);
    //     localStorage.setItem("allTodos",JSON.stringify([]));
    //     this.todos = localStorage.getItem("allTodos");
        
    //     // localStorage.removeItem("allTodos");        
    // }

}


