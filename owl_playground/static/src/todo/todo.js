/** @odoo-module **/

import {Component} from "@odoo/owl";

export class Todo extends Component{
    static template = "owl_playground.todo";
    static props = {
        id : {type: Number},
        description : {type: String},
        done: {type: Boolean},
        myfunction : {type:Function},
        removeprops : {type:Function}
    };
}