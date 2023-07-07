/** @odoo-module **/

import { Component, useState} from "@odoo/owl";

export class ContactForm extends Component {
    setup(){   
        this.name= "";
        this.email= "";
    }


    submit_form(e){
        e.preventDefault();
        console.log(this.name, this.email);
        const form_data = {name:this.name,email:this.email};
        this.props.addlist(form_data);
    }
}
ContactForm.template = "owl_playground.contactForm";
