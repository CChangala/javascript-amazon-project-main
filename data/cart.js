export const cart =[ 
]
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
        console.log(cart);
}