/** @odoo-module **/

import { Component } from "@odoo/owl";

export class Card extends Component {
  static template = "owl_playgroud.card";

  static props = {
    slots: {
      type: Object,
      shape: {
        title: { type: Object, optional: true },
        default: { type: Object },
      },
    },
  };
}
