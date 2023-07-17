/* @odoo-module **/

import { Component, useEffect, onWillStart, useRef, onMounted } from "@odoo/owl";
import { loadJS } from "@web/core/assets";

export class Piechart extends Component{
    setup() {
        onWillStart(() => {
            return loadJS(["/web/static/lib/Chart/Chart.js"]);
        });      
        useEffect(() => this.renderChart());
        this.canvasRef= useRef("canvas")  
        onMounted(() => {
            this.renderChart();
        });  

    }
    renderChart() {
        if (this.chart) {
            this.chart.destroy();
        }   
        this.chart = new Chart(this.canvasRef.el, {
            type: "pie",
            data: {
                labels: [
                    'Red',
                    'Yellow',
                    'Blue',
                    'green'
                ],
                datasets: [
                    {    
                        data: [10, 20, 30,40],    
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.7)",
                            "rgba(255, 206, 86, 0.7)",
                            "rgba(54, 162, 235, 0.7)",
                            "rgba(75, 192, 192, 0.7)",
                        ],
                    },
                ],
            },
            
        });
    }
}
Piechart.template = "awesome_tshirt.piechart";
