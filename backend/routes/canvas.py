from flask import Blueprint, request, jsonify
from ai import AIBackend

bp = Blueprint('canvas', __name__)
ai = AIBackend()

@bp.route('/api/canvas', methods=['POST'])
def generate_canvas():
    data = request.json
    idea = data.get('idea')
    analysis = data.get('analysis', {})
    
    result = ai.generate_canvas(idea, analysis)
    return jsonify(result)
