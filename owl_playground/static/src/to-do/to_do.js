/** @odoo-module **/

import { Component, onWillUpdateProps } from "@odoo/owl";

export class Todo extends Component {
    static template = "owl_playground.todo";

        // onRemove() {
        //     this.props.removeTodo(this.props.id);
        // }
        
        setup() {
            onWillUpdateProps(() => {
                console.log("onWillUpdateProps")
              });
        }

      

    static props = {
        id: {type: Number},
        description: {type: String},
        done: {type: Boolean},
        togglestate:{type :Function},
        removeTodo : {type :Function}

    }
  
}

