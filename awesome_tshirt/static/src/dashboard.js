/** @odoo-module **/

import { Component, useSubEnv, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { getDefaultConfig } from "@web/views/view";
import { useService } from "@web/core/utils/hooks";
import { Domain } from "@web/core/domain";
import { Card } from "./card/card";
import { PieChart } from "./pie_chart/pie_chart";

class AwesomeDashboard extends Component {
	setup() {
        useSubEnv({
            config: {
                ...getDefaultConfig(),
                ...this.env.config,
            },
        });
        this.action = useService("action");
        this.rpc = useService("rpc");
        this.statistics = useService("statistics");
        this.orderValue = {
            average_quantity:this.env._t("Average Quantity"),
            average_time:this.env._t("Average Time"),
            nb_cancelled_orders:this.env._t("Cancell Order"),
            nb_new_orders:this.env._t("New Order"),
            orders_by_size:this.env._t("Order Size"),
            total_amount:this.env._t("Total Amount"),
        };

        onWillStart(async () => {
            this.order = await this.statistics.loadStatistics();
        });
    }

    openCustomerView() {
        this.action.doAction("base.action_partner_form");
    }

    openOrderView(title,domain) {
        this.action.doAction({
            type: "ir.actions.act_window",
            name: title,
            res_model: "awesome_tshirt.order",
            domain: new Domain(domain).toList(),
            views:[[false, "list"]],
        });
    }
    openCreateLast7Day() {
        const domain = "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]";
        const title = this.env._t("Order by last 7 days")
        this.openOrderView(title,domain);
    }
    openCancellLast7Day() {
        const domain = "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d')), ('state','=','cancelled')]";
        const title = this.env._t("Order cancelled last 7 days")
        this.openOrderView(title,domain);
    }
    openSizeOrders(size) {
        const domain = `[('size','=', '${size}')]`;
        const title = this.env._t("filterd orders by size");
        this.openOrderView(title,domain);
    }
}

AwesomeDashboard.components = { Layout, Card, PieChart};
AwesomeDashboard.template = "awesome_tshirt.clientaction";

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);
