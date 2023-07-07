/** @odoo-module **/

import { useState,Component } from "@odoo/owl"; //hooks

export class Todo extends Component {
    static template = "owl_playground.todo";
    static props = {
        id : {type:Number},
        description: {type:String},
        done: {type:Boolean},
        toggleTodo: { type: Function },
        removeIndex: { type: Function},
    };
}
