/** @odoo-module */

import { Component, onWillStart, useRef, useEffect, onMounted, onWillUnmount } from "@odoo/owl";
import { loadJS } from "@web/core/assets";
import { getColor } from "@web/views/graph/colors";

export class PieChart extends Component {
    setup() {
        this.canvasRef = useRef('canvas');
        
        this.label = Object.keys(this.props.data)
        this.data = Object.values(this.props.data)
        this.color = this.label.map((_, index) => {
            return getColor(index);
        });
        
        onWillStart(() => {
            return loadJS(["/web/static/lib/Chart/Chart.js"]);
        });

        onMounted(() => this.renderChart());
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
        const ctx = this.canvasRef.el.getContext('2d');
        this.chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: this.label,
                datasets: [{
                  data: this.data,
                  backgroundColor: this.color,
                  hoverOffset: 4
                }]
              }
        });
    };

    onpiechartclick(ev) {
        const size = this.chart.getElementsAtEvent(ev);
        if(size.length){
            this.props.sizeby(size[0]._view.label)
        }
    }

}

PieChart.template = "awesome_tshirt.PieChart";
