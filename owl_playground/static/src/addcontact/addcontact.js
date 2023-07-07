/** @odoo-module **/

import { Component, useState} from "@odoo/owl";
import { ContactList } from "../contactList/contactlist";
import { ContactForm } from "../contactform/contactform";

export class AddContact extends Component {
    setup(){
        // this.contacts = useState({ abc: [{
        //     id : 1,
        //     name : "Default",
        //     email : "default@gmail.com",
        // },{
        //     id : 2,
        //     name : "Demo2",
        //     email : "demo2@gmail.com",
        // }]});
        // this.uid = useState({value:0});
        this.uid = 1;
        this.contacts = useState([{
                id : 1,
                name : "Demo2",
                email : "demo2@gmail.com"},]);
    }

    addList(add){
        // debugger;
        console.log(add);
        this.contacts.push({id: ++this.uid, name:add.name, email:add.email});
    }

    remove_list(remv_lst){
        const index = this.contacts.findIndex((contact)=>{ return contact.id==remv_lst});
        console.log(index);
        this.contacts.splice(index,1);
    }

    upd_list(upd_data,id){

        const index = this.contacts.findIndex((list)=>{
            return list.id == id;
        });
        this.contacts[index].name= upd_data.name;
        this.contacts[index].email= upd_data.email;
        console.log(this.contacts);
    }
}

AddContact.template = "owl_playground.addContact";
AddContact.components = {ContactList, ContactForm};