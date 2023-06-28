/** @odoo-module **/

import { Component } from "@odoo/owl";
import { Counter } from "./counter/counter";
import { Card } from "./card/card";
import { Todolist } from "./todolist/todolist";

export class Playground extends Component {}

Playground.template = "owl_playground.Playground";
Playground.components = { Counter, Card, Todolist};