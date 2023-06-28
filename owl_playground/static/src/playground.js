/** @odoo-module **/
import { Card } from "./card/card";
import { Counter } from "./counter/counter";
// import { Todo } from "./todo/todo";]
import { TodoList } from "./todo_list/TodoList";


import { Component,onWillRender,onWillStart,onMounted,onWillUpdateProps,onWillPatch,onPatched,onRendered,onWillUnmount,onWillDestroy,onError} from "@odoo/owl";

export class Playground extends Component {
    static template = "owl_playground.playground";
    static components={Counter,TodoList,Card};

    // setup() {
    //     this.todolist=[{ id:3, description:"Buy milk", done:false},
    //     {id:4, description:"Buy Chocolate", done:false},
    //     {id:5, description:"Buy Cake", done:false}
    // ]
    // }

    setup(){
        onWillRender(()=>{
            console.log('will render')
        });
        onWillStart(()=>{
            console.log('will Start')
        });
        onMounted(()=>{
            console.log('will Mounted')
        });
        onWillUpdateProps((newProps, oldProps) => {
            console.log("Will update props");
            console.log("New props:", newProps);
            console.log("Old props:", oldProps);
          });
        onWillPatch(()=>{
            console.log('Will Patch')
        });
        onPatched(()=>{
            console.log('Update Props')
        });
        onRendered(()=>{
            console.log('Rendered')
        });
        onWillUnmount(()=>{
            console.log('Unamount')
        });
        onWillDestroy(()=>{
            console.log('Destroy')
        });
        onError((ev)=>{
            console.log(ev)
        });
        // this.state = useState({
        //     display: true
        // });
    
    }
    show(){
        this.state.display = true;
    }
    hide(){
        this.state.display = false;
    }

        
    };

