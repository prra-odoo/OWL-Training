/** @odoo-module **/

import {
	Component,
	useSubEnv,
	onWillStart,
	useEffect,
	useRef,
} from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { getDefaultConfig } from "@web/views/view";
import { useService } from "@web/core/utils/hooks";
import { Domain } from "@web/core/domain";
import { Card } from "./card/card";
import { getColor } from "@web/views/graph/colors";
import { loadJS } from "@web/core/assets";
// import { getRelativePosition } from "chart.js/helpers";
// import { loadStatistics } from "./statastics";
class AwesomeDashboard extends Component {
	setup() {
		useSubEnv({
			config: {
				...getDefaultConfig(),
				...this.env.config,
			},
		});
		this.data = {
			average_quantity: this.env._t(
				"Average amount of t-shirt by order this month"
			),
			average_time: this.env._t(
				"Average time for an order to go from 'new' to 'sent' or 'cancelled'"
			),
			nb_cancelled_orders: this.env._t("Number of cancelled orders this month"),
			nb_new_orders: this.env._t("Number of new orders this month"),
			total_amount: this.env._t("Total amount of new orders this month"),
		};
		// this.rpc = useService("rpc");
		this.canvasRef = useRef("canvas");
		this.chart = null;
		this.loadStatistics = useService("loadStatistics");
		// debugger;
		onWillStart(async () => {
			this.stats = await this.loadStatistics.result();
			await loadJS("/web/static/lib/Chart/Chart.js");
			// debugger;
			this.color = Object.keys("orders_by_size").map((_, index) => {
				return getColor(index);
			});
			// console.log(this.stats["orders_by_size"]);
		});

		useEffect(() => {
			this.renderChart();
		});
		this.action = useService("action");
	}

	renderChart() {
		if (this.chart) {
			this.chart.destroy();
		}

		const ctx = this.canvasRef.el;
		this.chart = new Chart(ctx, {
			type: "pie",
			data: {
				labels: Object.keys(this.stats["orders_by_size"]),
				datasets: [
					{
						data: Object.values(this.stats["orders_by_size"]),
						backgroundColor: this.color,
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
					var firstPoint = activePoints[0];
					var label = this.chart.data.labels[firstPoint._index];
					// var value =
					// 	this.chart.data.datasets[firstPoint._datasetIndex].data[
					// 		firstPoint._index
					// 	];
					// let data = Object.keys(this.stats["orders_by_size"]);
					console.log(label);
					let domain = `[('size', '=', '${label}'),('state','!=','cancelled')]`;
					this.helper("Orders by size", domain);
				},
			},
		});
	}

	customer() {
		this.action.doAction("base.action_partner_form");
	}
	helper(title, domain) {
		this.action.doAction({
			type: "ir.actions.act_window",
			name: this.env._t(title),
			res_model: "awesome_tshirt.order",
			views: [
				[false, "tree"],
				[false, "form"],
			],
			domain: new Domain(domain).toList(),
		});
	}
	new_orders() {
		let domain =
			"[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]";
		this.helper("New Orders", domain);
	}
	cancelled_orders() {
		let domain =
			"[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d')),('state','=','cancelled')]";
		this.helper("Cancelled Orders", domain);
	}
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
AwesomeDashboard.components = { Layout, Card };
AwesomeDashboard.template = "awesome_tshirt.clientaction";

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);
