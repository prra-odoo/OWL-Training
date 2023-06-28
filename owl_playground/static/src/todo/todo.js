/** @odoo-module **/

import { Component, useState } from "@odoo/owl";

export class Todo extends Component {

  static template = "owl_playground.todo";
  
  static props = {
    id: { type: Number },
    description: { type: String },
    done: { type: Boolean },
    toggleState: { type: Function },
    removeTodo: { type: Function},
  }

  onClick(ev) {
    this.props.toggleState(this.props.id);
  }

  onRemove(ev){
    // console.log("-->",this.props.id)
    this.props.removeTodo(this.props.id )
  }
}
