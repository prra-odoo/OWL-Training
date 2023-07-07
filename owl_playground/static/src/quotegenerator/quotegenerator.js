/** @odoo-module */

import { Component, useState } from "@odoo/owl";

export class QuoteGenerator extends Component {
    setup() {
        this.state = useState({
            quotes: [{
                quote: "The only way to do great work is to love what you do.",
                author: "Steve Jobs",
                category: "Category: Motivation",
            },
            {
                quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
                author: "Winston Churchill",
                category: "Category: Perseverance",
            },
            {
                quote: "The best preparation for tomorrow is doing your best today.",
                author: "H. Jackson Brown Jr.",
                category: "Category: Preparation",
            },
            ],
            randomQuotes: [],
            color: "black",
            font: "arial",
            newQuote: {
                quote: "",
                author: "",
                category: ""
            }
        }); 
    }

    generateQuote() {
        const randomIndex = Math.floor(Math.random() * this.state.quotes.length);
        this.state.randomQuotes = this.state.quotes[randomIndex];
        // console.log(this.state.randomIndex)
    }

    changeColor() {
        const colors = ["Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink", "Brown", "Gray", "Black", "White", "Cyan", "Magenta", "Indigo", "Turquoise", "Gold", "Silver", "Coral", "Lavender", "Teal"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        this.state.color = randomColor;
        // console.log(this.state.color)
    }

    changeFont() {
        const font = ["Calibri", "Serif", "Fantasy", "Cursive", "Sans-serif", "Courier", "Monaco", "Brush-Script"];
        const randomFont = font[Math.floor(Math.random() * font.length)];
        this.state.font = randomFont;
        // console.log(this.state.font)
    }

    addQuote() {
        const newQuote = {
            quote: this.state.newQuote.quote,
            author: this.state.newQuote.author,
            category: this.state.newQuote.category
        };
        this.state.quotes.push(newQuote);
        this.state.newQuote = {
            quote: "",
            author: "",
            category: ""
        };
        console.log(this.state.quotes);
    }
}

QuoteGenerator.template = "owl_playground.QuoteGenerator";














/** @odoo-module */

// import { Component, useState } from "@odoo/owl";

// export class QuoteGenerator extends Component {
//     setup() {
//         this.state = useState({
//             quotes: [{
//                 quote: "The only way to do great work is to love what you do.",
//                 author: "Steve Jobs",
//                 category: "Category: Motivation",
//             },
//             {
//                 quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
//                 author: "Winston Churchill",
//                 category: "Category: Perseverance",
//             },
//             {
//                 quote: "The best preparation for tomorrow is doing your best today.",
//                 author: "H. Jackson Brown Jr.",
//                 category: "Category: Preparation",
//             }
//             ],
//             randomQuotes: [],
//             color: "black",
//             font: "arial",
//             newQuote: {
//                 quote: "",
//                 author: "",
//                 category: ""
//             }
//         });
//     }

//     generateQuote() {
//         const randomIndex = Math.floor(Math.random() * this.state.quotes.length);
//         this.state.randomQuotes = this.state.quotes[randomIndex];
//         console.log(this.state.randomIndex)
//     }

//     changeColor() {
//         const colors = ["Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink", "Brown", "Gray", "Black", "White", "Cyan", "Magenta", "Indigo", "Turquoise", "Gold", "Silver", "Coral", "Lavender", "Teal"];
//         const randomColor = colors[Math.floor(Math.random() * colors.length)];
//         this.state.color = randomColor;
//         console.log(this.state.color)
//     }

//     changeFont() {
//         const font = ["Calibri", "Serif", "Fantasy", "Cursive", "Sans-serif", "Courier", "Monaco", "Brush-Script"];
//         const randomFont = font[Math.floor(Math.random() * font.length)];
//         this.state.font = randomFont;
//         console.log(this.state.font)
//     }

//     addQuote() {
//         const newQuote = {
//             quote: this.state.newQuote.quote,
//             author: this.state.newQuote.author,
//             category: this.state.newQuote.category
//         };
//         this.state.newQuote = {
//             quote: "",
//             author: "",
//             category: ""
//         };
//         console.log(this.state.newQuote)
//     }
// }

// QuoteGenerator.template = "owl_playground.QuoteGenerator";
