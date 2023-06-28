/** @odoo-module **/

// import { Component, useState } from "@odoo/owl";
import { Component , useState,xml, onWillRender, onWillStart, onRendered, onMounted, onWillUpdateProps, onWillPatch, onPatched, onWillUnmount, onWillDestroy, onError} from "@odoo/owl";
export class Counter extends Component {
    static template = "owl_playground.Counter";
    
    setup() {
        this.state = useState({ value: localStorage.getItem("cntdata")?localStorage.getItem("cntdata"):0 });
        onWillUpdateProps(newProps => {

          console.log("TODO ==> In onWillUpdateProps")
      });
    } 

    increment() {
      this.state.value++;
      localStorage.setItem("cntdata",this.state.value)
    }
    reset() {
      this.state.value = 0;
      localStorage.setItem("cntdata",this.state.value)
    }
    
  }