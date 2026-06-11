import feedparser
import json
import random

feeds = [
    "https://feeds.bbci.co.uk/news/rss.xml"
]

news = []

for url in feeds:
    feed = feedparser.parse(url)

    for item in feed.entries[:20]:

        news.append({
            "title": item.title,
            "description": item.get("summary", ""),
            "link": item.link,
            "image": "https://picsum.photos/600/400",
            "category": random.choice([
                "Politics",
                "Sports",
                "Business",
                "Technology"
            ])
        })

with open("news.json", "w", encoding="utf-8") as f:
    json.dump(news, f, ensure_ascii=False, indent=2)

print("News updated successfully")
