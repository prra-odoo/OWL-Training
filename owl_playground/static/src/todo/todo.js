/** @odoo-module **/

import { Component, useState, useRef } from "@odoo/owl";
// import { PropTypes } from "@odoo/owl/dist/core/prop";

export class Todo extends Component {
    static template = "owl_playground.todo";
    static props = {
        id: {type: Number },
        description: { type:String },
        done:{type:Boolean},
        toggleState: { type:Function},
        removeTodo: { type:Function },
    };

 
}




   

    