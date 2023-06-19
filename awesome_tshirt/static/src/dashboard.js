/** @odoo-module **/

import { Component,useSubEnv,onWillStart,onWillUnmount,useRef,useEffect,onMounted} from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { getDefaultConfig } from "@web/views/view";
import {Domain} from "@web/core/domain";
import { Card } from "./Card/card";
import { loadJS } from "@web/core/assets";
// import { getColor } from "@web/views/graph/colors";

export class AwesomeDashboard extends Component {
    

    setup(){
        this.action = useService("action");
        this.AwesomeTshirtService = useService("AwesomeTshirtService");
        useSubEnv({
            config: {
                ...getDefaultConfig(),
                ...this.env.config,
            },
        });
        this.chart=null;
        this.action=useService('action'); 

        onWillStart(async () => {
            // loadJS("/web/static/lib/Chart/Chart.js");
            // this.statistics = await this.rpc("/awesome_tshirt/statistics");
            this.statistics = await this.AwesomeTshirtService.loadStatistics();
            await loadJS("/web/static/lib/Chart/Chart.js");
        });

        this.canvasRef=useRef("canvas");

        onMounted(() => {
            this.renderChart();
        });

        onWillUnmount(()=>{
            if(this.chart){
                this.chart.destroy();
            }
        });

        this.orderDetails = {
            average_quantity: "Average amount of t-shirt by order this month",
            average_time: "Average time for an order to go from 'new' to 'sent' or 'cancelled'",
            nb_cancelled_orders: "Number of cancelled orders this month",
            nb_new_orders: "Number of new orders this month",
            total_amount: "Total amount of new orders this month",
        };

        useEffect(() => this.renderChart());
        
        this.canvasRef=useRef("canvas");
        
    }
    renderChart() {
        if (this.chart) {
            this.chart.destroy();
        }
        const ctx = this.canvasRef.el;
        this.chart = new Chart(ctx,{
            type: 'pie',
            data:{
                datasets: [{
                    data: Object.values(this.statistics['orders_by_size']),
                    backgroundColor:["#F333FF","#FFAF33","#33FF5B"] 
                }],
                labels:Object.keys(this.statistics["orders_by_size"]),
            },
            options: {
                onClick:(e) =>{
                    var activePoints = this.chart.getElementsAtEventForMode(e, 'point', this.chart.options);
                    var firstPoint = activePoints[0];
                    var label = this.chart.data.labels[firstPoint._index];
                    let domain=`[('size','=','${label}'),('state','!=', 'cancelled')]`;
                    this.openOrder("Orders",domain);
                }
            }
        });
    }

    customer(){
        // console.log("customer button triggered");
        this.action.doAction('base.action_partner_form');
        
    }

    openOrder(title,domain){
        this.action.doAction({
            type:"ir.actions.act_window",
            name:title,
            res_model:"awesome_tshirt.order",
            domain:new Domain(domain).toList(),
            views:[
                [false,'tree'],
                [false,'form'],
            ],
        });
    }
    
    newOrder(){
        const domain="[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]";
        console.log("new_order button triggered");
        console.log(this.openOrder("New Order",domain));
        
    }

    cancelOrder(){
        const domain="[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d')),('state','=','cancelled')]";
        // console.log("cancel_order button triggered");
        this.openOrder("Cancel Order",domain);
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


AwesomeDashboard.components = {Layout,Card};
AwesomeDashboard.template = "awesome_tshirt.clientaction";

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);
registry.category("services").add("myService", myService);
