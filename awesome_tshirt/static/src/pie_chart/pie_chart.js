/** @odoo-module **/

import { loadJS } from "@web/core/assets";
import { getColor } from "@web/views/graph/colors";
import { Component, onMounted, onWillStart, useRef, onWillUnmount } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";

export class PieChart extends Component{
    setup(){
        this.action = useService("action");
        this.canvasRef = useRef("canvas");

        this.data = Object.values(this.props.data);
        this.labels = Object.keys(this.props.data);
        this.color = this.labels.map((_, index) => {
            return getColor(index);
        });

        onWillStart(() => loadJS(["/web/static/lib/Chart/Chart.js"]));

        onMounted(() => {
            this.renderChart();
        });

        onWillUnmount(() => {
            if (this.chart) {
                this.chart.destroy();
            }
        });
    }

    onChartClick(ev){
        const chartEl = this.chart.getElementsAtEvent(ev);
        if(chartEl.length){
            const size = this.chart.data.labels[chartEl[0]._index];
            const domain = `[('size','=', '${size}')]`;
            this.props.onPieClick(this.env._t("Order by Size"), domain);
        }
    }

    renderChart() {
        if (this.chart) {
            this.chart.destroy();
        }
        this.chart = new Chart(this.canvasRef.el, {
            type: "pie",
            data: {
                labels: this.labels,
                datasets: [
                    {
                        label: this.props.label,
                        data: this.data,
                        backgroundColor: this.color,
                    },
                ],
            },
        })
    }
}

PieChart.template = "awesome_tshirt.PieChart";
// PieChart.props = {
//     data: { type: Object },
//     label: { type: String },
// }