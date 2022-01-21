import requests
from bs4 import BeautifulSoup
burge = requests.get("https://dining.uiowa.edu/burge-market-place")
soup = BeautifulSoup(burge.text, features="html.parser")
international_burge = soup.find(class_="panel panel-default marketplace-station marketplace-station-Burge-International")
foods = international_burge.find_all(class_="h6 menu-item-title")
for f in foods:
  print(f.text)