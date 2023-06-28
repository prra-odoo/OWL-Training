/** @odoo-module **/

import { Component } from "@odoo/owl";

export class Card extends Component {}

Card.template = "owl_playground.Card";

Card.props = {
    slots: {
        type: Object,
        shape: {
            title: { type: Object, optional: true },
            abc: { type: Object, optional: true },
            default: { type: Object }
        }
    }
};