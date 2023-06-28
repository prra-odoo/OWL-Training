/** @odoo-module **/

import { Counter } from "./counter/counter";
import { Todolist } from "./todolist/todolist";
import { Card } from "./card/card";
import { Component, onWillRender,useState, onWillStart, onMounted, onWillUpdateProps, onWillPatch, onPatched, onRendered, onWillUnmount, onWillDestroy, onError } from "@odoo/owl";


export class Playground extends Component {

    setup(){
        onWillRender(() => {
            console.log('will render')
        });
        onWillStart(() => {
            console.log('will start')
        });
        onMounted(() => {
            console.log('will mount');
        });
        onWillUpdateProps(() => {
            console.log('update props');
        });
        onWillPatch(() => {
            console.log('will patch')
        });
        onPatched(() => {
            console.log('pached')
        });
        onRendered(() => {
            console.log('rendered')
        });
        onWillUnmount(() => {
            console.log('will unmount')
        });
        onWillDestroy(() => {
            console.log('will destroy')
        });
        onError((ev) => {
            console.log(ev)
        });
        this.state = useState({
            display: true
        })
    }

    show(){
        this.state.display = true;
    }
    hide(){
        this.state.display = false;
    }

}

Playground.components = { Counter, Todolist, Card };
Playground.template = "owl_playground.playground";