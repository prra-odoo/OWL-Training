/** @odoo-module */

import { loadJS } from "@web/core/assets";
import { Component  , onWillStart, useEffect, useRef , onWillUnmount} from "@odoo/owl";
import { getColor } from "@web/views/graph/colors";


export class Piechart extends Component {
    setup(){
        this.canvasRef = useRef("canvas");
        this.labels = Object.keys(this.props.data);
        this.data = Object.values(this.props.data);

        this.color = this.labels.map((_, index) => {
            return getColor(index);
        });

        onWillStart(() => loadJS(["/web/static/lib/Chart/Chart.js"]));
        useEffect(() => this.renderChart());

        onWillUnmount(this.onWillUnmount);
    }

    onWillUnmount() {
        if (this.chart) {
            this.chart.destroy();
        }
    }

    renderChart() {
        if (this.chart) {
            this.chart.destroy();
        }
        const ctx = this.canvasRef.el.getContext('2d');
        this.chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: this.labels,
                datasets: [{
                    label: this.props.label,
                    data: this.data,
                    backgroundColor: this.color,
                }]
              }
            
        });
    }

    onpiechartclick(ev) {
        const size = this.chart.getElementsAtEvent(ev);
        if(size.length){
            this.props.sizeby(size[0]._view.label)
            console.log(size)
        }
    }
}

Piechart.template = "awesome_tshirt.Piechart";