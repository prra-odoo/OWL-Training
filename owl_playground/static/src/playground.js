/** @odoo-module **/

import { Card } from "./card/card";
import { Counter } from "./counter/counter";
import { TodoList } from "./todo_list/todo_list";
import { Component, onWillRender,onWillStart,onMounted,onWillUpdateProps,onWillPatch,onPatched,onRendered,onWillUnmount,onWillDestroy,onError} from "@odoo/owl";

export class Playground extends Component {
    
    static template = "owl_playground.playground";
    static components = {Counter,TodoList,Card};


   setup(){
    onWillRender(()=>{console.log('will render')});
    onWillStart(()=>{console.log('Will start')});
    onMounted(()=>{console.log('will mount')});
    onWillUpdateProps(()=>{console.log('updated props')});
    onWillPatch(()=>(console.log('Will patch')));
    onPatched(()=>{console.log('pached')});
    onRendered(()=>{console.log('rendered')});
    onWillUnmount(()=>{console.log('will unmount')});
    onWillDestroy(()=>{console.log('will destroy')});
    onError((ev)=>{console.log(ev)});
}

   show(){
    this.state.display = true;
   }
   hide(){
    this.state.display = false;
   }

}