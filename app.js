//PART 1: Number Facts

//1-Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. 
//(Make sure you get back JSON by including the json query key, specific to this API.

let url = 'http://numbersapi.com/21/?json'

axios.get(url)
    .then(res => {
        console.log(res)
        console.log(res.data)
    })
    .catch(err => console.log(err));
//API DID NOT ANSWER IN PROPER JSON

//2-Figure out how to get data on multiple numbers in a single request. 
//Make that request and when you get the data back, put all of the number facts on the page.
let url2 = 'http://numbersapi.com/5..10'
let ul1 = document.querySelector(".ul1");
axios.get(url2)
    .then(res => {
        console.log(res.data)
        let object = res.data
        for (each in object) {
            const newLi = document.createElement("li");
            newLi.innerText = `${object[each]}`;
            ul1.append(newLi);
        }
    })
    .catch(err => console.log(err));

//3-Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. 
//It’s okay if some of the facts are repeats.
let url3 = 'http://numbersapi.com/21/?json'
let ul2 = document.querySelector(".ul2");
axios.get(url3)
    .then(res => {
        console.log(res.data)
        let object = res.data
        const newLi = document.createElement("li");
        newLi.innerText = `${object['text']}`;
        ul2.append(newLi);
        return axios.get(url3)
    })
    .then(res => {
        console.log(res.data)
        let object = res.data
        const newLi = document.createElement("li");
        newLi.innerText = `${object['text']}`;
        ul2.append(newLi);
        return axios.get(url3)
    })
    .then(res => {
        console.log(res.data)
        let object = res.data
        const newLi = document.createElement("li");
        newLi.innerText = `${object['text']}`;
        ul2.append(newLi);
        return axios.get(url3)
    })
    .then(res => {
        console.log(res.data)
        let object = res.data
        const newLi = document.createElement("li");
        newLi.innerText = `${object['text']}`;
        ul2.append(newLi);
        return axios.get(url3)
    })

    .catch(err => console.log(err));

//PART 2: Deck of Cards

//1-Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. 
//Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

let urlA = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
axios.get(urlA)
    .then(res => {
        console.log('URLA', res.data['deck_id'])
        let deck_id = res.data['deck_id']
        let urlB = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
        return axios.get(urlB)
    })
    .then(res => {
        console.log(res.data.cards[0]['value'] + ' of ' + res.data.cards[0]['suit'])
    })
//2- Make a request to the deck of cards API to request a single card from a newly shuffled deck. 
//Once you have the card, make a request to the same API to get one more card from the **same** deck.
//Once you have both cards, ***console.log*** the values and suits of both cards.
let urlC = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
axios.get(urlC)
    .then(res => {
        let deck_id = res.data['deck_id']
        let urlD = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
        return axios.get(urlD)
    })
    .then(res => {
        let card1 = res.data.cards[0]['value'] + ' of ' + res.data.cards[0]['suit']
        console.log(card1)
        let deck_id = res.data['deck_id']
        let urlD = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
        return axios.get(urlD)
    })
    .then(res => {
        let card2 = res.data.cards[0]['value'] + ' of ' + res.data.cards[0]['suit']
        console.log(card2)
    })

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


function DrawCard() {
    axios.get(urlF)
        .then(res => {
            let deck_id = res.data['deck_id']
            return axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/?remaining=true`)
        })
        .then(res => {
            let deck_id2 = res.data['deck_id']
            let urlG = `https://deckofcardsapi.com/api/deck/${deck_id2}/draw/?count=1`
            return axios.get(urlG)
        })
        .then(res => {
            let img = document.createElement('img')
            img.setAttribute('src', res.data.cards[0].image)
            div2.append(img)
        })
}