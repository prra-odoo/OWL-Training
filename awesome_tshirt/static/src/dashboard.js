/** @odoo-module **/

import { Component, useSubEnv, onWillStart, useState,onWillRender} from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout"
import { useService } from "@web/core/utils/hooks";
import { getDefaultConfig } from "@web/views/view";
import { Domain } from "@web/core/domain";
import { Card } from "./card";
import { PieChart } from "./pie_chart";


class AwesomeDashboard extends Component {
    setup() {
        this.action = useService("action");
        this.my = useService("statistics");
        this.datas = useState([]);
        this.description = {
            average_quantity: this.env._t("Average amount of t-shirt by order this month"),
            average_time: this.env._t("Average time for an order to go from 'new' to 'sent' or 'cancelled'"),
            nb_cancelled_orders: this.env._t("Number of cancelled orders this month"),
            nb_new_orders: this.env._t("Number of new orders this month"),
            total_amount: this.env._t("Total amount of new orders this month"),
        }
        useSubEnv({
            config: {
                ...getDefaultConfig(),
                ...this.env.config,
            },
        });
        onWillStart(async () =>{
             this.datas = await this.my.loadStatistics()
        });
    }
    openOrders(domain){
        this.action.doAction(
            {
                name: this.env._t("T-shirt Orders"),
                type: "ir.actions.act_window",
                res_model: "awesome_tshirt.order",
                views: [[false, "list"],[false, "form"]],
                target: "current",
                domain: domain,
        });
    }
    openCustomer(){
        this.action.doAction("base.action_partner_form");
    }
    newOrders(){
        const domain = `[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]`
        this.openOrders(domain)
    }
    cancelledOrders(){
        const domain = `[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d')),('state','=','cancelled')]`
        this.openOrders(domain)
    }
}

AwesomeDashboard.components = { Layout, Card, PieChart };
AwesomeDashboard.template = "awesome_tshirt.clientaction";

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);
