/** @odoo-module **/

import { Component, onWillRender, onWillStart, onMounted, onWillUpdateProps, onWillPatch, onPatched, onRendered, onWillUnmount, onWillDestroy, onError, useState } from "@odoo/owl";
import { useAutofocus } from "../utils";

export class Counter extends Component {

    setup(){
        this.state = useState({ value : localStorage.getItem('cval') ? localStorage.getItem('cval') : 0 });
        useAutofocus("buttonfocus");
        onWillRender(() => {
            console.log('c will render')
        });
        onWillStart(() => {
            console.log('c will start')
        });
        onMounted(() => {
            console.log('c will mount');
        });
        onWillUpdateProps(() => {
            console.log('c update props');
        });
        onWillPatch(() => {
            console.log('c will patch')
        });
        onPatched(() => {
            console.log('c pached')
        });
        onRendered(() => {
            console.log('c rendered')
        });
        onWillUnmount(() => {
            console.log('c will unmount')
        });
        onWillDestroy(() => {
            console.log('c will destroy')
        });
        onError(() => {
            console.log('c will Error')
        });
    }

    increment(){
        localStorage.setItem('cval')
        this.state.value++;
    }
}

Counter.template = "owl_playground.counter";
