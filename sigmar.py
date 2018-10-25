from flask import Flask
from flask import render_template, request, jsonify
from os import listdir
from os.path import isfile, join
app = Flask(__name__)


@app.route('/')
def init():
	return render_template('drag.html', cards=get_all_cards())

@app.route('/_get_filtered_cards')
def get_filtered_cards():
	search_string = request.args.get('search_string')
	prefixed_cards = [filename for filename in listdir('static/images/library/') if (filename.find(search_string) > -1 and not (filename.startswith('.')))]
	prefixed_cards.sort()
	return render_template('card-list.html', cards=prefixed_cards)

@app.route('/_get_all_cards')
def get_all_cards():
	return render_template('card-list.html', cards=get_all_cards())

def get_all_cards():
	cards = [filename for filename in listdir('static/images/library/') if (isfile(join('static/images/library/', filename)) and not (filename.startswith('.')))]
	cards.sort()
	return cards

@app.route('/_get_dropped_card_template')
def get_dropped_card():
	img_src = request.args.get('img_src', '')
	print(img_src)
	return render_template('dropped-card.html', img_src=img_src)