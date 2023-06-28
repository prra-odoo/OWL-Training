/** @odoo-module **/

import { Component , useSubEnv , onWillStart} from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { getDefaultConfig } from "@web/views/view";
import { useService } from "@web/core/utils/hooks";
import { Domain} from "@web/core/domain";
import { Card } from "./card/card";
import { Piechart } from "./piechart/piechart";

class AwesomeDashboard extends Component {
    setup(){
        this.action = useService("action");
        this.tshirtService = useService("tshirtService");

        onWillStart(async () => {
            this.statistics = await this.tshirtService.loadStatistics();
            console.log(this.statistics);
        });

        useSubEnv({
            config: {
                ...getDefaultConfig(),
                ...this.env.config,
            },
        });

        this.display = {
            controlPanel: { "top-right": false, "bottom-right": false },
        };

        this.keyvalue = {
            nb_new_orders : this.env._t("New Orders"),
            total_amount : this.env._t("Total amount"),
            average_quantity: this.env._t("Average amount of t-shirt"),
            nb_cancelled_orders : this.env._t("Cancelled orders"),
            average_time : this.env._t("Average time"),
        }
    }
    openCustomer(){
        this.action.doAction("base.action_partner_form");
    }
    newOrders(){
        const domain = "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]";        
        this.openOrders(this.env._t("orders of last 7  days"),domain)
    }
    cancelOrders(){
        const domain = "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d')),('state','=', 'cancelled')]]";        
        this.openOrders(this.env._t("Cancelled orders in last 7 days"),domain)
        }
    openOrders(name ,domain){
        this.action.doAction({
            type : 'ir.actions.act_window',
            name : name,
            res_model : 'awesome_tshirt.order',
            views: [[false, 'list'], [false, 'form']],
            domain : new Domain(domain).toList()
        })
    }
    openSizeOrders(size) {
        const domain = `[('size','=', '${size}'), ('state', '!=', 'cancelled')]`;
        this.openOrders(("Orders By Size " + size), domain);
    }
}

AwesomeDashboard.components = { Layout , Card , Piechart};
AwesomeDashboard.template = "awesome_tshirt.clientaction";

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);
