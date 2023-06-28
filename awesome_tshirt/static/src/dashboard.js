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

    this.display = {
      controlPanel: { "top-right": false, "bottom-right": false },
    };

    this.action = useService("action");

    this.rpc = useService("rpc");
    this.demoservice = useService("demoservice");

    this.keyToString = {
      nb_new_orders: this.env._t("Number of new orders this month"),
      total_amount: this.env._t("Total amount of new orders this month"),
      average_quantity: this.env._t("Average amount of t-shirt by order this month"),
      nb_cancelled_orders: this.env._t("Number of cancelled orders this month"),
      average_time:
        this.env._t("Average time for an order to go from 'new' to 'sent' or 'cancelled'"),
      // time : "time"
    };

    this.canvasRef = useRef("canvas");
    this.chart = null;

    onWillStart(async () => {
      // this.statistics = await this.rpc("/awesome_tshirt/statistics");
      this.stats = await this.demoservice.loadStatistics();
      await loadJS("/web/static/lib/Chart/Chart.js");
    });
    useEffect(() => this.renderChart());
  }

  renderChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    const config = this.canvasRef.el;
    this.chart = new Chart(config, {
      type: "pie",
      data: {
        labels: Object.keys(this.stats["orders_by_size"]),
        datasets: [
          {
            data: Object.values(this.stats["orders_by_size"]),
            backgroundColor: [
              "#E91E63", //pink
              "#1ABC9C", // green
              "#FFD700", // golden
              "#2ECC71",
              "#FFD700", // yellow
            ],
            borderColor: "black",
          },
        ],
      },
      options: {
        onClick: (e) => {
          // console.log(e)
          var activePoints = this.chart.getElementsAtEventForMode(
            e,
            "point",
            this.chart.options
          );
          var firstPoint = activePoints[0];
          var label = this.chart.data.labels[firstPoint._index];
          console.log("lab",label);
          let domain = `[('size', '=', '${label}')]`;
          console.log(domain)
          this.last7DaysOrders(domain,"New Orders");
        },
      },
    });
  }

  customerView() {
    this.action.doAction("base.action_partner_form");
    // document.write("Hello");
    // return true;
  }

  last7DaysOrders() {
    let date =
      "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]";
    this.action.doAction({
      type: "ir.actions.act_window",
      name: this.env._t("New Orders"),
      //   target: "current",
      //   res_id: activity.res_id,
      res_model: "awesome_tshirt.order",
      views: [
        // [false, "form"],
        [false, "list"],  
        [true, "kanban"],  
      ],
      domain: new Domain(date).toList(),
    });
  }

  last7DaysCancelledOrders() {
    let date1 =
      "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d')),('state','=','cancelled')]";
    this.action.doAction({
      type: "ir.actions.act_window",
      name: this.env._t("Cancelled Orders"),
      res_model: "awesome_tshirt.order",
      views: [[false, "list"]],
      domain: new Domain(date1).toList(),
    });
  }
}

AwesomeDashboard.components = { Layout, Card };
AwesomeDashboard.template = "awesome_tshirt.clientaction";

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);
