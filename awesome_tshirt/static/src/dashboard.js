/** @odoo-module **/

import { Component ,onWillStart, useSubEnv } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { getDefaultConfig } from "@web/views/view";
import { useService } from "@web/core/utils/hooks";
import { Domain } from "@web/core/domain";
import { Card } from "./card/card"; 
import  { PieChart } from "./piechart/piechart";


class AwesomeDashboard extends Component {
    setup() {

        this.action = useService("action");
        this.tshirt_service = useService("tshirtservice");
        useSubEnv({
            config: {
                ...getDefaultConfig(),
                ...this.env.config,
            },
        });
        onWillStart(async () => {
            this.result = await this.tshirt_service.loadStatistics();
        })

        this.statistics = {
            average_quantity: "Average amount of t-shirt by Order this month",
            average_time: "Average time for an order to go from 'new' to 'sent' or 'cancelled'",
            nb_cancelled_orders : "Number Of cancelled Orders this month",
            nb_new_orders: "Number of order this month",
            orders_by_size :"Number Of New Orders Size",
            total_amount : "Total amount of New Orders this month",
        }
        
        
    }
    Customer(){
    
        this.action.doAction("base.action_partner_form");
    }
    Orders(domain){
        this.action.doAction({
            res_model: 'awesome_tshirt.order',
            name: this.env._t('Last 7 days'),
            type: 'ir.actions.act_window',
            domain: new Domain(domain).toList(),
            views: [
                [false, "list"],
                [false, "form"],
            ],
        })
    }
    NewOrders() {
        const domain =
            "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]";
        this.Orders(domain);
    }
    cancelOrders() {
        const domain =
            "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d')), ('state','=', 'cancelled')]";
        this.Orders(domain);
    }
    openSizeOrders(size) {
        const domain = `[('size','=', '${size}'), ('state', '!=', 'cancelled')]`;
        this.Orders(domain);
    }
}

AwesomeDashboard.components = {Layout , Card,PieChart};
AwesomeDashboard.template = "awesome_tshirt.clientaction";

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);
