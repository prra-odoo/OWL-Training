/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { OddEven } from "../odooeven/odooeven";

export class Player extends Component {
    setup() {
        this.player1_score = useState({value : 0});
        this.player2_score = useState({value : 0});
        this.current_p1_choose = useState({value:"odd"});
        this.current_p2_choose = useState({value:"even"});
        this.ran1 = useState({value : 0});
        this.ran2 = useState({value : 0});
        this.p1_id = "1";
        this.p2_id = "2";
    }
    changeValueOfplayer(ev) {
            if(this.current_p1_choose.value === "odd"){
                this.current_p1_choose.value = "even";
            }
            else {
                this.current_p1_choose.value = "odd";
            }
            if(this.current_p2_choose.value === "odd"){
                this.current_p2_choose.value = "even";
            }
            else {
                this.current_p2_choose.value = "odd";
            }
            console.log(this.current_p1_choose.value, this.current_p2_choose.value)
    }

    updateScore () {
        this.ran1.value = Math.floor(Math.random() * 10);
        this.ran2.value = Math.floor(Math.random() * 10);
        const result = this.ran1.value + this.ran2.value;

        if (result % 2 === 0 ) {
            if (this.current_p1_choose.value === "even") {
                if (this.player1_score.value === 4){
                    this.player1_score.value = 0;
                    this.player2_score.value = 0;
                    alert("player 1 wins");
                }
                else {
                    this.player1_score.value = this.player1_score.value + 1;
                }
            }
            else {
                if (this.player2_score.value === 4){
                    this.player1_score.value = 0;
                    this.player2_score.value = 0;
                    alert("player 2 wins");
                }
                else {
                    this.player2_score.value = this.player2_score.value + 1;
                }
            }
        }
        else {
            if (this.current_p1_choose.value === "odd") {
                if (this.player1_score.value === 4){
                    this.player1_score.value = 0;
                    this.player2_score.value = 0;
                    alert("player 1 wins");
                }
                else {
                    this.player1_score.value = this.player1_score.value + 1;
                }
            }
            else {
                if (this.player2_score.value === 4){
                    this.player1_score.value = 0;
                    this.player2_score.value = 0;
                    alert("player 2 wins");
                }
                else {
                    this.player2_score.value = this.player2_score.value + 1;
                }
            }
        }
    }
}

Player.template = "owl_playground.player";
Player.components = { OddEven };
