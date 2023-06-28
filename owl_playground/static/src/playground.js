/** @odoo-module **/

import { Component } from "@odoo/owl";
import { Counter } from "./counter";
import { Listtodo } from "./list_todo/list_todo";
import {Card} from "../src/card/card"


export class Playground extends Component {
    static template = "owl_playground.playground";

    static components = { Counter, Listtodo, Card };
    

}
