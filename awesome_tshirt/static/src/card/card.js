/** @odoo-module **/

import { Component } from "@odoo/owl";
// const { Component } = owl;  

export class Card extends Component{
    static template = "awesome_tshirt.Card";

    static props = {
        slots: {
            type: Object,
            shape: {
                title: { type: Object},
                default: { type: Object},
            },
        },
        className: {
            type: String,
            optional: true,
        },
    };
}