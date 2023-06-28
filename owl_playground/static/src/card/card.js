/** @odoo-module **/

import { Component } from "@odoo/owl";

export class Card extends Component {
}

Card.template = "owl_playground.card";

Card.props= {
    slots: {
        type: Object,
        shape: {
            default: {type: Object},
            title: {type: Object},
        }
    },
}
