/** @odoo-module **/
import { Component, useState ,PropTypes,useRef, onMounted} from "@odoo/owl";
import { Counter } from "./Counter/counter";
import { Todolist } from "./TodoList/Todolist";
import { Card } from "./Card/card";


export class Playground extends Component {
    
    static template = "owl_playground.playground";

    static components = { Counter,Todolist,Card} ;

   
    // static todos

    setup(){
        // this.todos = useState([{ id: 3, description: "buy milk", done: true },{ id: 4, description: "buy tea", done: true }]);
        
    }
    
}


// export class Counter extends Component {
//     static template = "owl_playground.counter";

//     state = useState({ value: 0 });

//     increment() {
//         this.state.value++;
//     }
// }
