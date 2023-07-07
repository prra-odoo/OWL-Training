/** @odoo-module **/

import { Component, onWillStart, onMounted, useRef} from "@odoo/owl";
import { loadJS } from "@web/core/assets";

export class PieChart extends Component{
    setup(){
        this.data = Object.values(this.props.data);
        this.labels = Object.keys(this.props.data);
        this.canvasRef = useRef("chartCanvas");
        console.log(this.data, this.labels);
        onWillStart(async () => {
            this.statistics = await loadJS("/web/static/lib/Chart/Chart.js");
        });

        onMounted(() => {
            this.renderChart();
        })
    }

    renderChart() {
        this.chart = new Chart(this.canvasRef.el,{
            type: "pie",
            data: {
                datasets: [
                    {
                        data: this.data,
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.7)",
                            "rgba(54, 162, 235, 0.7)",
                            "rgba(255, 206, 86, 0.7)",
                            "rgba(75, 192, 192, 0.7)",
                        ],
                    },
                ],
                labels: this.labels,
            },
        });
    }

    onChart(evt){
        // debugger;
        console.log('HiHIHIHIHiHi');
        var firstPoint = this.chart.getElementAtEvent(evt);

        if (firstPoint.length) {
            // this.label = this.chart.data.labels[firstPoint._index];
            // var value = this.chart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
            this.size = this.chart.data.labels[firstPoint[0]._index];

            const domain = `[('size', '=', '${this.size}')]`;;
            console.log(this.size);
        // this.chart.destroy();
        this.props.onChartClick(this.env._t("Order by Size"), domain);
        }
        

    }

}
PieChart.template= "awesome_tshirt.pie_chart"