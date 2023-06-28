/** @odoo-module **/

import { Component, useState } from "@odoo/owl";

export class Todo extends Component {}

Todo.template = "owl_playground.todo";

Todo.props = {
  id: { type: Number },
  desc: { type: String },
  done: { type: Boolean },
  togglestate: { type: Function },
  removetodo: { type: Function },
};
