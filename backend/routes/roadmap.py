from flask import Blueprint, request, jsonify
from ai import AIBackend


bp = Blueprint('roadmap', __name__)
ai = AIBackend()

@bp.route('/api/roadmap', methods=['POST'])
def generate_roadmap():
    data = request.json
    idea = data.get('idea')
    
    result = ai.generate_roadmap(idea)
    return jsonify(result)
