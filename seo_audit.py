import requests
from bs4 import BeautifulSoup
import sys
from urllib.parse import urlparse, urljoin
import time

def audit_page(url):
    print(f"Starting audit for: {url}")
    print("-" * 50)

    try:
        start_time = time.time()
        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'})
        load_time = time.time() - start_time
        
        # 1. Status Code
        print(f"Status Code: {response.status_code}")
        if response.status_code != 200:
            print("❌ Page could not be accessed successfully.")
            return

        soup = BeautifulSoup(response.content, 'html.parser')
        
        # 2. Performance (Basic)
        print(f"Load Time: {load_time:.2f} seconds")
        if load_time > 2.0:
            print("⚠️ Page load time is slow (> 2 seconds).")
        else:
            print("✅ Load time is good.")

        # 3. Title Tag
        title = soup.find('title')
        if title:
            print(f"Title: {title.string.strip()}")
            if len(title.string) > 60:
                print("⚠️ Title is too long (recommended < 60 chars).")
            elif len(title.string) < 10:
                print("⚠️ Title is too short.")
            else:
                print("✅ Title length is optimal.")
        else:
            print("❌ Missing Title tag!")

        # 4. Meta Description
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        if meta_desc and meta_desc.get('content'):
            content = meta_desc.get('content').strip()
            print(f"Meta Description: {content}")
            if len(content) > 160:
                print("⚠️ Meta description is too long (recommended < 160 chars).")
            elif len(content) < 50:
                print("⚠️ Meta description might be too short.")
            else:
                print("✅ Meta description length is optimal.")
        else:
            print("❌ Missing Meta Description!")

        # 5. Heading Structure (H1)
        h1_tags = soup.find_all('h1')
        print(f"H1 Tags found: {len(h1_tags)}")
        if len(h1_tags) == 0:
            print("❌ No H1 tag found. Each page should have exactly one H1.")
        elif len(h1_tags) > 1:
            print("⚠️ Multiple H1 tags found. Recommended to have only one per page.")
        else:
            print(f"✅ H1: {h1_tags[0].get_text().strip()}")

        # 6. Images and Alt Text
        images = soup.find_all('img')
        missing_alt = 0
        for img in images:
            if not img.get('alt'):
                missing_alt += 1
        
        print(f"Total Images: {len(images)}")
        if missing_alt > 0:
            print(f"⚠️ {missing_alt} images are missing 'alt' text.")
        else:
            print("✅ All images have alt text.")

        # 7. Internal/External Links
        links = soup.find_all('a')
        print(f"Total Links: {len(links)}")
        
    except Exception as e:
        print(f"❌ Error auditing page: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        target_url = sys.argv[1]
    else:
        target_url = input("Enter the website URL to audit (e.g., https://example.com): ")
    
    if not target_url.startswith(('http://', 'https://')):
        target_url = 'https://' + target_url
        
    audit_page(target_url)
