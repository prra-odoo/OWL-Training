/** @odoo-module **/

import { Component } from "@odoo/owl";


export class Todo extends Component {
    
}

Todo.template = "owl_playground.Todo";
Todo.props = {
    id: { type: Number },
    description: { type: String },
    done: { type: Boolean },
    myFun1 : { type : Function },
    myFun2 : { type : Function },
}
