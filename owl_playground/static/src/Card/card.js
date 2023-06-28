/** @odoo-module **/

import { Component } from "@odoo/owl";


export class Card extends Component {
    static template = "owl_playground.card";
    static props = {
        slots: {
                default: Object,
                title: { type: Object, optional: true },
        },
    };
}
