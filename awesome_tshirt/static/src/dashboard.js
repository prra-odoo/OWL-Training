/** @odoo-module **/

import { Component, useSubEnv, onWillStart, useEffect, useRef } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout"
import { getDefaultConfig } from "@web/views/view";
import { useService } from "@web/core/utils/hooks";
import { Domain } from "@web/core/domain"
import { Card } from "./Card/Card";
import { loadJS } from "@web/core/assets";
import { getColor } from "@web/views/graph/colors";

class AwesomeDashboard extends Component {
    setup() {
        useSubEnv({
            config: {
                ...getDefaultConfig(),
                ...this.env.config,
            },
        });
        this.canvasRef = useRef("canvas");
        this.action = useService("action");
        this.chart = null;

        this.loadStatistics = useService("statistics");
        onWillStart(async () => {
            loadJS("/web/static/lib/Chart/Chart.js");
            this.val = await this.loadStatistics.result();
            this.color = Object.keys(this.val['orders_by_size']).map((_, index) => {
                return getColor(index);
            });
            console.log(this.color);
        });


        useEffect(() => this.renderChart());

        this.data = {
            average_quantity: this.env._t("Average amount of t-shirt by order this month"),
            average_time: this.env._t("Average time for an order to go from 'new' to 'sent' or 'cancelled'"),
            nb_cancelled_orders: this.env._t("Number of cancelled orders this month"),
            nb_new_orders: this.env._t("Number of new orders this month"),
            total_amount: this.env._t("Total amount of new orders this month")
        }


    }

    renderChart() {
        if (this.chart) {
            this.chart.destroy();
        }
        const ctx = this.canvasRef.el;
        this.chart = new Chart(ctx, {
            type: 'pie',
            data: {

                labels: Object.keys(this.val['orders_by_size']),
                datasets: [{
                    data: Object.values(this.val['orders_by_size']),
                    backgroundColor: this.color,
                }],
            },
            options: {
                onClick: (evt) => {
                    var activePoints = this.chart.getElementsAtEventForMode(evt, 'point', this.chart.options);
                    var firstPoint = activePoints[0];
                    var label = this.chart.data.labels[firstPoint._index];
                    let domain = `[('size','=','${label}'),('state','!=','cancelled')]`;
                    this.orders(domain, 'orders');
                }

            }

        });
    }

    customer() {
        this.action.doAction("base.action_partner_form")
    }

    orders(domain, title) {
        this.action.doAction({
            type: 'ir.actions.act_window',
            name: title,
            res_model: 'awesome_tshirt.order',
            views: [[false, 'tree'], [false, 'form']],
            domain: new Domain(domain).toList(),
        });
    }

    newOrder() {
        let dates = "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]"
        this.orders(dates, "New Orders")
    }

    cancelOrder() {
        let dates = "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d')),('state','=','cancelled')]"
        this.orders(dates, "Cancelled Orders")
    }

}


const myService = {
    dependencies: ["notification"],
    start(env, { notification }) {
        let counter = 1;
        setInterval(() => {
            notification.add(`Tick Tock ${counter++}`);
        }, 5000);
    }
};


AwesomeDashboard.components = { Layout, Card };
AwesomeDashboard.template = "awesome_tshirt.clientaction";

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);

registry.category("services").add("myService", myService);
