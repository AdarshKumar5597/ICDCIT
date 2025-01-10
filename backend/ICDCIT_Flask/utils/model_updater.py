import os
from datetime import timedelta, datetime

import requests


def fetch_news(query, max_results, api_key):
    """
    Fetch news articles based on a query, maximum number of results, and an API key.

    :param query: Search query for the news articles.
    :param max_results: Maximum number of articles to fetch.
    :param api_key: API key for the GNews API.
    :return: A list of news articles (dictionaries) or an empty list in case of failure.
    """
    url = f"https://gnews.io/api/v4/search?q={query}&lang=en&country=in&max={max_results}&apikey={api_key}"
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for HTTP errors
        data = response.json()
        return data.get("articles", [])  # Return the articles list or an empty list
    except requests.exceptions.RequestException as e:
        print(f"Error fetching news for query '{query}': {e}")
        return []


def fetch_top_headlines(api_key):
    """
    Fetch top health headlines from the GNews API.

    :param api_key: API key for the GNews API.
    :return: A list of top headlines (dictionaries) or an empty list in case of failure.
    """
    url = f"https://gnews.io/api/v4/top-headlines?category=health&max=6&lang=en&country=in&apikey={api_key}"
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for HTTP errors
        data = response.json()
        return data.get("articles", [])  # Return the articles list or an empty list
    except requests.exceptions.RequestException as e:
        print(f"Error fetching top headlines: {e}")
        return []


def data_for_knowledge_graph(news):
    """
    Generate a text summary of news articles for a knowledge graph.

    :param news: A dictionary containing lists of articles for each news category.
    :return: A string representing the summarized knowledge graph data.
    """
    result = []
    counter = 1

    categories = [
        "topHeadlines",
        "featuredNews",
        "latestUpdates",
        "trendingTopics",
        "localNews",
        "research",
    ]

    for category in categories:
        if category in news and news[category]:
            for article in news[category]:
                title = article.get("title", "No Title")
                description = article.get("description", "No Description")
                url = article.get("url", "No url")
                content = article.get("content", "No content")
                result.append(f"{counter}. Title: {title}\nDescription: {description}\nSource: {url}\nContent:{content}")
                counter += 1

    result_str = "\n".join(result)
    print("Knowledge Graph Data:", result_str)
    return result_str.strip()



DATA_FILE = 'data/news_data.json'
UPDATE_INTERVAL = timedelta(minutes=15)

def is_data_stale(file_path):
    if not os.path.exists(file_path):
        return True
    file_mod_time = datetime.fromtimestamp(os.path.getmtime(file_path))
    return datetime.now() - file_mod_time > UPDATE_INTERVAL

def fetch_all_news():
    """
    Fetch all categories of news and generate the knowledge graph data.

    :return: A string representing the summarized knowledge graph data.
    """
    if not is_data_stale(DATA_FILE):
        with open(DATA_FILE, 'r') as file:
            return file.read()

    api_keys = [
        "c3255945b8a400c4ada809bf8c9a77f6",
        "e0f42cc8058ceaa71c98f2d66768d549",
        "8f67a17b728f0b1c2d9251d2207b132a",
        "b170075b49356751b249f03ab27ce6fb",
        "c8e4a55dc9cca278f39a35c3d27e2369",
        "c4ae9c7286ef10c2a565f5c67d64fba3",
        "d352a00b72619d1e4b0cdc540bc8e79e",
    ]

    news_data = {
        "featuredNews": fetch_news("HMPV", 5, api_keys[6]),
        "latestUpdates": fetch_news("recent+medicine", 6, api_keys[1]),
        "trendingTopics": fetch_news("latest+trends+health", 10, api_keys[2]),
        "localNews": fetch_news("India+health+updates", 8, api_keys[3]),
        "research": fetch_news("medical+research", 6, api_keys[4]),
        "topHeadlines": fetch_top_headlines(api_keys[5]),
    }
    data = data_for_knowledge_graph(news_data)

    with open(DATA_FILE, 'w') as file:
        file.write(data)

    return data


# Example usage
