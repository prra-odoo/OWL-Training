/** @odoo-module **/

import { Component } from "@odoo/owl";
export class Card extends Component {
    static template = "owl_playground.card";
    setup(){
    }
    static props = {
        slots:{
            type:Object,
            shape:{
                default:Object,
                image:{type:Object,optional:true},
                title:{type:Object,optional:true},
                content:{type:Object}
            }
        }
    }
    
}
