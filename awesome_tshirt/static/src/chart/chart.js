/** @odoo-module **/

import { loadJS } from "@web/core/assets";
import { getColor } from "@web/views/graph/colors";
import { Domain } from "@web/core/domain";

const { Component, onWillUnmount, useRef, onWillStart, onMounted } = owl;

export class PieChart extends Component{
    setup() {
        this.canvasRef = useRef("canvas");

        this.titles = Object.keys(this.props.data);
        this.data = Object.values(this.props.data);
        this.color = this.titles.map((_, index) => {
            return getColor(index+6);
        });

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

    renderChart() {
        if (this.chart) {
            this.chart.destroy();
        }
        this.chart = new Chart(this.canvasRef.el, {
            type: "pie",
            data: {
                labels: this.titles,
                datasets: [
                    {
                        data: this.data,
                        backgroundColor: this.color,
                    },
                ],
            },
        });
    }

    listview(ev){
        const size = this.chart.getElementsAtEvent(ev);
        if(size.length){
            this.props.listviewsize(size[0]._view.label)
        }
    }

}

PieChart.template = "awesome_tshirt.PieChart";