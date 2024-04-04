let databox=document.getElementById("data-box");


/*
<div id="data-box">
    <div class="data-cell" id="cell-1">
        <div class="data-value name">
            <img src="">
            <span>Bitcoin</span>
        </div>
        <div class="data-value symbol">
            <span>BTC</span>
        </div>
        <div class="data-value amt">
            <span>$20023</span>
        </div>
        <div class="data-value total-amt">
            <span>$28,534,462,145</span>
        </div>
        <div class="data-value percentage">
            <span>3.79%</span>
        </div>
        <div class="data-value mkt-cap">
            <span>Mkt Cap:$382,801,405,357</span>
        </div>
    </div>
</div>
*/


function renderData(data) {
    for(let i=0;i<data.length;i++) {
        let product = data[i];
        let img=`${product.image}`;
        let sym=`${product.symbol}`;
        let a=sym.toUpperCase();

        let datacell=document.createElement("div");
        datacell.innerHTML=`<div class="data-value name">
    <img src="${img}">
    <span class="proname">${product.name}</span>
</div>
<div class="data-value symbol">
    <span class="prosymbol">${a}</span>
</div>
<div class="data-value amt">
    <span>$${product.current_price}</span>
</div>
<div class="data-value total-amt">
    <span>$${product.total_volume}</span>
</div>
<div class="data-value percentage">
    <span>${product.price_change_percentage_24h}%</span>
</div>
<div class="data-value mkt-cap">
Mkt Cap: $ <span class="mktcapvalue">${product.market_cap}</span>
</div>`

        datacell.className="data-cell";
        datacell.id="cell-"+i;
        databox.appendChild(datacell);

    }

    
}

fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
.then(response => response.json())
.then((data) => renderData(data));



/*
async function fetchValue() {
    let response=await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
    let data=await response.json();
    console.log(data);
    renderData(data);
}

fetchValue();
*/


//Search- DEBOUNCING
let pronameArray=document.getElementsByClassName("proname");
let autosug=document.getElementById("autosuggest");


const src = (event) => {
    //console.log(event.target.value);
    let sub=event.target.value;
    let sugbox=document.createElement("div");
    for(let i=0;i<10;i++) {
        let ar=pronameArray[i].innerText;
        //console.log(ar);
        if(ar.includes(sub))
        {
            autosug.style.display="block";
            let suggestion=document.createElement("div");
            suggestion.innerText=`${ar}`;
            sugbox.append(suggestion);
        }
        
        autosug.appendChild(sugbox);
    } 
    
    
}

function debouncing(oldfn,delay) {
    let id;
    return function(...par) {
        clearTimeout(id);
        id=setTimeout(()=> {
            oldfn(...par);
        },delay);
    };
}

let betterfun = debouncing(src,500);



//sort Market cap



let sortmkt=document.getElementById("sortmkt");
let makcap=document.getElementsByClassName("mktcapvalue");
let btm=document.getElementById("bottom");
let mkcapArr=[];


sortmkt.addEventListener("click",() => {
    for(let i=0;i<10;i++) {
        mkcapArr[i]=makcap[i].innerText;
    }
    console.log(mkcapArr);

    for(j=9;j>=0;j--) {
        let tag = makcap[j].parentNode.parentNode; 

        databox.remove();
        let datacont=document.createElement("div");
        datacont.append(tag);
        console.log(datacont);
    }
    btm.append(datacont);
})







//sort percentage

let sortprt=document.getElementById("sortprt");
let per=document.getElementsByClassName("percentage");


sortprt.addEventListener("click",() => {

})




/*
  for(j=9;j>=0;j++) {
        //for(let i=0;i<10;i++) {
            //if(mkcapArr[j] == makcap[i].innerText) {
                let tag = makcap[j].parentNode; 
                console.log(tag);
            //}
        //}

    }
    */


