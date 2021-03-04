from flask import Flask, render_template, request
import random

app = Flask(__name__)

@app.route("/")
def index():
    r=[]

    for i in range(3010):
        r.append(i)

    random.shuffle(r)

    w = r[:36]
    return render_template("index.html", w=w)

@app.route("/main")
def go():
    w = request.args.getlist("w")
    a0 = request.args.getlist("a")
    a1 = request.args.getlist("b")
    a2 = request.args.getlist("c")
    a3 = request.args.getlist("d")
    return render_template("main.html",w=w, a0=a0, a1=a1, a2=a2, a3=a3)