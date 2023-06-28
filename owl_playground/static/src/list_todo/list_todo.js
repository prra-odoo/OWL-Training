/** @odoo-module **/

import { Component ,useState ,onWillUpdateProps} from "@odoo/owl";
import { useAutofocus } from "../utils";
import { Todo } from "../to-do/to_do"
// const {useSubEnv, useEffect, useRef } = owl;
export class Listtodo extends Component {
    static template = "owl_playground.Listtodo";

    static components = { Todo };
    setup() {
        this.list_todo = useState([]);
        this.id = 1;
        useAutofocus("todoListInput");

        

    }

    addTodo(ev) {
        if (ev.keyCode === 13 && ev.target.value!='') {
            this.list_todo.push({ id: this.id++, description: ev.target.value, done: false });
        }
    }

    toogle(ev){
        // debugger;
        const todo = this.list_todo.find((todo) => todo.id === ev)
        if (todo) {
            todo.done = !todo.done;
        // console.log(todo)
    }
}

removeTodo(todoId) {
    // debugger;
    const Index = this.list_todo.findIndex((todo) => todo.id === todoId);
    if (Index >= 0) {
        this.list_todo.splice(Index, 1);
    }
}




}
