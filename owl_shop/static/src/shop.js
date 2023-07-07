/** @odoo-module **/

import { Component } from "@odoo/owl";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { ProductList } from "./productlist/productlist";

export class Shop extends Component {
    static components = { ProductList, Header, Footer };
}
Shop.template = "owl_shop.shop";
