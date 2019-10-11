# sigmarCards

Once you've cloned this repository locally, install virtualenv (if you see 'python2' or 'python3' in any of these instructions, just type 'python'):
http://flask.pocoo.org/docs/1.0/installation/#install-install-virtualenv

You'll also need to install the Flask package:
```
pip install Flask
```

Now (as per http://flask.pocoo.org/docs/1.0/installation/#python-version):

cd into the project directory and run the following commands

```
virtualenv venv
```
```
. venv/bin/activate
```
```
export FLASK_APP=sigmar.py
```

OMG - you should be ready to go now...

Just type:
```
flask run --host=0.0.0.0
```

(This last command has an extra argument in case you want to access the page on a different device on the same network)
