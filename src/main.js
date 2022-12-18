let shop = document.getElementById("shop");
let itemData = 0;
let sum = 0;

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

//let data = [];
let data = JSON.parse(localStorage.getItem("item")) || [];

let generateItem = () => {
    return(shop.innerHTML =  itemsData.map((x)=>{
        let {id,name,price,des,img} = x;

        let search = data.find((x)=>x.id === id) || [];
        return `
        <div id=productId-${id} class="item">
        <img width = "200" src="${img}"/>
        <div class="details">
            <h3>${name}</h3>
            <p>${des}</p>
            <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons">
                    <i class="bi bi-dash-lg" onclick = "decrement(${id},${price})"></i>
                    <div id=${id} class="quantity">
                   ${search.item === undefined? 0: search.item}
                    </div>
                    <i class="bi bi-plus-lg" onclick = "increment(${id},${price})"></i>
                </div>
            </div>
        </div>
    </div>
        `
    }).join(""));
}
generateItem();


let cartValue = document.querySelector(".cartAmount");

let increment = (id,price) => {
    let itemId = id;
    let itemPrice = price;
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
  /*  let x  = localStorage.getItem("value");
    x = parseInt(localStorage.value);
    cartValue.innerHTML = x;*/
};

    
  //  console.log(dupId.id);
   // console.log(data);

   

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

  //  console.log(sum);
   
   
};
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



  
};
totalItem = JSON.parse(localStorage.getItem("itemValue"));
sum = JSON.parse(localStorage.getItem("value"));
console.log(totalItem);
console.log(sum);

 window.addEventListener("load",(event) =>{
    let x  = JSON.parse(localStorage.getItem("value"));
    cartValue.innerHTML = x;
    console.log(x);

});  




