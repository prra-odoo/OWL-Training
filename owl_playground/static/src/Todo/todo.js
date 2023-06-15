/** @odoo-module **/
import { Component, useState} from "@odoo/owl";



export class Todo extends Component{
    static template="owl_playground.todo";

    static props = {
        id: {type: Number },
        description: { type:String },
        done:{type:Boolean},
        toggleState:{type:Function},
        removeTodo:{type:Function}
    };
    // static template = xml`<div><t t-esc="props.id"/><t t-esc="props.description"/>`;
   

}

