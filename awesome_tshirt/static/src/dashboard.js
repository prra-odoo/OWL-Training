/** @odoo-module **/

import { Component, useSubEnv, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { getDefaultConfig } from "@web/views/view";
import { useService } from "@web/core/utils/hooks";
import { Domain } from "@web/core/domain";
import { Card } from "./card/card";
import { PieChart } from "./piechart/piechart";

class AwesomeDashboard extends Component {
    setup() {

        useSubEnv({
            config: {
                ...getDefaultConfig(),
                ...this.env.config,
            },
        });

        this.display = {
            controlPanel: { "top-right": false, "bottom-right": false },
        };

        this.action = useService("action");
        this.rpc = useService("rpc");
        this.statisticsService = useService("statisticsService");
        this.cardtitle = {
            average_quantity: this.env._t("Average amount of t-shirt by order this month"),
            average_time: this.env._t("Average time for an order to go from 'new' to 'sent' or 'cancelled'"),
            nb_cancelled_orders: this.env._t("Number of cancelled orders this month"),
            nb_new_orders: this.env._t("Number of new orders this month"),
            total_amount: this.env._t("Total amount of new orders this month"),
            orders_by_size : this.env._t("Shirt orders by size"),
        };

        onWillStart(async () => {
            this.response = await this.statisticsService.loadStatistics();
        })
    }

    openSettings() {
        this.action.doAction("base.action_partner_form");
    }

    openOrders (title, domain) {
        this.action.doAction({
            type: 'ir.actions.act_window',
            name: this.env._t(title),
            res_model: 'awesome_tshirt.order',
            views: [[false, 'list']],
            search_view_id: [false],
            domain: new Domain(domain).toList(),
        });
    }

    newOrders() {
        const domain = "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]";
        this.openOrders(this.env._t('New Orders in last 7 days'), domain);
    }

    cancelledOrders () {
        const domain = "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d')), ('state', '=', 'cancelled')]";
        this.openOrders(this.env._t('Cancelled Orders in last 7 days'), domain);
    }

    openOrdersBySize(size) {
        const domain = `[('size', '=', '${size}')]`;
        this.openOrders(this.env._t("Orders of perticular size"), domain)
    }
}
AwesomeDashboard.components = { Layout, Card, PieChart };
AwesomeDashboard.template = "awesome_tshirt.awesome_dashboard";

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);
