from flask import Blueprint, request, jsonify
from ai import AIBackend


bp = Blueprint('analyze', __name__)
ai = AIBackend()

@bp.route('/api/analyze', methods=['POST'])
def analyze():
    data = request.json
    idea = data.get('idea')
    
    if not idea:
        return jsonify({'error': 'Idea is required'}), 400
    
    result = ai.analyze_idea(idea)
    return jsonify({
        'summary': result.summary,
        'validation_score': result.validation_score,
        'market_size': result.market_size,
        'competitors': result.competitors,
        'risks': result.risks,
        'opportunities': result.opportunities
    })
