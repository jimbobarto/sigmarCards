from flask import Flask
from flask import render_template, request, jsonify
from os import listdir
from os.path import isfile, join
app = Flask(__name__)


@app.route('/')
def hello_world():
	cards = [f for f in listdir('static/images/library/') if isfile(join('static/images/library/', f))]
	cards.sort()
	return render_template('drag.html', cards=cards)

@app.route('/_get_cards')
def get_cards():
	search_string = request.args.get('search_string')
	prefixed_cards = [filename for filename in listdir('static/images/library/') if filename.startswith(search_string)]
	prefixed_cards.sort()
	return jsonify(prefixed_cards)

@app.route('/_get_all_cards')
def get_all_cards():
	cards = [f for f in listdir('static/images/library/') if isfile(join('static/images/library/', f))]
	cards.sort()
	return render_template('card-list.html', cards=cards)