fetch('news.json')
.then(res => res.json())
.then(data => {

let container =
document.getElementById("news-container");

data.forEach(news => {

container.innerHTML += `
<div class="news-card">

<img src="${news.image}" alt="">

<h2>${news.title}</h2>

<p>${news.description}</p>

<a href="${news.link}" target="_blank">
Read More
</a>

</div>
`;

});

});
