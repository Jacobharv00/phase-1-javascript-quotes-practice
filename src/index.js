const quoteList = document.querySelector( '#quote-list' )
const quoteCard = document.querySelector( '.quote-card' )
const quoteForm = document.querySelector( '#new-quote-form' )
const newQuote = document.querySelector( '#new-quote' )
const newAuthor = document.querySelector( '#author' )

fetch( 'http://localhost:3000/quotes?_embed=likes' )
  .then( r => r.json() )
  .then( data => {
    let quoteHTML = data.map( item => {
      return `<li class='quote-card'>
        <blockquote class="blockquote">
        <p class="mb-0">${item.quote}</p>
        <footer class="blockquote-footer">${item.author}</footer>
        <br>
        <button class='btn-success' id="${item.id}">Likes:${item.likes.length}</button>
      <button class='btn-danger' id="${item.id}">Delete</button>
      </blockquote >
    </li > `
    } )
    quoteList.innerHTML = quoteHTML.join( '' ) //.join('') to get rid of comma's
  } )


quoteForm.addEventListener( 'submit', e => {
  e.preventDefault()

  fetch( 'http://localhost:3000/quotes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify( {
      quote: newQuote.value,
      author: newAuthor.value,
    } )
  } )
    .then( r => r.json() )
    .then( newQuote => {
      let newQuoteHTML = newQuote.map( item => {
        return `<li class='quote-card'>
        <blockquote class="blockquote">
        <p class="mb-0">${item.quote}</p>
        <footer class="blockquote-footer">${item.author}</footer>
        <br>
        <button class='btn-success' id="${item.id}">Likes:${item.likes.length}</button>
      <button class='btn-danger' id="${item.id}">Delete</button>
      </blockquote >
    </li > `
      } )
      quoteList.innerHTML += newQuoteHTML
    } )
} )






