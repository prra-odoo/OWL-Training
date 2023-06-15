/** @odoo-module **/

import { Component} from "@odoo/owl";


export class Card extends Component{
    static template ="awesome_tshirt.Card";
        
    static props = {
        slots:{
            type: Object,
            shape: {
             title:{type: Object,optional:true},
             content:{type: Object},
                }
            }
            
        }
}