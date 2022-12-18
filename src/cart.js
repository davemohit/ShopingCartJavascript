let data = JSON.parse(localStorage.getItem("item")) || [];
console.log(data);


let cartValue = document.querySelector(".cartAmount");
let label = document.getElementById('label');
let shopingCart = document.getElementById('shopping-cart');


let itemsData = [{
    id : "dj",
    name:"Denim jense",
    price:45,
    des:"Van Heusen Denim Labs quirky design",
    img:"image/alicia-petresc-BciCcl8tjVU-unsplash.jpg"
},
{
    id : "er",
    name:"Earing",
    price:70,
    des:"jewellery which you attach to your ears",
    img:"image/daihana-monares-rH9qDj0ZHaU-unsplash.jpg"

},
{
    id : "tk",
    name:"Track Suit",
    price:30,
    des:"tracksuit for ladies in trendy colors",
    img:"image/dom-hill-nimElTcTNyY-unsplash.jpg"

},
{
    id : "ts",
    name:"Black T-shirt",
    price:25,
    des:"Roadster black t shirt for men",
    img:"image/faith-yarn-Wr0TpKqf26s-unsplash.jpg"

}]





let allItem =() => {

    //  console.log(cartValue);
      totalItem = data.map((x)=> x.item);
      console.log(totalItem);
     // console.log(totalItem.length);
     
      for(let i=totalItem.length-1;i<totalItem.length;i++){
          if(totalItem[i]>1){
              sum = (totalItem[i]-(totalItem[i]-1)) + sum;
          }
          else{
              sum = totalItem[i]+sum;
          }
          console.log(sum);   
  
          
      }
       localStorage.setItem("itemValue",JSON.stringify(totalItem));
       localStorage.setItem("value",JSON.stringify(sum));
       //console.log(typeof(localStorage.value));
          cartValue.innerHTML = sum;
       
       //console.log(parseInt(localStorage.value));
  
       generateCart();
  
    
  };

    totalItem = JSON.parse(localStorage.getItem("itemValue"));
    sum = JSON.parse(localStorage.getItem("value"));
    cartValue.innerHTML = sum;

    window.addEventListener("load",(event) =>{
        let x  = JSON.parse(localStorage.getItem("value"));
        cartValue.innerHTML = x;
        console.log(x);
    
    });
    
    let generateCart = () =>{
        if(data.length!==0){
            return (shopingCart.innerHTML=data.map((x)=>{
              //  console.log(x);
                let {id, item,price} =x;
                let search = itemsData.find((a) => a.id === id) || [];
                console.log(search);
                return `
            <div class = "cart-item">
                <img width="100"src="${search.img}" alt="" />
                <div class="details">
                 <div class="itemprice-title">
                  <h3 class="price-title">
                    <p>${search.name}</P>
                    <p class="item-price">$ ${search.price}</p>
                    
                  </h3>
                
                  <i onclick="removeItem(${id},${item})"class="bi bi-x-lg"></i>
                
                </div>

                <div class="buttons">
                    <i class="bi bi-dash-lg" onclick = "decrement(${id},${search.price})"></i>
                    <div id=${id} class="quantity">${item}</div>
                    <i class="bi bi-plus-lg" onclick = "increment(${id},${search.price})"></i>
                </div>

                <h3>$ ${price}</h3>
               
                
                
               </div>
            </div>   
                `;
            })
            .join(""));
                
                
        }else{
            shopingCart.innerHTML = ``;
            label.innerHTML = `
            <h2> Cart is empty</h2>
            <a href = "index.html">
              <button class = "homeBtn"> Back to home </button>
            </a>  
            
            `; 
        }
    }
    generateCart();

    let increment = (id,price) => {
        let itemId = id;
        let itemPrice = price;
        console.log(price);
        let itemquantity = id.innerHTML;
      //  console.log(itemquantity);
        itemquantity++;
        id.innerHTML=itemquantity;
         
        let dupId = data.find((x) => x.id === itemId.id);
        if(dupId === undefined){
    
         data.push({
            id: itemId.id,
            item:itemquantity,
            price:itemPrice,
        });
    }
        else{
            dupId.item = dupId.item+1;
            dupId.price = dupId.price+itemPrice;
        }
        console.log(data);
        localStorage.setItem("item",JSON.stringify(data));
        allItem();
        calculateTotalPrice();
      /*  let x  = localStorage.getItem("value");
        x = parseInt(localStorage.value);
        cartValue.innerHTML = x;*/
    };
    let decrement =(id,price) => {
        let itemId = id;
        let itemPrice = price;
    
       // console.log(itemPrice);
       // console.log(itemId);
       let itemquantity = id.innerHTML;
       if(itemquantity==0){
        id.innerHTML = itemquantity;  
       }
       else{
       itemquantity--;
       id.innerHTML=itemquantity;
       let dupId = data.find((x) => x.id === itemId.id);
        //console.log(dupId);
        //console.log(dupId.item);
        dupId.item -=1; 
        let originalPrice = itemPrice;
        dupId.price = dupId.price-itemPrice;
    
        sum-=1;
        cartValue.innerHTML=sum;
        console.log(data);
        
        data = data.filter((x) => x.item !==0);
        localStorage.setItem("value",JSON.stringify(sum));
    
        localStorage.setItem("item",JSON.stringify(data));
     
        }
        generateCart();
        calculateTotalPrice();
        
    
      //  console.log(sum);
       
       
    };

    let removeItem = (id,item) =>{
        let selectedItem = id;
        //console.log(selectedItem.id);
       data = data.filter((x) => x.id !== selectedItem.id);
      // console.log(data);
       localStorage.setItem("item",JSON.stringify(data));
       generateCart();
       cartValue.innerHTML = cartValue.innerHTML-item;
       sum = sum-item;
       
       console.log(sum);

       localStorage.setItem("value",JSON.stringify(sum));
    }
    let totalBil = document.getElementById("label");

    let calculateTotalPrice= ()=>{
        itemTotalPrice = 0;

        totalPrice = data.map((x)=> x.price);
        console.log(totalPrice);
        for(i=0; i<totalPrice.length; i++){
            itemTotalPrice += totalPrice[i];

        }
        console.log(itemTotalPrice); 
        totalBil.innerHTML = `
        <h2> Total Bill : $ ${itemTotalPrice}</h2>
        <button onclick="checkOut()" class="checkout">Checkout</button>
        <button onclick= "clearCart()" class ="clearCart">Clear Cart</button>
        `

        generateCart();
        }
    calculateTotalPrice();
    let clearCart= () =>{
        data = [];

        generateCart();
        localStorage.setItem("item", JSON.stringify(data));
        localStorage.clear();
        cartValue.innerHTML = 0;
    }
    let checkOut=() =>{
        window.location.replace("src/checkout.html");
        clearCart();
    }

