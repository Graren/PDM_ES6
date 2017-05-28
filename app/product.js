class Product {

    constructor(id,name,provider,price,date){
        const v = {
            id,
            name,
            provider,
            price,
            date
        }
        this.values = v
    }

    set values(v){
        this._values = v
    }

    get values(){
        return this._values
    }

}

//export default Product