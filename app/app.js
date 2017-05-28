//import Product from './app/product.js

const p = new Product(1,"name","prov",0.00,new Date('01-04-2017'))
const { id } = p.values

const addButton = document.querySelector('#addButton')

const input = {
    id: document.querySelector('#idInput'),
    name: document.querySelector('#nameInput'),
    provider: document.querySelector('#providerInput'),
    price: document.querySelector('#priceInput'),
    date: document.querySelector('#dateInput')
}

const checkBox = {
    id: document.querySelector('#idCheck'),
    name: document.querySelector('#nameCheck'),
    provider: document.querySelector('#providerCheck'),
    price: document.querySelector('#priceCheck'),
    date: document.querySelector('#dateCheck')
}

const table= document.querySelector("#table");

const state = {
    products: window.localStorage.products && JSON.parse(window.localStorage.products) || [],
    orderBy: 'id',
    input: {
        id: 0,
        name :'',
        provider: '',
        price: 0.00,
        date: new Date()
    }
}

Object.values(input).forEach( element =>{
    element.onchange = (e) => {
        state.input[e.target.name] = e.target.value
    }
});

console.group('state')
console.log(state)
console.groupEnd()
console.group('localStorage')
console.log(window.localStorage)
console.groupEnd

addButton.onclick = e => {
    let product = new Product(
        state.input.id,
        state.input.name,
        state.input.provider,
        state.input.price,
        state.input.Date
    )
    state.products.push(product.values)
    window.localStorage.products = JSON.stringify(state.products)
    
}

const init = () =>{
    let { products } = state
    state.input.id = products.length + 1
    input.id.min = state.input.id
    input.id.value= state.input.id
    input.date.value = setInputDate()
    render()
}

const setInputDate = () => {
    let d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

const render = () => {
    const rowCount = table.rows.length
    let templateRow = table.rows[0]
    const { products } = state
    products.forEach( e => {
        console.log(e)
        const { id, name, provider, price, date } = e
        const arr = [id, name, provider, price, date]
        let row = table.insertRow()
        for( ind = 0 ; ind < templateRow.cells.length ; ind++){
            let cell = row.insertCell()
            cell.textContent = `${arr[ind]}`;
        }

    })
    
}

init()
