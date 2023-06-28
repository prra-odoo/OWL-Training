/** @odoo-module **/

// import { Component, useState } from "@odoo/owl";
import { Todo } from "@owl_playground/todo/todo"
import { useAutofocus } from "@owl_playground/utils"
import { Component, useState, useRef,useEffect, onWillRender, onWillStart, onRendered, onMounted, onWillUpdateProps, onWillPatch, onPatched, onWillUnmount, onWillDestroy, onError} from "@odoo/owl";
export class TodoList extends Component {
    static template = "owl_playground.TodoList";

    setup(){
      this.inputRef = useRef("input");
      this.todos = useState(localStorage.getItem("tododata")?JSON.parse(localStorage.getItem("tododata")):[]);
      this.id = localStorage.getItem("id")?parseInt(localStorage.getItem("id")):0;
      onMounted(() => {
          console.log("TodoList ==> In onMounted")
          // console.log(typeof(this.inputRef))
          useAutofocus(this.inputRef)

      });
  }

  toggle(todoId){
    const todo = this.todos.find((todo) => todo.id === todoId);
    todo.done = !todo.done;
  }

  remove(id){
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex >= 0) {
    this.todos.splice(todoIndex, 1);
    localStorage.setItem("tododata",JSON.stringify(this.todos))
}
  }
  onKeyup(ev) {
    if (ev.keyCode === 13 && ev.target.value.trim() !==""){
        this.id +=1
        this.todos.push({ id:this.id, description: ev.target.value,
        done: false})
        localStorage.setItem("tododata",JSON.stringify(this.todos))
        localStorage.setItem("id",this.id)
        // console.log(typeof(localStorage.getItem("id")))
        ev.target.value=""
    }
  }
  static components = { Todo };

  }
  
