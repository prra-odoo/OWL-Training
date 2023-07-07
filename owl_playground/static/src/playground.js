/** @odoo-module **/

import { Component } from "@odoo/owl";
import { AddContact } from "./addcontact/addcontact";

export class Playground extends Component {
}

Playground.template = "owl_playground.Playground";
Playground.components = {AddContact};
