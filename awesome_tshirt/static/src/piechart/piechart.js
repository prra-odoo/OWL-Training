/** @odoo-module **/

import { Component, onWillStart, onMounted, useRef, onWillUnmount } from "@odoo/owl";
import { loadJS } from "@web/core/assets";

export class PieChart extends Component {

    setup(){
        this.canvasRef = useRef("canvas");
        onWillStart(() => loadJS(["/web/static/lib/Chart/Chart.js"]));
        
        onMounted(() => {
            this.renderChart()
        })
        onWillUnmount(() => {
            if (this.chart) {
                this.chart.destroy();
            }
        });
    }
    
    renderChart() {
        if (this.chart) {
            this.chart.destroy();
        }
        this.data ={
            datasets: [{
                data: this.props.data,
                backgroundColor: [
                    "rgba(255, 0, 0, 0.7)",
                    "rgba(0, 0, 255, 0.7)",
                    "rgba(0, 255, 0, 0.7)",
                ],
                
            }],
            labels: this.props.label,
        }
        this.myPieChart = new Chart(this.canvasRef.el, {
            type: 'pie',
            data: this.data,
            options : {
                onClick :  (ev, context) => {
                    if(context.length){
                        this.props.openOrdersBySize(this.props.label[context[0]._index]);
                    }
                },
            },
        })
    }
}

PieChart.template = "awesome_tshirt.piechart";
