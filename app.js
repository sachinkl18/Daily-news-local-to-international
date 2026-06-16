let allNews=[];
let currentLanguage = "kn";

fetch("news.json")
.then(res => res.json())
.then(data => {

    data.sort((a,b)=>
        new Date(b.date)-new Date(a.date)
    );

    allNews=data;

    renderNews(data);

    if(data.length>0){

        document.getElementById(
            "breakingNews"
        ).innerText=data[0].title;

    }

});

function renderNews(news){

let container=
document.getElementById(
"news-container"
);

container.innerHTML="";

news.forEach(article=>{

container.innerHTML+=`

<div class="news-card">

<img src="${article.image}" alt="">

<div class="news-content">

<h3>${currentLanguage === "kn"
 ? article.title_kn
 : article.title_en}</h3>
<p>${currentLanguage === "kn"
 ? article.description_kn
 : article.description_en}</p>

<p>
<b>Category:</b>
${article.category || "General"}
</p>

<p>
<b>District:</b>
${article.district || "Karnataka"}
</p>
<a href="${article.link}"
target="_blank">
Read More
</a>

</div>

</div>

`;

});

}

document.getElementById(
"search"
).addEventListener(
"input",
function(){

let keyword=
this.value.toLowerCase();

let filtered=
allNews.filter(news=>

news.title.toLowerCase()
.includes(keyword)

);

renderNews(filtered);

}
);

document.getElementById(
"categoryFilter"
).addEventListener(
"change",
function(){

let category=
this.value;

if(category==="all"){
renderNews(allNews);
return;
}

let filtered=
allNews.filter(news=>

(news.category || "")
===category

);

renderNews(filtered);

}
);

document.getElementById(
"darkModeBtn"
).addEventListener(
"click",
()=>{

document.body.classList.toggle(
"dark"
);

}
);
document.getElementById(
"districtFilter"
).addEventListener(
"change",
function(){

let district=this.value;

if(district==="all"){
renderNews(allNews);
return;
}

let filtered=
allNews.filter(news=>

news.district===district

);

renderNews(filtered);

}
);let kannada=false;

document.getElementById(
"langBtn"
).addEventListener(
"click",
()=>{

kannada=!kannada;

if(kannada){

document.querySelector("h1")
.innerText=
"📰 ನಮ್ಮ ಕರ್ನಾಟಕ ಸುದ್ದಿ";

}else{

document.querySelector("h1")
.innerText=
"📰 Namma Karnataka News";

}

}); function shareNews(title){

window.open(
`https://wa.me/?text=${encodeURIComponent(title)}`,
'_blank'
);

}
fetch("https://wttr.in/Bangalore?format=j1")
.then(res=>res.json())
.then(data=>{

document.getElementById("weather").innerHTML=

`🌦 Bengaluru:
${data.current_condition[0].temp_C}°C`;

});
setInterval(() => {
    location.reload();
}, 900000);

function setLanguage(lang) {
    currentLanguage = lang;
    renderNews(allNews);
}
