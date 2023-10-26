//USING ASYNC AND AWAIT THIS TIME AROUND

//PART 1: Number Facts

//1-Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. 
//(Make sure you get back JSON by including the json query key, specific to this API.


async function getFactofNumber(numb) {
    try {
        let url = `http://numbersapi.com/${numb}/?json`
        let res = await axios.get(url)
        console.log(res.data)
    }
    catch (e) {
        console.log(e)
    }
}
//Then I call function inserting my favorite number: 21.
getFactofNumber(21);


//2-Figure out how to get data on multiple numbers in a single request. 
//Make that request and when you get the data back, put all of the number facts on the page.

const ul1 = document.querySelector(".ul1");
async function getFactsMultipleNumb(start, end) {
    try {
        let url2 = `http://numbersapi.com/${start}..${end}`;
        let res = await axios.get(url2);
        let object = res.data;
        for (each in object) {
            const newLi = document.createElement("li");
            newLi.innerText = `${object[each]}`;
            ul1.append(newLi);
        }
    }
    catch (e) {
        console.log(e);
    }
};

getFactsMultipleNumb(8, 11);

//3-Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. 
//It’s okay if some of the facts are repeats.
const ul2 = document.querySelector(".ul2");
async function getFourFacts(numb) {
    try {
        let url = `http://numbersapi.com/${numb}/?json`;
        let facts = await Promise.all([
            axios.get(url),
            axios.get(url),
            axios.get(url),
            axios.get(url)
        ])
        for (let fact of facts) {
            const newLi = document.createElement("li");
            newLi.innerText = `${fact.data.text}`;
            ul2.append(newLi);
        }
    }
    catch (e) {
        console.log(e)
    }

}

getFourFacts(21);


//PART 2: Deck of Cards

//1-Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. 
//Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
class deck {
    async getCard() {
        let res = await axios.get('https://deckofcardsapi.com/api/deck/new');
        this.deckId = res.data.deck_id;

        let res2 = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`)
        console.log(res2.data.cards[0]['value'] + ' of ' + res2.data.cards[0]['suit'])
    }
};

let deckA = new deck;
deckA.getCard();



//2- Make a request to the deck of cards API to request a single card from a newly shuffled deck. 
//Once you have the card, make a request to the same API to get one more card from the **same** deck.
//Once you have both cards, ***console.log*** the values and suits of both cards.

class deck2 {
    async get2Cards() {
        let res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        this.deckId = res.data.deck_id;

        let URL = `https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`;
        let cards = await Promise.all([
            axios.get(URL),
            axios.get(URL)
        ]);
        for (let card of cards) {
            console.log(card.data.cards[0]['value'] + ' of ' + card.data.cards[0]['suit']);
        };
    }
};

let deckB = new deck2;
deckB.get2Cards();

//3-Build an HTML page that lets you draw cards from a deck. 
//When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. 
//Every time you click the button, display a new card, until there are no cards left in the deck.

const div = document.querySelector('.general');
const div2 = document.querySelector('.images-wrapper')
const button = document.createElement('button');
button.innerText = 'Draw a card';
div.prepend(button);
button.addEventListener('click', DrawCard)

let urlF = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'


async function DrawCard() {
    try {
        let url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
        let res = await axios.get(url)
        let deck_id = res.data.deck_id;
        //SHUFFLE THE DECK WITHOUT CHANGING IT
        await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/?remaining=true`)
        //REQUEST A CARD
        let res2 = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
        //CREATE ELEMENT
        let img = document.createElement('img')
        img.setAttribute('src', res2.data.cards[0].image)
        //APPEND IT TO THE DIV
        div2.append(img)
    }
    catch (e) {
        console.log(e)
    }
}