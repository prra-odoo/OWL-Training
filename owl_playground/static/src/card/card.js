/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
export class Card extends Component {
    static template = "owl_playground.Card";
    clkd(){
        console.log(this.props)
    }
}
Card.props = {
    slots: {
        type: Object,
        shape: {
            default: {type: Object},
            title: { type: Object, optional: true },
        },
    },
};
    