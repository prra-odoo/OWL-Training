/** @odoo-module **/

import {Component} from "@odoo/owl";

export class Breakfast extends Component{
    static template = "owl_playground.breakfast";
    static props = {
        id : {type: Number},
        description : {type: String},
        done: {type: Boolean},
    };
    // setup(){
    // this.menulist_break = useState([{id: 1, description: " TEA", done: false},
    //     {id: 2, description: " COFFE", done: true},
    //     {id: 3, description: " POHA", done: false}]);

    // }
    
}