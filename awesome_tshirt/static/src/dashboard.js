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
import { loadJS } from "@web/core/assets";

class AwesomeDashboard extends Component {
  setup() {
    useSubEnv({
      config: {
        ...getDefaultConfig(),
        ...this.env.config,
      },
    });

    this.action = useService("action");
    // this.rpc = useService("rpc");
    this.loadservice = useService("loadservice");

    this.keyToString = {
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

    onWillStart(async () => {
      // this.result = await this.rpc("/awesome_tshirt/statistics");
      this.result = await this.loadservice.loadStatistics();
      await loadJS("/web/static/lib/Chart/Chart.js");
      // console.log(this.result);
    });

    useEffect(() => this.renderChart());
    this.canvasRef = useRef("canvas");
    this.chart = null;

    // const myService = {
    //   dependencies: ["notification"],
    //   start(env, { notification }) {
    //     let counter = 1;
    //     setInterval(() => {
    //       notification.add(`Tick Tock ${counter++}`);
    //     }, 5000);
    //   },
    // };
    // registry.category("services").add("myService", myService);
  }

  renderChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    const ctx = this.canvasRef.el;
    this.chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: Object.keys(this.result["orders_by_size"]),
        datasets: [
          {
            data: Object.values(this.result["orders_by_size"]),
            backgroundColor: [
              "#DE3163",
              "#40E0D0",
              "#6495ED",
              "#A6ACAF",
              "#FFD700",
            ],
          },
        ],
      },
      options: {
        onClick:(evt) =>{
            var activePoints = this.chart.getElementsAtEventForMode(evt, 'point', this.chart.options);
            var firstPoint = activePoints[0];
            var label = this.chart.data.labels[firstPoint._index];
            let domain=`[('size','=','${label}'),('state','!=', 'cancelled')]`;
            this.openOrders("Orders",domain);
        }
    }
    });
  }

  openCustomers() {
    this.action.doAction("base.action_partner_form");
  }

  openOrders(title, domain) {
    this.action.doAction({
      type: "ir.actions.act_window",
      name: title,
      res_model: "awesome_tshirt.order",
      domain: new Domain(domain).toList(),
      views: [
        [false, "list"],
        [false, "form"],
      ],
    });
  }

  openLast7DaysOrders() {
    const domain =
      "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]";
    this.openOrders("Last 7 days orders", domain);
  }

  openLast7DaysCancelledOrders() {
    const domain =
      "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d')), ('state','=', 'cancelled')]";
    this.openOrders("Last 7 days cancelled orders", domain);
  }
}

AwesomeDashboard.components = { Layout, Card };
AwesomeDashboard.template = "awesome_tshirt.clientaction";

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);
