/** @odoo-module */

import { Component, useState, useRef, useEffect, onWillStart, onMounted, onWillDestroy } from "@odoo/owl";
import { loadJS } from "@web/core/assets";
// import rough from "../../libs/rough";

const generator = rough.generator();

function createElement(id, x1, y1, x2, y2, type) {
    // debugger;
    let roughElement = null;
    if (type == 'line') {
        roughElement = generator.line(x1, y1, x2, y2);        
    } 
    else if (type == 'rectangle') {
        roughElement = generator.rectangle(x1, y1, x2-x1, y2-y1);        
    }
    return {id, x1, y1, x2, y2, type, roughElement };
}

function distance(a, b) {
    const {x1, y1} = a;
    const {x2, y2} = b;
    let y = x2 - x1;
    let x = y2 - y1;
    
    return Math.sqrt(x * x + y * y);
}

function isWithinElement(x, y, element) {
    const { type, x1, x2, y1, y2 } = element;
    if (type === "rectangle") {
        const minX = Math.min(x1, x2);
        const maxX = Math.max(x1, x2);
        const minY = Math.min(y1, y2);
        const maxY = Math.max(y1, y2);
        return x >= minX && x <= maxX && y >= minY && y <= maxY;
    } else {
        debugger;
        const a = {x1, y1};
        const b = {x2, y2};
        const c = {x, y};
        const offset = distance(a, b) - (distance(a, c) + distance(b, c));
        return Math.abs(offset) < 1;
    }
};

function getElementAtPosition(x, y, elements) {
    return elements.find(element => isWithinElement(x,y, element));
}

export class Draw extends Component {
    setup() {
        this.mouse = useMouse();
        this.state = useState({
            elements: [],
            action: 'none',
            tool: 'line',
            selectedElement: null,
        });
        this.drawCanvasRef = useRef("drawCanvas");

        onWillStart(() => {
            return loadJS("static/libs/rough.js");
        });

        onMounted(() => {
        });

        useEffect(
            () => {
                this.drawCanvasRef.el.width = window.innerWidth;
                this.drawCanvasRef.el.height = window.innerHeight;
            },
            () => [window.innerWidth, window.innerHeight]
        );

        useEffect(
            () => {
                const canvas = this.drawCanvasRef.el;
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // ctx.fillStyle = "green";
                // ctx.fillRect(10,10,30,30);
                // ctx.strokeRect(50,50,70,30);

                const roughCanvas = rough.canvas(canvas);
                // const rect = generator.rectangle(10,10,40,40);
                // const line = generator.line(10,10,50,50);

                // roughCanvas.draw(rect);
                // roughCanvas.draw(line);
                this.state.elements.forEach( element => roughCanvas.draw(element.roughElement));
            },
            () => [this.state.elements]
        );
    }

    updateElement(id, x1, y1, x2, y2, type) {
        const updatedElement = createElement(id, x1, y1, x2, y2, type);
        const elementsCopy = [...this.state.elements];
        elementsCopy[id] = updatedElement;
        this.state.elements = elementsCopy;
    }

    handleMouseDown(event) {
        const { clientX, clientY } = event;
        if (this.state.tool == "selection") {
            const element = getElementAtPosition(clientX, clientY, this.state.elements);
            if(element) {
                const offsetX = clientX - element.x1;
                const offsetY = clientY - element.y1;
                this.state.selectedElement = {...element, offsetX, offsetY};
                this.state.action = 'moving'; 
            }
        } else {
            const id = this.state.elements.length;
            const element = createElement(id, clientX, clientY, clientX, clientY, this.state.tool);
            this.state.elements = [...this.state.elements, element];
            this.state.action = 'drawing';
        }

    }

    handleMouseMove(event) {
        const { clientX, clientY } = event;

        if (this.state.tool === "selection") {
            event.target.style.cursor = getElementAtPosition(clientX, clientY, this.state.elements) ? "move" : "default";
        }
        if (this.state.action === "drawing") {
            // debugger;
            const index = this.state.elements.length - 1;
            const { x1, y1 } = this.state.elements[index];
            this.updateElement(index, x1, y1, clientX, clientY, this.state.tool);
        } else if (this.state.action == "moving") {
            const {id, x1, y1, x2, y2, type, offsetX, offsetY } = this.state.selectedElement;
            const width = x2 - x1;
            const height = y2 - y1;
            const newX = clientX - offsetX;
            const newY = clientY - offsetY;
            this.updateElement(id, newX, newY, newX + width, newY + height, type);
        }
    }

    handleMouseUp(event) {
        this.state.action = "none";
        this.state.selectedElement = null;
    }

    changeElementTool(type) {
        this.state.tool = type;
    }

}

function useMouse() {
  const position = useState({ x: 0, y: 0 });

  function update(e) {
    position.x = e.clientX;
    position.y = e.clientY;
  }
  window.addEventListener("mousemove", update);
  onWillDestroy(() => {
    window.removeEventListener("mousemove", update);
  });

  return position;
}

Draw.template = "owl_playground.Draw";
