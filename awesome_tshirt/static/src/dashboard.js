/** @odoo-module **/

import { Component, useSubEnv, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { getDefaultConfig } from "@web/views/view";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import { Card } from "./card/card";
import { PieChart } from "./pie_chart/pie_chart";
import { sprintf } from "@web/core/utils/strings";

class AwesomeDashboard extends Component {
    setup() {
        useSubEnv({
            config: {
                ...getDefaultConfig(),
                ...this.env.config,
            },
        });
        this.action = useService("action");

        this.awesomeTshirtService = useService("awesomeTshirtService");

        onWillStart(async () => {
            this.result = await this.awesomeTshirtService.loadStatistics();
            console.log(this.result)
        });

        this.keyvalue = {
            nb_new_orders : this.env._t("Number of new orders this month"),
            total_amount : this.env._t("Total amount of new orders this month"),
            average_quantity: this.env._t("Average amount of t-shirt by order this month"),
            nb_cancelled_orders : this.env._t("Number of cancelled orders this month"),
            average_time : this.env._t("Average time for an order to go from 'new' to 'sent' or 'cancelled'"),
        }
    }
    openCustomers() {
        this.action.doAction("base.action_partner_form");
    }

    openOrders(title, domain){
        this.action.doAction({
            name: title,
            type: 'ir.actions.act_window',
            res_model: "awesome_tshirt.order",
            views: [[false, 'list'], [false, 'form']],
            domain: domain
        });
    }

    newOrders(){
        const domain = "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]";
        this.openOrders(this.env._t("New Orders", domain));
    }

    cancelledOrders(){
        const domain = "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d')), ('state', '=', 'cancelled')]";
        this.openOrders(this.env._t("Cancelled Orders", domain));
    }
    openFilteredBySizeOrders(size) {
        const title = sprintf(this.env._t("Filtered orders by %s size"), size);
        const domain = `[('size','=', '${size}')]`;
        this.openOrders(title, domain);
    }
}

AwesomeDashboard.components = { Layout, Card, PieChart };
AwesomeDashboard.template = "awesome_tshirt.clientaction";

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);
