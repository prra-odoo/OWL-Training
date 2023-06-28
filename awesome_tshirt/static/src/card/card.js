/** @odoo-module **/

import { Component } from "@odoo/owl";
export class Card extends Component {
	setup() {}
}
Card.template = "awesome_tshirt.card";
Card.props = {
	slots: {
		type: Object,
		shape: {
			default: Object,
			title: { type: Object, optional: true },
		},
	},
};
