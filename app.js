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
);
