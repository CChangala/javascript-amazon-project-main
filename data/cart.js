export let cart = JSON.parse(localStorage.getItem('cart'));
if(!cart){
    cart = [ 
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity:2
            },
            {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity:2
            }
        ];
}
function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(button){
    const productId = button.dataset.productId;
        
        let found = false; // Flag to check if the product already exists in the cart

        // Loop over each item in the cart to check for existing product
        cart.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                cartItem.quantity += 1; // If found, increase the quantity
                found = true; // Set the flag to true
            }
        });

        if (!found) {
            // If not found, add a new product to the cart
            cart.push({
                productId: productId,
                quantity: 1
            });
        }
        saveToStorage(cart);
        console.log(cart);
}
export function removeFromCart(productId){
    cart.filter((cartItem,index)=>{
        if(productId === cartItem.productId){
            console.log(cart);
            cart.splice(index,1);
        }
    })
    saveToStorage(cart);
}