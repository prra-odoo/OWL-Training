/** @odoo-module **/

import { Component, onWillStart, onMounted, useRef, onWillUnmount } from "@odoo/owl";
import { loadJS } from "@web/core/assets";
import { getColor } from "@web/views/graph/colors";


export class PieChart extends Component{
    setup(){
        this.canvasRef = useRef("canvas")
        this.labels = Object.keys(this.props.data);
        this.data = Object.values(this.props.data);
        this.color = this.labels.map((_, index) => {
            return getColor(index);
        });
        onWillStart(() => loadJS("/web/static/lib/Chart/Chart.js"));

        onMounted(() => {
            this.renderChart();
        });

    }

    onpiechartclick(ev) {
        const size = this.chart.getElementsAtEvent(ev);
        if(size.length){
            this.props.sizeby(size[0]._view.label)
        }
    }

    renderChart() {
        if (this.chart) {
            this.chart.destroy();
        }

        this.chart = new Chart(this.canvasRef.el, {
            type: 'pie',
            data: {
                labels : this.env._t(this.labels),
                datasets: [{
                    data: this.data,
                    backgroundColor: this.color,   
                }
            ],
            },
        })
    };

}

PieChart.template = "awesome_tshirt.PieChart";