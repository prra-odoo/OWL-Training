/** @odoo-module **/

import { Component, onWillStart } from "@odoo/owl";
import { Counter } from "./counter/counter";
import { Todolist } from "./todolist/todolist";
import { Card } from "./card/card";

export class Playground extends Component { }

Playground.template = "owl_playground.playground";

Playground.components = { Counter, Todolist, Card };
