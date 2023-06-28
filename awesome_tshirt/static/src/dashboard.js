/** @odoo-module **/

import { Layout } from "@web/search/layout";
import { getDefaultConfig } from "@web/views/view";
import { Component,useSubEnv,onMounted,onWillUnmount,useRef,onWillStart,useEffect} from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { Domain } from "@web/core/domain";
import { Card } from "./Card";
import { loadJS } from "@web/core/assets";
import { getColor } from "@web/views/graph/colors";


class AwesomeDashboard extends Component {

    setup(){
        useSubEnv({
            config:{
                ...getDefaultConfig(),
                ...this.env.config,
            },
        });  
        this.chart=null;
        

        this.action=useService('action'); 

        this.rpc=useService('rpc');

       
        
        this.data={
            average_quantity: this.env._t("Average amount of t-shirt by order this month"),
            average_time:this.env._t( "Average time for an order to go from 'new' to 'sent' or 'cancelled'"),
            nb_cancelled_orders: this.env._t("Number of cancelled orders this month"),
            nb_new_orders: this.env._t("Number of new orders this month"),
            total_amount: this.env._t("Total amount of new orders this months"),
        };

        

        this.loadStatistics=useService("statistics");
        onWillStart(async()=>{
            loadJS("/web/static/lib/Chart/Chart.js");
            this.stats= await this.loadStatistics.result();

            this.color = Object.keys(this.stats['orders_by_size']).map((_, index) => {
                return getColor(index);
            });
            // this.statistics  = await this.rpc("/awesome_tshirt/statistics");
            
        })
        // useEffect(() => this.renderChart());
       
        this.canvasRef=useRef("canvas");

        onMounted(() => {
            this.renderChart();
        })

        onWillUnmount(()=>{
            if(this.chart){
                this.chart.destroy();
            }
        });
        


    }
    
// Function for Onclick 
    customer(){
        this.action.doAction("base.action_partner_form");
    }

    openorders(domain) {
        this.action.doAction({
            type: 'ir.actions.act_window',
            res_model: 'awesome_tshirt.order',
            domain:new Domain(domain).toList(),
            views:[[false,'list'],[false,'form']],
        });
    }

    openNewOrders(){
        const domain="[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]";
        this.openorders(domain);
    }

   openCancelOrders(){
    const domain="[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d')),('state','=','cancelled')]";
        this.openorders(domain);
   }

   renderChart() {

    if (this.chart) {
        this.chart.destroy();
    }
    const ctx = this.canvasRef.el;
    this.chart = new Chart(ctx,{
        
        
        type:'pie',
        data: {
            datasets:[{
                 
                data: Object.values(this.stats['orders_by_size']),
                // backgroundColor:["#DAEBEE","#FF5126","#09C6AB"],
                backgroundColor:this.color,
                // borderColor:["#29252C","29252C","29252C"]
        
            }],
            labels: Object.keys(this.stats['orders_by_size']),
        },
       
        options:{
            onClick:(evt)=>{
                var activePoints =  this.chart.getElementsAtEventForMode(evt, 'point',  this.chart.options);
                var firstPoint = activePoints[0];
                var label =  this.chart.data.labels[firstPoint._index];
                let domain=`[('size','=','${label}'),("state",'!=',"cancelled")]`;
                // let domain="[]";
                this.openorders(domain);
            }
        }
    });
}
}

// services
const myService = {
    dependencies: ["notification"],
    start(env, { notification }) {
        let counter = 1;
        console.log(this.start)
        // notification.add(`Tick Tock ${counter++}`)
        setInterval(() => {
            notification.add(`Tick Tock ${counter++}`);
        }, 50000);
    }
};

// Render chart 

AwesomeDashboard.components = {Layout,Card};
// AwesomeDashboard.components = {Layout};
AwesomeDashboard.template = "awesome_tshirt.clientaction";

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);
