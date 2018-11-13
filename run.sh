#!/usr/bin/env bash

. venv/bin/activate
export FLASK_APP=sigmar.py
flask run --host=0.0.0.0
