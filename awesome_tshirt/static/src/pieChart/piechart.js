/** @odoo-module */

import { loadJS } from "@web/core/assets";
import { getColor } from "@web/views/graph/colors";

const { Component, onWillStart, onMounted, useRef, onWillUnmount } = owl;

export class PieChart extends Component {

    setup() {
        this.canvasRef = useRef("chartCanvas");
        this.labels = Object.keys(this.props.data);
        this.data = Object.values(this.props.data);
        this.color = this.labels.map((_, index) => {
            return getColor(index);
        });

        // onWillStart(async () => {
        //     this.statistics = await loadJS("/web/static/lib/Chart/Chart.js");
        // });

        // onMounted(() => {
        //         this.renderChart();
        // })
        onWillStart(() => {
            return loadJS(["/web/static/lib/Chart/Chart.js"]);
        });

        onMounted(() => {
            this.renderChart();
        });

        onWillUnmount(() => {
            if (this.chart) {
                this.chart.destroy();
            }
        });
    }

    onPieClick = (ev, chartElem) => {
        if(chartElem.length) {
            const clickedIndex = chartElem[0]._index;
            const clickedLabel = this.labels[clickedIndex];
            const domain = [["size", "=", clickedLabel]];
            this.props.onPieClick( this.env._t("Filtered orders by %s size"),domain);
        }
      };
      
    
    renderChart() {
        if (this.chart) {
            this.chart.destroy();
        }
        this.chart = new Chart(this.canvasRef.el, {
            type: "pie",
            data: {
                labels: this.labels,
                // labels: [
                //     'Red',
                //     'Blue',
                //     'Yellow',
                // ],
                datasets: [
                    {
                        label: this.env._t(this.props.label),
                        data: this.data,
                        backgroundColor: this.color,
                        // data: [10, 20, 30],
                        // backgroundColor: [
                        //     "rgba(255, 99, 132, 0.7)",
                        //     "rgba(54, 162, 235, 0.7)",
                        //     "rgba(255, 206, 86, 0.7)",
                        //     // "rgba(75, 192, 192, 0.7)",
                        // ],
                    },
                ],
            },
            options: {
                onClick: this.onPieClick.bind(this),
            },
        });
    }
}

PieChart.template = "awesome_tshirt.PieChart";
PieChart.props = {
    data: { type: Object },
    label: { type: String },
    onPieClick: { type: Function },
};