const base_url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/inr.json";
const dropdown=document.querySelectorAll(".dropdown select");
const imgfrom=document.querySelector("#imgfrom");
const imgto=document.querySelector("#imgto");
const btn=document.querySelector("#msg button");
let msg=document.querySelector("#msg h2");
let exchange=document.querySelector("i");

exchange.addEventListener("click", (evt)=>{
    evt.preventDefault();
    let c1=dropdown[0].value.toLowerCase();
    let c2=dropdown[1].value.toLowerCase();
    dropdown[0].value=c2.toUpperCase();
    updateFlag(dropdown[0]);
    dropdown[1].value=c1.toUpperCase();
    updateFlag(dropdown[1]);
    console.log("exchanged");
})

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    if(amount.value ==="" || amount.value<1){
        amount.value=1;
        amount.value="1";

    }
    let c1=dropdown[0].value.toLowerCase();
    let c2=dropdown[1].value.toLowerCase();
    let url=`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${c1}/${c2}.json`;
    let val = await fetch(url);
    let final= await val.json();
    let finalval=amount.value*final[c2];
    msg.innerText=`${amount.value} ${c1.toUpperCase()} = ${finalval} ${c2.toUpperCase()}`;

});


const updateFlag=(element)=>{
    
   let country=countryList[element.value];
   if(element.name==="from"){imgfrom.src=`https://flagsapi.com/${country}/flat/64.png`;}
   else if(element.name==="to"){imgto.src=`https://flagsapi.com/${country}/flat/64.png`; }
}
for(select in dropdown){
    
    for(code in countryList){
        let newop=document.createElement("option");
        newop.innerText=code;
        newop.value=code;
        if(dropdown[select].name==="from" && code==="USD"){
            newop.selected="selected";
        }
        else if(dropdown[select].name==="to" && code==="INR"){
            newop.selected="selected";
        }
        dropdown[select].append(newop);
    }
    dropdown[select].addEventListener("change" ,(evt)=>{
        updateFlag(evt.target);

    })

}
