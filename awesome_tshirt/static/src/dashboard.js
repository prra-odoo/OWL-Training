/** @odoo-module **/

import { Component, useSubEnv, onWillStart} from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { getDefaultConfig } from "@web/views/view";
import { useService } from "@web/core/utils/hooks";
import { Domain } from "@web/core/domain";
import { Card } from "./card/card";
import { MyService } from "./services";
import { PieChart } from "./pie_chart/pie_chart";


class AwesomeDashboard extends Component {
    setup(){
        this.action = useService("action");
        this.rpc = useService("rpc");
        this.myservice = useService("MyService");

        useSubEnv({
            config: {
                ...getDefaultConfig(),
                ...this.env.config,
            },
        });

        this.statTitle = {
            average_quantity: this.env._t("Average amount of t-shirt by order this month"),
            average_time: this.env._t("Average time for an order to go from 'new' to 'sent' or 'cancelled'"),
            nb_cancelled_orders: this.env._t("Number of cancelled orders this month"),
            nb_new_orders: this.env._t("Number of new orders this month"),
            total_amount: this.env._t("Total amount of new orders this month"),
            
        };

        onWillStart(async ()=> {
            // debugger;
            // this.result = await this.rpc("/awesome_tshirt/statistics");
            this.result = await this.myservice.loadStatistics();
            console.log(this.result);
        });

        this.display = {
            controlPanel: { "top-right": false, "bottom-right": false }, 
        };

    }
    openSettings() {
        this.action.doAction("base_setup.action_general_configuration");
    }

    openOrders(title,domain){
        this.action.doAction({
            type: 'ir.actions.act_window',
            name: title,
            res_model: 'awesome_tshirt.order',
            views: [[false, 'kanban'], [false, 'form']],
            domain: new Domain(domain).toList(),
        });
    }

    orders() {
        const domain = "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]";
        this.openOrders('orders',domain);
    }

    cancelled_order(){
        const domain = "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d')), ('state','=', 'cancelled')]";
        this.openOrders('cancelled orders',domain);
    }
}

AwesomeDashboard.components = {Layout, Card, PieChart};
AwesomeDashboard.template = "awesome_tshirt.clientaction";

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);



// const myService = {
//     dependencies: ["notification"],
//     start(env, { notification }) {
//         let counter = 1;
//         setInterval(() => {
//             notification.add(`Tick Tock ${counter++}`);
//         }, 5000);
//     },
// };
// registry.category("services").add("myService", myService);
