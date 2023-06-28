/** @odoo-module **/

import { useState,Component } from "@odoo/owl";

export class Todo extends Component {
    static template = "owl_playground.todo";
    static props = {
        id: {type:Number},
        description: {type:String},
        done: {type:Boolean},
        toggleState: {type:Function},
        deleteTodo: {type:Function}
    }   
    setup(){
    }

    onclick(){
        this.props.toggleState(this.props.id);
    }

    onclickDelete(){
        this.props.deleteTodo(this.props.id);
    }
}