const fromText=document.querySelector(".from-text");
toText=document.querySelector(".to-text");
selectTag=document.querySelectorAll("select");
exchangeIcon=document.querySelector(".exchange");
translateBtn=document.querySelector("button"),
icons=document.querySelectorAll(".row i");

selectTag.forEach((tag, id)=>{
    for(const country_code in countries){
        //Selcting English by default as FROM language and Hindi as TO language
        let selected;
        if(id==0 && country_code=="en-GB")
        {
            selected="selected";
        }
        else if(id==1 && country_code=="hi-IN"){
            selected="selected";
            
        }
        let option=`<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend",option); //adding option tag inside select tag
       
    }
});

exchangeIcon.addEventListener("click",()=>{
    //exchanging text area and select tag values
    let tempText=fromText.value;
    tempLang=selectTag[0].value;
    fromText.value=toText.value;
    toText.value=tempText;
    selectTag[0].value=selectTag[1].value;
    selectTag[1].value=tempLang;


});
fromText.addEventListener("keyup",()=>{
    if(!fromText.value){
        toText.value="";
    }

});

translateBtn.addEventListener("click", ()=>{
    let text=fromText.value, //check
    translateFrom=selectTag[0].value,//getting from select tag value
    translateTo=selectTag[1].value;  //getting toselect tag value
    if(!text) return;
    toText.setAttribute("placeholder","Translating...");

    //using Api to convert language to another language
    //website url=https://mymemory.translated.net/doc/spec.php
    //api url=`https://api.mymemory.translated.net/get?q=Hello World!&langpair=en|it`

    let apiUrl=`https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;

    //fetching api response and returning it with parsing into js object //and in another method receiving that object.

    fetch(apiUrl).then(res=>res.json()).then(data=>{
        
        toText.value =data.responseData.translatedText;
        toText.setAttribute("placeholder","Translation");



    });


});

//copy text  & speech text coding
icons.forEach(icon=>{
    icon.addEventListener("click",({target})=>{
        if(target.classList.contains("fa-copy")){
            // if clicked icon has from id, copy the fromTextarea value else copy the toTextarea value
            if(target.id=="from"){
                navigator.clipboard.writeText(fromText.value);
            }
            else{
                navigator.clipboard.writeText(toText.value);
            }
        }
        else{
            let utterance;
            // if clicked icon has from id, speak fromTextarea value else speak the toTextarea value
            if(target.id=="from"){
                utterance=new SpeechSynthesisUtterance(fromText.value);
                utterance.lang=selectTag[0].value; // setting utterance language to fromSelect tag value.
            }
            else{
                utterance=new SpeechSynthesisUtterance(toText.value);
                utterance.lang=selectTag[1].value; //setting utterance language to toSelect tag value.

            }
             // speak the passed utterance
             speechSynthesis.speak(utterance);


        }

    });

});






