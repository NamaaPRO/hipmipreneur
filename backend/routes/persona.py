from flask import Blueprint, request, jsonify
from ai import AIBackend

bp = Blueprint('persona', __name__)
ai = AIBackend()

@bp.route('/api/persona', methods=['POST'])
def generate_persona():
    data = request.json
    idea = data.get('idea')
    
    result = ai.generate_persona(idea)
    return jsonify(result)
