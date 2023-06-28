/** @odoo-module **/

import { Component, onWillUpdateProps } from "@odoo/owl";

export class ToDo extends Component {

    setup() {
        onWillUpdateProps(() => console.log("onWillUpdateProps"))
    }
}

ToDo.template = "owl_playground.todo";

ToDo.props = {
    id: {type: Number},
    description: {type: String},
    done: {type: Boolean},
    togglestate: {type: Function},
    removetodo: {type: Function},
};