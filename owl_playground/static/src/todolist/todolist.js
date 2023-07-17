/** @odoo-module **/

import { useState, Component , useRef, onMounted, onPatched, onWillStart, onError, onWillRender} from "@odoo/owl";
import { useAutofocus } from "../utils";
import { Todo } from "../todo/todo";

export class Todolist extends Component{
    static template = "owl_playground.todolist";
    static components = { Todo };
    // setup(){
    //     this.todolist = [{id: 3, description: ". Buy Milk", done: false},
    //                      {id: 4, description: ". row mango", done: true},
    //                      {id: 5, description: ". banana", done: false}]
    //   }
    setup() {
        this.id = 0;
        this.todolist = useState([]);
        this.refattr = useRef("refAttr")
        useAutofocus("refAttr")
        onWillRender(() => {
            console.log("on will rendered")
        });
        onWillStart( () => {
            console.log("on will start called")
            // this.refattr.el.focus();
        });
        // 
        onPatched(()=> {
            console.log("patched called"+this)
        });
        // onError((e) => {
        //     // do something
        //     console.log("on error called-"+e)
        //   });
    }


    // addTodo(ev){
    //     if (ev.keyCode === 13) {
    //         const todoDescription = ev.target.value.trim();
    //         if (todoDescription !== "") {
    //           this.todolist.push({ id: ++this.id, description: todoDescription, done: false });
    //           ev.target.value = "";
    //         }
    //     }
    // }
    addTodo(ev){
        if(ev.keyCode === 13 && this.refattr.el.value.trim() !== "")
        {
            this.todolist.push({ id: ++this.id, description: this.refattr.el.value , done: false });
            ev.target.value ="";  
        }
    }
    togglefunction(todoId){
        console.log("this todo id"+todoId)
        console.log("this todolist id"+this.todolist)
        this.todolist.forEach(data => {
            if(data.id === todoId)
            {
                data.done =!data.done;
            }
        });

    }
    removefunction(todoId){
        const index = this.todolist.findIndex((elem) => elem.id === todoId);
        if (index >= 0) {
        // remove the element at index from list
            this.todolist.splice(index, 1);
        }
    }
}