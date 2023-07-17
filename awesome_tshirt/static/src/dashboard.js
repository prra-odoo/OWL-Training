/** @odoo-module **/

import { Component, useSubEnv, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { getDefaultConfig } from "@web/views/view";
import { useService } from "@web/core/utils/hooks";
import { Domain } from "@web/core/domain";
import { Card } from "./card/card";
import {Piechart} from "./piechart/piechart"

export class AwesomeDashboard extends Component {
    setup() {
        useSubEnv({
            config: {
                ...getDefaultConfig(),
                ...this.env.config,
            },
        }); 
        // this.display = {
        //     controlPanel: { "top-right": false, "bottom-right": false },
        // };
        this.action = useService("action");
        this.tshirtService = useService("tshirtService");
        this.value = {
            average_quantity: "Average amount of t-shirt by order this month",
            average_time: "Average time for an order to go from 'new' to 'sent' or 'cancelled'",
            nb_cancelled_orders: "Number of cancelled orders this month",
            nb_new_orders: "Number of new orders this month",
            total_amount: "Total amount of new orders this month",
        };
        onWillStart(async() =>{
            this.statistics = await this.tshirtService.loadStatistics();
            console.log("ths",this.statistics);
        });
    }
    openSettings() {
        this.action.doAction("base_setup.action_general_configuration");
    }
    openCustomer() {
        this.action.doAction("base.action_partner_form");
    }
    openOrders(title, domain){
        // this.action.doAction("awesome_tshirt.orders")
        this.action.doAction({
            type: "ir.actions.act_window",
            name: title,
            res_model: "awesome_tshirt.order",
            domain: new Domain(domain).toList(),
            views: [
                [,"list"],
                [,"form"],
                [,"kanban"],
            ],
        });
    }
    openNewOrders(){
        const domain =
            "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]";
        this.openOrders("Last 7 days orders", domain);
    }
    openCancelledOrder(){
        const domain = "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d')) , ('state','=','cancelled') ]";
        this.openOrders("cancelled order",domain);
    }
    
}
AwesomeDashboard.components = { Layout, Card, Piechart};
AwesomeDashboard.template = "awesome_tshirt.clientaction";

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);
