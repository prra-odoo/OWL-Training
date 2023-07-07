/** @odoo-module **/

import { Component, useRef, onMounted, useEffect} from "@odoo/owl";

export class ContactList extends Component {
    flag = false;
    setup(){
        this.edit_name = useRef("name");
        this.edit_email = useRef("email");
        this.upd_btn = useRef("update_btn");
    }

    edit_field(ev){
        this.flag=true;
        this.edit_name.el.contentEditable = true;
        this.edit_email.el.contentEditable = true;
        this.edit_name.el.focus();
        // this.upd_btn.el.style.display="block";
        // console.log(this.upd_btn.el.style);
    }

    update(){
        const upd_data = {name:this.edit_name.el.textContent, email: this.edit_email.el.textContent};
        this.props.upd_list(upd_data,this.props.id);
        window.localStorage.setItem("lastname",upd_data.name);
        let lastname = localStorage.getItem("lastname");
        this.edit_name.el.contentEditable = false;
        this.edit_email.el.contentEditable = false;
        console.log(lastname);
    }
}

ContactList.template = "owl_playground.contactlist";

ContactList.props = {
    id: {type:Number},
    name: {type:String},
    email:{type:String},
    remove_list:{type: Function},
    upd_list : {type: Function},
}
