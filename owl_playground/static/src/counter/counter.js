/** @odoo-module **/

import { Component, useState} from "@odoo/owl";

export class Counter extends Component {
    setup(){
        this.state=useState({value:0,secretNumber:Math.floor(Math.random()*10)+1,chances:5});

    }



    increment(){
        this.state.value=this.state.value+1;
        localStorage.setItem('counterData',this.state.value);
    }

    decrement(){
        if(this.state.value>0){
        this.state.value=this.state.value-1;}
        else{
            alert("Less than 0 not be possible");
        }
    }

    makeGuess(){
        if(this.state.guess== this.state.secretNumber){
            alert("Congratulations! You guessed the correct number.");
            this.state.secretNumber = Math.floor(Math.random() * 10) + 1;
            // this.state.guess = null;
        } 
        else if(this.state.guess< this.state.secretNumber){
            alert("You guessed the small number and computer Number : "+ this.state.secretNumber);
            this.state.secretNumber = Math.floor(Math.random() * 10) + 1
        }
        else if(this.state.guess> this.state.secretNumber){
            alert("You guessed the large number  and computer Number : "+ this.state.secretNumber);
            this.state.secretNumber = Math.floor(Math.random() * 10) + 1
        }
        this.state.chances -= 1;
        if (this.state.chances === 0) {
            alert("Game Over And Start again and you have 5 chance again.");
            this.state.chances = 5;
        }
        this.state.guess = null;
    }

}


Counter.template="owl_playground.Counter"