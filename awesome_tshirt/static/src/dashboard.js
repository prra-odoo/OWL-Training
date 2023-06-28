/** @odoo-module **/

import {
    Component,
    useSubEnv,
    onWillStart,
    useRef,
    useEffect,
    } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { getDefaultConfig } from "@web/views/view";
import { useService } from "@web/core/utils/hooks";
import { Domain } from "@web/core/domain";
import { Card } from "./Card/card";
import { loadJS } from "@web/core/assets";


class AwesomeDashboard extends Component {
    static template = "awesome_tshirt.clientaction";
    static components = {Layout,Card};

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

        this.newService = useService("newService");

        onWillStart(async () => {
            // this.statistics = await this.rpc("/awesome_tshirt/statistics");
            this.statistics = await this.newService.loadStatistics();
            await loadJS("/web/static/lib/Chart/Chart.js");
        });

        useEffect(() => this.renderChart());

        this.keyToString = {
            nb_new_orders: this.env._t("Number of new orders this month"),
            total_amount: this.env._t("Total amount of new orders this month"),
            average_quantity: this.env._t("Average amount of t-shirt by order this month"),
            nb_cancelled_orders: this.env._t("Number of cancelled orders this month"),
            average_time: this.env._t("Average time for an order to go from 'new' to 'sent' or 'cancelled'"),
        };

        this.canvasRef = useRef("canvas");
        this.chart = null;

    }

    renderChart() {
        if (this.chart) {
            this.chart.destroy();
        }
        const config = this.canvasRef.el;
        this.chart = new Chart(config, {
            type: "pie",
            data: {
                labels: Object.keys(this.statistics["orders_by_size"]),
                datasets: [
                {
                    data: Object.values(this.statistics["orders_by_size"]),
                    backgroundColor: [
                    "#E91E63", //pink
                    "#1ABC9C", // green
                    "#FFD700", // golden
                    "#2ECC71", //
                    "#FFD700", // yellow
                    ],
                borderColor: "black",
                },
                ],
            },
            options: {
                onClick: (e) => {
                var activePoints = this.chart.getElementsAtEventForMode(
                    e,
                    "point",
                    this.chart.options
                );

                if (activePoints.length > 0) {
                    var firstPoint = activePoints[0];
                    var label = this.chart.data.labels[firstPoint._index];
                    // console.log("lab", label);
                    let domain = [('size', '=', '${label}')];
                    // console.log(domain);
                    this.openLast7DaysOrders(domain, "New Orders");
                }
                },
            },
            });
        }
    openCustomerView() {
        this.action.doAction("base.action_partner_form");
    }

    openLast7DaysOrders() {
        let date = "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]";
        this.action.doAction({
            type: "ir.actions.act_window",
            name: this.env._t("New Orders"),
            res_model: "awesome_tshirt.order",
            views: [
                [false, "list"],
            ],
            domain: new Domain(date).toList(),
        });
    }
    openLast7DaysCancelledOrders() {
        let date1 = "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d')),('state','=','cancelled')]";
        this.action.doAction({
            type: "ir.actions.act_window",
            name: this.env._t("Cancelled Orders"),
            res_model: "awesome_tshirt.order",
            views: [[false, "list"]],
            domain: new Domain(date1).toList(),
        });
        }
    
}


registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);


