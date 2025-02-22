import {menuArray} from '/data.js'

const itemList = document.getElementById('item-list') //div render menu
const cartList = document.getElementById('render-cart-items') //div render cart
const hidden = document.getElementById('hidden')
const totalPrice = document.getElementById('total-price')
const completeButton = document.getElementById('complete-btn')
const cardDetails = document.getElementById('card-details')
let addedToCartItems = []

document.addEventListener('click', function(e){
    if(e.target.dataset.buy){
        addItemsToShoppingCart(e.target.dataset.buy)
        hidden.style.display ='block'
    }else if(e.target.dataset.remove){
        removeItemFromCart(e.target.dataset.remove)
    }
})

completeButton.addEventListener('click',function(){
    cardDetails.style.display = 'inline'
})

document.addEventListener('submit', function(e){
    e.preventDefault()
    
    const cardData = new FormData(document.getElementById('form'))
    const cardName = cardData.get('card-name')
    
    cardDetails.style.display = 'none'
    hidden.style.display ='none'
    
    document.getElementById("order-coming-message").innerHTML = 
    `<p class='order-message'>Thanks, ${cardName}, Your order is on its way!</p>`
    addedToCartItems = []    
    renderCart()
})

function addItemsToShoppingCart(itemId){
    const addedItem = menuArray.filter(function(item){
        return item.id == itemId  
    })[0]
    addedToCartItems.push(addedItem)   
    renderCart()
}

function renderCart(){    
    render()
    let shoppingCart = ''
    addedToCartItems.forEach(function(item, index){
        shoppingCart += 
            `<div class="cart-items" id="cart-items">
                <div class = 'item-and-remove'>
                    <p class='cart-item-name'> ${item.name}</p>
                    <button 
                        type='button' 
                        class='remove-btn' 
                        id='remove-btn'
                        data-remove='${index}'
                        >remove
                    </button>
                </div>
                    <p class='cart-item-name'><span class='dollar-sign-cart'>$
                    </span>${item.price}</p>                
             </div>`             
    })
    cartList.innerHTML = shoppingCart
    addingOfPrices()
}

function removeItemFromCart(ItemIndex){
    addedToCartItems.splice(ItemIndex, 1)
    if(addedToCartItems.length === 0){
        hidden.style.display ='none'
    }
    renderCart()
}

function addingOfPrices(){
    let prices = 0 
    addedToCartItems.forEach(function(item){
        prices += item.price
    })
    totalPrice.textContent =  '$ ' + prices
}

function getMenuHtml(){
    let menuHtml = ''
    menuArray.forEach(function(item){
        menuHtml += `<div class='shop-item-line'>
                <div class='shop-item'>
                    <img src='${item.emoji}' class='emoji'>
                    <div class='item-info'>
                        <p class='item-name'>${item.name}</p>
                        <p class='item-ingredients'>${item.ingredients}</p>
                        <p class='item-price'><span class='dollar-sign'>$</span>${item.price}</p>
                    </div>
                </div>
                    <button 
                        data-buy='${item.id}'
                        type='button' 
                        class='add-btn' 
                        id='add-btn'>+
                    </button>
            </div>`
    })
    return menuHtml
}

function render(){
    itemList.innerHTML = getMenuHtml()
}

render()