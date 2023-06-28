/** @odoo-module **/
import { Component, useState,useRef} from "@odoo/owl";
import { Todo } from "../Todo/todo";
import { useAutofocus } from "../utils";
 
export class Todolist extends Component{
   static template="owl_playground.Todolist";
   static components = { Todo } ;

   

   setup() {
    this.todos = useState(JSON.parse(localStorage.getItem('allTodos')) || []);
    this.number= useState({value:localStorage.getItem('number')||1});
        
        // { id: 1, description: "buy milk", done: true },
        // { id: 2, description: "buy tea", done: false },
        
    // this.inputRef=useRef("input");
    useAutofocus("input");  
}

// get isChecked() {
//     return this.props.Todo.done;
//   }
toggleState(todoId){
 for(let todo of this.todos){
    if(todo.id==todoId){
        todo.done= !todo.done;
    }
 }
}


addTodo(event) {
    if(event.keyCode==13){
        console.log(event.target.value);
        // triggers the input button :

        // console.log(document.getElementById("todoinput"));
        // console.log(this.inputRef.el);
        
        var inputValue=event.target.value;

        if(inputValue){
            var newTodo = {
                id: this.number.value++,// Generate a unique ID for the new todo
                description: inputValue,
                done:false
            };
            this.todos.push(newTodo);
            // console.log(newTodo);
           event.target.value='';
        }
        localStorage.setItem("allTodos",JSON.stringify(this.todos)); 
        localStorage.setItem("number",this.number.value);
    }   
}

removeTodo(todoId){
const todoindex = this.todos.findIndex((todo) => todo.id == todoId);
if (todoindex >= 0) {
    // remove the element at index from list
    this.todos.splice(todoindex, 1);
}
localStorage.setItem("allTodos",JSON.stringify(this.todos)); 
}
}