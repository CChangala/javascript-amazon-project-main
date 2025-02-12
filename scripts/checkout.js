import {cart,removeFromCart} from '../data/cart.js';
import { products } from '../data/products.js';
import { convertMoney } from './utils/money.js';

const orderSumary = document.querySelector('.js-order-product-summary');
let orderSumaryHTML ='';
cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct='';
    products.forEach((product)=>{
        if(product.id === productId){
            matchingProduct = product;
        }
    });
    orderSumaryHTML += `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>
            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">
              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${(matchingProduct.priceCents/100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity">
                    Update
                  </span>
                  <span class="delete-quantity-link  link-primary js-delete-link" data-product-id=${matchingProduct.id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
});

orderSumary.innerHTML = orderSumaryHTML;
console.log(orderSumaryHTML);

const paymentSummary = document.querySelector('.js-order-payment-summary');
let paymentSummaryHtml = '';
let total = 0;
let quantity = 0;
let shipping = 0;
cart.forEach((cartItem)=>{
    const productId = cartItem.productId;
    const tax = 10;
    products.forEach((product)=>{
        if(product.id === productId){
            total += cartItem.quantity*product.priceCents;
            quantity +=cartItem.quantity;
        }
    });
    if(total/100<50){
        shipping = 499;
    }

    paymentSummaryHtml =`
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${quantity}):</div>
            <div class="payment-summary-money">$${convertMoney(total)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${convertMoney(shipping)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${convertMoney(total+shipping)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$4.77</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${convertMoney(total+shipping+477)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;
});
paymentSummary.innerHTML = paymentSummaryHtml;
document.querySelectorAll('.js-delete-link')
    .forEach((link)=>{
        link.addEventListener('click',()=>{
            const productId = link.dataset.productId;
            removeFromCart(productId);
            const delteId = document.querySelector(`.js-cart-item-container-${productId}`);
            delteId.remove();
        });
});

