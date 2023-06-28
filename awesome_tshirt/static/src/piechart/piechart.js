/** @odoo-module */

import { Component, onWillStart, useRef, useEffect, onMounted, onWillUnmount } from "@odoo/owl";
import { loadJS } from "@web/core/assets";
// import { getColor } from "@web/views/graph/colors";s

export class PieChart extends Component {
    setup() {
        this.canvasRef = useRef('canvas');
        // this.color = this.labels.map((_, index) => {
        //     return getColor(index);
        // });
        this.label = Object.keys(this.props.data)   
        this.data = Object.values(this.props.data)
        onWillStart(() => {
            return loadJS(["/web/static/lib/Chart/Chart.js"]);
        });
        // onWillStart(() => loadJS("/web/static/lib/Chart/Chart.js"));

        onMounted(() => this.renderChart());
        onWillUnmount(() => {
            if (this.chart) {
                this.chart.destroy();
            }
        });
    }
    onPieClick(ev, chartElem) {
        const clickedIndex = chartElem[0]._index;
        this.props.onPieClick(this.labels[clickedIndex]);
    }

    renderChart() {
        if (this.chart) {
            this.chart.destroy();
        }
        const ctx = this.canvasRef.el.getContext('2d');
        this.chart = new Chart(ctx, {
            type: 'pie',

            data: {
                label: this.label,

                datasets: [{
                  labels: 'My First Dataset',
                  data: this.data,
                  backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                  ],
                }],
                options: {
                    onClick: this.onPieClick.bind(this),
                },
              }
        });
    };

    onpiechartclick(ev) {
        const size = this.chart.getElementsAtEvent(ev);
        if(size.length){
            this.props.sizeby(size[0]._view.label)
            console.log(size)
        }
    }

}

PieChart.template = "awesome_tshirt.PieChart";
