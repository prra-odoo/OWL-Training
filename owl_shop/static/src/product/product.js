/** @odoo-module **/

import { Component, useState } from "@odoo/owl";

export class Product extends Component {	
        
    addProduct() {
        this.props.addcart(this.props.id)
    }
}
Product.template = 'owl_shop.product';

