/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
export class Card extends Component {

}

Card.template = "owl_playground.card";
Card.props = {
    slots: {
        type: Object,
        shape: {
            default: Object,
            title: { type: Object, optional: true },
        },
    },
};
