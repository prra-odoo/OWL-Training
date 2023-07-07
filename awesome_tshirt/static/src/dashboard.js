/** @odoo-module **/

import { Component,useSubEnv, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { getDefaultConfig } from "@web/views/view";
import { useService } from "@web/core/utils/hooks";
import { Card } from "./card/card";
import { PieChart } from "./pie_chart/pie_chart";

class AwesomeDashboard extends Component {
    setup(){
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
        this.tshirtService = useService("stats");
        this.cardtitle = {
            average_quantity: this.env._t("Average amount of t-shirt by order this month"),
            average_time: this.env._t("Average time for an order to go from 'new' to 'sent' or 'cancelled'"),
            nb_cancelled_orders: this.env._t("Number of cancelled orders this month"),
            nb_new_orders: this.env._t("Number of new orders this month"),
            total_amount: this.env._t("Total amount of new orders this month"),
        };
        onWillStart(async() => {
            this.statistics = await this.tshirtService.loadStatistics();
            // console.log("this",this.statistics);
        })

        const effectService = useService("effect");
        effectService.add({
        type: "rainbow_man", // can be omitted, default type is already "rainbow_man"
        message: "Boom! Added buttons for navigation.",
        });
    }

        openCustomerView() {
            this.action.doAction("base.action_partner_form");
        };

        openOrders(name = this.env._t('Last 7 day orders'), domain = "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]") {
            this.action.doAction({
                type: 'ir.actions.act_window',
                name: name,
                res_model: 'awesome_tshirt.order',
                views: [[false, 'list'], [false, 'form']],
                search_view_id: [false],
                domain: domain,
            });
        }

        cancelledOrders() {
            const domain = "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d')), ('state', '=', 'cancelled')]";
            this.openOrders(this.env._t("Last 7 day cancelled orders"), domain);
        }

        openSizeOrders(size) {
            const domain = `[('size','=', '${size}'), ('state', '!=', 'cancelled')]`;
            this.openOrders(("Orders By Size " + size), domain);
        }

        // const myService = {
        //     dependencies: ["notification"],
        //     start(env, { notification }) {
        //         let counter = 1;
        //         setInterval(() => {
        //             notification.add(`Tick Tock ${counter++}`);
        //         }, 5000);
        //     }
        // };
        // registry.category("services").add("myService", myService);

}

AwesomeDashboard.components = { Layout, Card, PieChart };
AwesomeDashboard.template = "awesome_tshirt.clientaction";

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);
