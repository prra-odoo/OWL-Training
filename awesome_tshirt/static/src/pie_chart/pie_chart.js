/** @odoo-module */

import { loadJS } from "@web/core/assets";
import { getColor } from "@web/views/graph/colors";
import { Component, useRef, onWillStart,onMounted } from "@odoo/owl";

export class PieChart extends Component{
	
	setup() {
        this.canvasRef = useRef("canvas")

        this.labels = Object.keys(this.props.data);
        this.data = Object.values(this.props.data);
        this.color = this.labels.map((_, index) => {
            return getColor(index);
        });
        
		onWillStart(() => {
            return loadJS(["/web/static/lib/Chart/Chart.js"]);
        });
        onMounted(()=> this.renderChart())
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
            options: {
                onClick: this.onPieClick.bind(this),
            },
        });
    }

    onPieClick(ev, chartElem) {
        const clickedIndex = chartElem[0]._index;
        this.props.onPieClick(this.labels[clickedIndex]);
    }
}

PieChart.template = "awesome_tshirt.piechart"

PieChart.props = {
    data: { type: Object },
    label: { type: String },
    onPieClick: { type: Function },
};