from flask import Blueprint, request, jsonify
from ai import AIBackend

bp = Blueprint('deck', __name__)
ai = AIBackend()


@bp.route('/api/deck', methods=['POST'])
def generate_deck():
    data = request.json
    idea = data.get('idea')
    canvas = data.get('canvas', {})
    persona = data.get('persona', {})
    roadmap = data.get('roadmap', {})
    
    result = ai.generate_deck(idea, canvas, persona, roadmap)
    return jsonify(result)
