/** @odoo-module **/

import { Component } from "@odoo/owl";

export class Todo extends Component {	
	static props = {
		id: {type: Number, optional: true},
		description: {type: String, optional: true},
		done: {type: Boolean, optional: true},
		toggelState: {type: Function},
		removeTodo: {type: Function},
	}

	onClick(ev) {
		this.props.toggelState(this.props.id);
	}

	onRemove() {
        this.props.removeTodo(this.props.id);
    }
}

Todo.template = 'owl_playground.todo';