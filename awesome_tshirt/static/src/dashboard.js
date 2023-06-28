/** @odoo-module **/

import { Component, useSubEnv, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { getDefaultConfig } from "@web/views/view";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import { Card } from "./card/card";
import { PieChart } from "./pie_chart/pie_chart";

class AwesomeDashboard extends Component {
    setup(){
        this.action = useService("action");
        this.tshirtService = useService("tshirtService");

        useSubEnv({
            config: {
                ...getDefaultConfig(),
                ...this.env.config,
            },
        });

        this.display = {
            controlPanel: { "top-right": false, "bottom-right": false },
        };

        this.title = {
            average_quantity: this.env._t("Average amount of t-shirt by order this month"),
            average_time: this.env._t("Average time for an order to go from 'new' to 'sent' or 'cancelled'"),
            nb_cancelled_orders: this.env._t("Number of cancelled orders this month"),
            nb_new_orders: this.env._t("Number of new orders this month"),
            total_amount: this.env._t("Total amount of new orders this month"),
        }

        onWillStart(async () => {
            this.statistics = await this.tshirtService.loadStatistics();
        });
    }

    openCustomerView(){
        this.action.doAction("base.action_partner_form");
    }

    openOrders(title, domain){
        debugger;
        this.action.doAction({
            type: "ir.actions.act_window",
            name: title,
            res_model: "awesome_tshirt.order",
            domain: domain,
            target: "current",
            views: [
                [false, "list"],
                [false, "form"],
            ],
        });
    }

    openNewOrders(){
        const sevenDaysAgo = moment().subtract(7, "days").format("YYYY-MM-DD");
        const domain = [["create_date", ">=", sevenDaysAgo]];
        this.openOrders(this.env._t("Last 7 days orders", domain))
    }

    openCancelledOrders(){
        const sevenDaysAgo = moment().subtract(7, "days").format("YYYY-MM-DD");
        const domain = [["create_date", ">=", sevenDaysAgo],["state", "=", "cancelled"]];
        this.openOrders(this.env._t("Last 7 days cancelled orders", domain))
    }
}

AwesomeDashboard.components = { Layout, Card, PieChart };
AwesomeDashboard.template = "awesome_tshirt.clientaction";

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);
