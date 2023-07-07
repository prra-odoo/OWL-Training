/** @odoo-module **/

import { Component, useState, useRef } from "@odoo/owl";
import { Product } from "../product/product";

export class ProductList extends Component {
	static components = { Product }

	setup() {
		this.productlist = useState([]);
		this.cartlist = useState([]);
		this.quntity = useState({ quant: 0 });
		this.nextId = 0;
		this.inputRef = useRef("input_price");
		this.inputName = useRef("input_name");
	}

	addProducts(ev) {
        this.productlist.push({ id: this.nextId++, product_name: this.inputName.el.value, product_price: this.inputRef.el.value});
        ev.target.value = "";
        console.log(this.productlist)
    }

    AddQuantity() {
    	this.quntity.quant++;		
    }

    SubQuantity() {
    	this.quntity.quant--;	
    }

    addTocart(propductId) {
        const product = this.productlist.find((product) => product.id === propductId);
        this.cartlist.push(product);
    }
}

ProductList.template = "owl_shop.productlist"