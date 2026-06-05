from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Import routes
from routes import analyze, canvas, persona, roadmap, deck

app.register_blueprint(analyze.bp)
app.register_blueprint(canvas.bp)
app.register_blueprint(persona.bp)
app.register_blueprint(roadmap.bp)
app.register_blueprint(deck.bp)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
