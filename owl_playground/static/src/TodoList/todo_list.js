/** @odoo-module **/

import { Component, useState ,useRef} from "@odoo/owl";
import { useAutofocus } from "../utils";
import { Todo } from "../todo/todo";

export class TodoList extends Component {
    static template = "owl_playground.todoList";
    static components = {Todo};

    setup() {
        this.numberList = 1;
        this.todo = useState([]);
        useAutofocus("input");
        this.inputRef = useRef("input");
    }
    addTodo(ev) {
        this.inputRef.el.focus();
        if (ev.keyCode === 13) {
            if(ev.target.value==""){
                alert("Input should not be empty!!!!");
                return;
            }
            this.todo.push({id:this.numberList++,description:ev.target.value,done:false})
            ev.target.value = "";
        }
    }

    toggleTodo(Todoid) {
        const todo = this.todo.find((todo) => todo.id === Todoid);
        if (todo) {
            todo.done = !todo.done;
        }
    }

    remove(elemId){
        const index = this.todo.findIndex((elem) => elem.id === elemId);
        if (index >= 0) {
            this.todo.splice(index, 1);
        }
    }


    add(){
        let content=  document.getElementById("buttonid")
        // console.log(content.value)
        if(content.value==""){
            alert("Input should not be empty!!!!");
                return;
        }
        
        this.todo.push({id:this.numberList++,description:content.value,done:false})
        content.value="";

    }
}