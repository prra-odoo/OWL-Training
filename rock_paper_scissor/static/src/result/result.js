/** @odoo-module **/

import { useState,Component } from "@odoo/owl"; //hooks

export class Result extends Component {
    static template = "rock_paper_scissor.result";
    // static props = {
    //     player: {type:String},
    //     computer: {type:String},
    // };

    // setup(){
    //     this.state = useState({result: "" });
    // }
    // get winner(){
    //     console.log(this.state.player)
    //     if(this.state.player === this.state.computer){
    //         return "Draw!";
    //     }
    //     else if(this.state.computer === "rock"){
    //         return (this.state.player === "paper") ? "You Win!" : "You Lose!"
    //     }
    //     else if(this.state.computer === "paper"){
    //         return (this.player === "scissor") ? "You Win!" : "You Lose!"
    //     }
    //     else if(this.state.computer === "scissor"){
    //         return (this.state.player === "rock") ? "You Win!" : "You Lose!"
    //     }
    // } 
}