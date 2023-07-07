/** @odoo-module **/
import { Component, onWillUpdateProps } from "@odoo/owl";

export class Todo extends Component {
    setup(){
        onWillUpdateProps((name) => {
            console.log('will')
            console.log(name)
        });
    }
    static props = {
        id: {type: Number},
        description: {type: String},
        done: {type: Boolean},
        toggleState: {type: Function},
        removeTodo: {type: Function},
    }
}

Todo.template = "owl_playground.Todo";