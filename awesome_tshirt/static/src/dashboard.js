/** @odoo-module **/

import { Component, useSubEnv, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { getDefaultConfig } from "@web/views/view";
import { useService } from "@web/core/utils/hooks";
import { Domain } from "@web/core/domain";
import { Card } from "./card/card";
import { PieChart } from "./pie_chart/pie_chart";
import { _t } from "@web/core/l10n/translation";




class AwesomeDashboard extends Component {
    setup() {
        useSubEnv({
            config: {
                ...getDefaultConfig(),
                ...this.env.config,
            },
        });
        this.action = useService("action");
        // this.rpc = useService("rpc");
        this.newservice = useService("newService");
    
        this.display = {
            controlPanel: { "top-right": false, "bottom-right": false },
        };

        this.Details = {
            average_quantity: (_t("Average quantity")),
            average_time: (_t("Average time")),
            nb_cancelled_orders: (_t("Number of cancelled orders")),
            nb_new_orders: (_t("Number of new orders")),
            total_amount: (_t("Total amount of new orders")),

        };

        onWillStart(async () => {
            this.statistics = await this.newservice.loadStatistics();
            // this.statistics = await this.rpc("/awesome_tshirt/statistics");
            // console.log(this.statistics);
        });
    }

    openCustomerView() {
        this.action.doAction("base.action_partner_form");
    }

    newOrdersView(title, domain) {
        // const domain = "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]"
        this.action.doAction({
            type: "ir.actions.act_window",
            res_model: "awesome_tshirt.order",
            name : title,
            views: [[false, "list"], [false, "form"]],
            domain : new Domain(domain).toList(),
            // domain : [('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]
        })
    }
    openOrders(){
        const domain = "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]"
        this.newOrdersView(domain);
    }
    cancelledOrders(){
        const domain = "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d')), ('state','=', 'cancelled')]"
        this.newOrdersView(domain);
    }
    openBySizeOrders(size) {
        const title = this.env._t("Filtered orders by size");
        const domain = `[('size','=', '${size}')]`;
        this.newOrdersView(title, domain);
    }

}

AwesomeDashboard.components = { Layout, Card, PieChart };
AwesomeDashboard.template = "awesome_tshirt.clientaction";

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);
