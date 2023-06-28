/** @odoo-module **/

import { Component ,useState} from "@odoo/owl";
import { Todo } from "../todo/todo";
import { useAutofocus } from "../utils";

export class TodoList extends Component {
    
    static components = { Todo };
    setup(){
        this.TodoList = useState([]);
        this.id = 1;
        useAutofocus("input");

        if(localStorage.getItem("todoData")){
            this.TodoList = useState(JSON.parse(localStorage.getItem("todoData")));
        }
    }


    addTodo(ev){
        if (ev.keyCode === 13 && ev.target.value!='')
        {
            this.TodoList.push({id:this.id++, description:ev.target.value, done:false})
            ev.target.value = ''
        }
        localStorage.setItem("todoData", JSON.stringify(this.TodoList));
    }

    toggle(todoId){
        const todo = this.TodoList.find((todo) => todo.id === todoId)
        if (todo){
            todo.done = !todo.done;
        }
    }

    removeTodo(elemId){
        // find the index of the element to delete
        const index = this.TodoList.findIndex((elem) => elem.id === elemId);
        if (index >= 0) {
            // remove the element at index from list
            this.TodoList.splice(index, 1);
        }
            localStorage.setItem("todoData", JSON.stringify(this.TodoList));
    }
}
TodoList.template = "owl_playground.todolist"
