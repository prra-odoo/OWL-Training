/** @odoo-module **/

import { Component, onWillStart, onMounted, useRef } from "@odoo/owl";
import { loadJS } from "@web/core/assets";
import { getColor } from "@web/views/graph/colors";
export class PieChart extends Component {
    setup(){
        this.canvasRef = useRef("canvas");
        this.chart = null;
        this.color = Object.keys(this.props.pltdata).map((_, index) => {
                    return getColor(index);
                });
        onWillStart(() => loadJS(["/web/static/lib/Chart/Chart.js"]));

            
        onMounted(() =>{
            if (this.chart) {
                this.chart.destroy();
            }
            this.loadChart()
        })
        
    }
    clkl(ev){
        const ec=this.chart.getElementsAtEvent(ev);
        if (ec.length){
            const size = ec[0]._view.label
            const domain = `[('size','=','${size}'),('state','!=','cancelled')]`
            this.props.openOrd(domain)
        }
    }
    loadChart(){
        const lab=Object.keys(this.props.pltdata)
        const val=Object.values(this.props.pltdata)
        console.log(this.props.pltdata)
        const data = {
            datasets: [{
                data: val,
                backgroundColor: this.color,
            }],
            labels: lab,
        };
        
        this.chart = new Chart(this.canvasRef.el, 
            {
                type: 'pie',
                data: data,
            });
    }
}
PieChart.template = "awesome_tshirt.Pie";
PieChart.props ={
    pltdata: {type: Object,
    shape: {
                    m: {type: Number},
                    s: { type: Number},
                    xl:{type: Number}
                },
            },
            openOrd: {type: Function}
            }