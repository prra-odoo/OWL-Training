/** @odoo-module **/

import { Component, useSubEnv, onWillStart } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { Domain } from "@web/core/domain";
import { getDefaultConfig } from "@web/views/view";
import { Card } from "./card/card";
import { PieChart } from "./chart/chart";

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

        this.customers = useService("action");
        this.openorderservice = useService("action");
        this.awesomeservice = useService("awesomeservice");

        onWillStart(async () => {
            this.output = await this.awesomeservice.loadStatistics();
        });

        this.statistics = {
            average_quantity: this.env._t("Average amount of t-shirt by order this month"),
            average_time: this.env._t("Average time for an order to go from ‘new’ to ‘sent’ or ‘cancelled’"),
            nb_cancelled_orders: this.env._t("Number of cancelled orders this month"),
            nb_new_orders: this.env._t("Number of new orders this month"),
            total_amount: this.env._t("Total amount of new orders this month"),
        }

    }
    opencustomers() {
        this.customers.doAction("base.action_partner_form")
    }

    openorder(title, domain) {
        this.openorderservice.doAction({
            type: 'ir.actions.act_window',
            name: this.env._t(title),
            res_model: 'awesome_tshirt.order',
            views: [[false, 'list'], [false, 'form'], [false, 'kanban']],
            domain: domain,
        })
    }
    neworder() {
        const domain = new Domain("[('create_date', '>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]").toList();
        this.openorder("New Orders", domain);
    }
    cancleorder() {
        const domain = new Domain("[('create_date', '>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d')), ('state','=','cancelled')]").toList();
        this.openorder("Cancelled Orders", domain);
    }
    sizeview(size){
        const title = this.env._t("Orders of " + size + " size");
        const domain = `[('size','=', '${size}'),('state','!=','cancelled')]`;
        this.openorder(title, domain);
    }

}

const myService = {
    dependencies: ["notification"],
    start(env, { notification }) {
        let counter = 1;
        setInterval(() => {
            notification.add(`Tick Tock ${counter++}`);
        }, 2000);
    }
};

AwesomeDashboard.components = { Layout, Card, PieChart };
AwesomeDashboard.template = "awesome_tshirt.clientaction";

// registry.category("services").add("myService", myService);
registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);
