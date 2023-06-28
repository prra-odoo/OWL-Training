/** @odoo-module **/

// import { Component, mount } from "@odoo/owl";
import { Component, xml, onWillRender, onWillStart, onRendered, onMounted, onWillUpdateProps, onWillPatch, onPatched, onWillUnmount, onWillDestroy, onError } from "@odoo/owl";
export class Todo extends Component {
    static template = "owl_playground.Todo";
    setup() {
        onWillUpdateProps(() => {
            // onWillUpdateProps(newProps => {

            console.log("TODO ==> In onWillUpdateProps")
        });
    }

}
Todo.props = {
    todo: {
        type: Object, shape: {

            id: { type: Number },
            description: { type: String },
            done: { type: Boolean },
            op: { type: Number, optional: true }
        },
    },
    togglestate: { type: Function },
    removeTodo: { type: Function },
}
