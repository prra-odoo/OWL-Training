/** @odoo-module **/

import { useState,Component,useRef, onMounted } from "@odoo/owl"; //hooks
import { Todo } from "../todo/todo";

export class Todolist extends Component {
    static template = "owl_playground.todolist";
    static components = {Todo};

    setup(){
            this.id = 0;
            this.todolist = useState([]);
            this.inputRef = useRef("input");
            
            onMounted(() => {
                this.inputRef.el.focus();
                }
            );
        }

        addTodo(ev){
            if (ev.keyCode === 13 && this.inputRef.el.value.trim() !="") {
                this.todolist.push({ id: ++this.id, description: this.inputRef.el.value, done: false });
                ev.target.value ="";
            }
        }
        toggleState(todoId) {
            this.todolist.forEach(element => {
                if(element.id === todoId) {
                    element.done =!element.done;
                }
            });
        }
        removeTodo(todoId) {
            const index = this.todolist.findIndex((elem) => elem.id === todoId);
            if (index >= 0) {
                this.todolist.splice(index, 1);
            }
        }
}
