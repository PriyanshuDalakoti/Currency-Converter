const base_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";
let dropdowns=document.querySelectorAll(".dropdown select");
let btn=document.querySelector("form button")
let fromCurr=document.querySelector(".from select")
let toCurr=document.querySelector(".to select")
let msg=document.querySelector(".msg")

for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption=document.createElement("option")
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name=="from"&&currCode=="USD"){
            newOption.selected="selected"
        }
        else if(select.name=="to"&&currCode=="INR"){
            newOption.selected="selected"
        }
        select.append(newOption) 
    }
        select.addEventListener("change", (evt) => {
            updateFlag(evt.target);
        });
}

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}
const updateExchangeRate=async ()=>{
    let amount=document.querySelector(".amount input")
    let amtVal=amount.value;
    if(amtVal==""||amtVal<0){
        amtVal=1;
        amount.value=1;
    }
    const URL=`${base_URL}/currencies/${fromCurr.value.toLowerCase()}.json`
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount=rate*amtVal;
    msg.innerText=`${amtVal} ${fromCurr.value}=${finalAmount} ${toCurr.value}`;
}
btn.addEventListener("click", (event)=>{
    event.preventDefault();
    updateExchangeRate();
    
})

window.addEventListener("load",()=>{
    updateExchangeRate();
});