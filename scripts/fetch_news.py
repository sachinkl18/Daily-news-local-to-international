import json
import feedparser
from datetime import datetime

RSS_FEEDS = [
    "https://feeds.bbci.co.uk/news/rss.xml",
    "https://timesofindia.indiatimes.com/rssfeedstopstories.cms",
    "https://www.thehindu.com/news/national/feeder/default.rss"
]

news = []

for rss_url in RSS_FEEDS:
    feed = feedparser.parse(rss_url)

    for entry in feed.entries[:100]:

        news.append({
            "title": entry.get("title", ""),
            "description": entry.get("summary", ""),
            "link": entry.get("link", ""),
            "image": "https://placehold.co/600x400?text=News",
            "category": "News",
            "district": "Karnataka",
            "date": str(datetime.now())
        })

with open("news.json", "w", encoding="utf-8") as f:
    json.dump(news, f, ensure_ascii=False, indent=2)

print(f"Saved {len(news)} news articles")
