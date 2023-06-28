/** @odoo-module **/

import { Component, onWillUpdateProps } from "@odoo/owl";

export class Todo extends Component {
    setup(){
        onWillUpdateProps(() => {
            console.log('update props');
        });
    }
 }

Todo.template = "owl_playground.todo";
Todo.props = {
    id : { type: Number},
    description : {type : String},
    done : {type : Boolean},
    togglestate : {type: Function},
    removetodo : {type: Function},
}
