//import Product from './app/product.js

//HTML Selectors
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

const selector = document.querySelector('#order');

const table= document.querySelector("#table");
// HTML SELECTORS END

//STATE
const state = {
    products: window.localStorage.products && JSON.parse(window.localStorage.products) || [],
    orderBy: 'id',
    order: selector.value,
    input: {
        id: 0,
        name :'',
        provider: '',
        price: 0.00,
        date: new Date()
    }
}
//STATE END

//STARTUP
const init = () =>{
    let { products } = state
    state.input.id = products.length + 1
    input.id.min = state.input.id
    input.id.value= state.input.id
    input.id.min = state.input.id
    input.date.value = setInputDate()
    state.input.date = input.date.value
    checkBox.id.checked = true
    state.order = selector.value
    orderBy(state.orderBy,state.order)
    render()
}
//STARTUP END

//UTILITY METHODS
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
    const { products } = state
    products.forEach( e => {
        addProduct(productToArray(e))
    })
}

const productToArray = (product)=>{
    const { id, name, provider, price, date } = product
    return [id, name, provider, price, date]
} 

const addProduct= (product) => {
    const rowCount = table.rows.length
    let templateRow = table.rows[0]
    let row = table.insertRow()
    for( ind = 0 ; ind < templateRow.cells.length ; ind++){
        let cell = row.insertCell()
        cell.textContent = `${product[ind]}`;
    }
}

const orderByAscending = (order) => {
    switch(order){
        case 'id':
            state.products.sort( (a, b) => {
                 return a.id - b.id
            })
            break
        case 'name':
             state.products.sort( (a, b) => {
                 if (a.name < b.name)
                    return -1
                 if (a.name > b.name)
                    return 1
                 return 0
             })
             break;
        case 'provider':
             state.products.sort( (a, b) => {
                 if (a.provider < b.provider)
                    return -1
                 if (a.provider > b.provider)
                    return 1
                 return 0
             })
             break;
        case 'price':
            state.products.sort( (a, b) => {
                 return a.price - b.price
            })
            break
        case 'date':
            state.products.sort( (a, b) => {
                if (a.date < b.date)
                    return -1
                 if (a.date > b.date)
                    return 1
                 return 0
            })
            break
        default :
            state.products.sort( (a, b) => {
                    return a.id - b.id
                })
            break
    }
}

const orderByDescending = (order) => {
    switch(order){
        case 'id':
            state.products.sort( (a, b) => {
                 return b.id - a.id
            })
            break
        case 'name':
             state.products.sort( (a, b) => {
                 if (a.name > b.name)
                    return -1
                 if (a.name < b.name)
                    return 1
                 return 0
             })
             break;
        case 'provider':
             state.products.sort( (a, b) => {
                 if (a.provider > b.provider)
                    return -1
                 if (a.provider < b.provider)
                    return 1
                 return 0
             })
             break;
        case 'price':
            state.products.sort( (a, b) => {
                 return b.price - a.price
            })
            break
        case 'date':
            state.products.sort( (a, b) => {
                if (a.date > b.date)
                    return -1
                 if (a.date < b.date)
                    return 1
                 return 0
            })
            break
        default :
            state.products.sort( (a, b) => {
                    return b.id - a.id
                })
            break
    }
}

const orderBy = (orderParam,order) => {
    order === 'ascending' ? orderByAscending(orderParam) : orderByDescending(orderParam)
    clearTable()
}

const clearTable = () =>{
    const rowCount = table.rows.length
    for( let i = rowCount - 1; i > 0 ; i--){
        table.deleteRow(i)
    }
}
//UTILITY METHODS END

//EVENT HANDLERS
const onSelectorChange = (e) =>{
    state.order = selector.value
    orderBy(state.orderBy,state.order)
    render()
}
selector.onchange = onSelectorChange

Object.values(input).forEach( element =>{
    element.onchange = (e) => {
        state.input[e.target.name] = e.target.value
    }
});

Object.values(checkBox).forEach( element => {
    element.onclick = (e) =>{
        e.target.checked = true
        state.orderBy = e.target.name
        Object.values(checkBox).forEach( el => {
            if (e.target.name !== el.name){
                el.checked = false;
            }
        })
        orderBy(state.orderBy,state.order)
        render()
    }
})

addButton.onclick = e => {
    let product = new Product(
        state.input.id,
        state.input.name,
        state.input.provider,
        state.input.price,
        state.input.date
    )
    state.input.id++
    input.id.value++
    input.id.min++
    state.products.push(product.values)
    addProduct(productToArray(product.values))
    window.localStorage.products = JSON.stringify(state.products)
    orderBy(state.orderBy,state.order)
    render()
}
//EVENT HANDLERS END

//INITIALIZATION
init()

