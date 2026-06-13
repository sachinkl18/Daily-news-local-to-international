import json
import feedparser
from deep_translator import GoogleTranslator
from datetime import datetime

RSS_FEEDS = [
    "https://timesofindia.indiatimes.com/rssfeedstopstories.cms",
    "https://www.thehindu.com/news/national/feeder/default.rss",
    "https://feeds.bbci.co.uk/news/world/rss.xml",
    "https://feeds.bbci.co.uk/news/technology/rss.xml",
    "https://feeds.bbci.co.uk/news/business/rss.xml",
    "https://feeds.bbci.co.uk/sport/rss.xml"
]

news = []

for rss_url in RSS_FEEDS:
    feed = feedparser.parse(rss_url)

    for entry in feed.entries[:200]:

     title = entry.get("title", "")
description = entry.get("summary", "")

try:
    title_kn = GoogleTranslator(
        source='auto',
        target='kn'
    ).translate(title)

    description_kn = GoogleTranslator(
        source='auto',
        target='kn'
    ).translate(description)

except:
    title_kn = title
    description_kn = description

news.append({
    "title": title_kn,
    "description": description_kn,
    "link": entry.get("link", ""),
    "image": "https://placehold.co/600x400?text=News",
    "category": "News",
    "district": "Karnataka",
    "date": str(datetime.now())
})

with open("news.json", "w", encoding="utf-8") as f:
    json.dump(news, f, ensure_ascii=False, indent=2)

print(f"Saved {len(news)} news articles")
