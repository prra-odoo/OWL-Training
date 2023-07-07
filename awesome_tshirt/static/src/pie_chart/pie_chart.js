/** @odoo-module **/

import { Component, onWillStart, onMounted, useRef, onWillUnmount } from "@odoo/owl";
import { loadJS } from "@web/core/assets";
import { getColor } from "@web/views/graph/colors";
import { _t } from "@web/core/l10n/translation";


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

    onPieClick(ev) {
        debugger
        const piechart = this.chart.getElementsAtEvent(ev);
        if(piechart.length){
            this.props.sizeby(piechart[0]._view.label)
        }
    }
    // onpiechartclick(ev) {
    //     const size = this.chart.getElementsAtEvent(ev);
    //     if(size.length){
    //         this.props.sizeby(size[0]._view.label)
    //     }
    // }

    renderChart() {
        if (this.chart) {
            this.chart.destroy();
        }
        // const ctx = this.canvasRef.el.getContext('2d');
        // this.data ={
        //     datasets: [{
        //         data: [10, 20, 30],
        //         backgroundColor: [
        //             "rgba(255, 99, 132, 0.7)",
        //             "rgba(24, 42, 242, 1)",
        //             "rgba(242, 93, 24, 1)",
        //         ],
        //     }]
        // }
        this.chart = new Chart(this.canvasRef.el, {
            type: 'pie',
            data: {
                labels : this.labels,
                datasets: [{
                    // label : (_t(this.props.label)),
                    data: this.data,
                    backgroundColor: this.color,
                }]
            },
            // options: {
            //     // onClick: this.onPieClick.bind(this),
            //     onClick: (ev, context) => {
            //         if(context.length){
            //             this.props.openBySizeOrders(this.props.label[context[0]._index]);
            //         }
            //     },
            // },
        })
    };
}

PieChart.template = "awesome_tshirt.PieChart";
