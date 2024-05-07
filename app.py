from flask import Flask, request, jsonify
from flask_cors import CORS
from sympy import sympify, SympifyError

app = Flask(__name__)
CORS(app,resources={r"/calculate": {"origins": "http://localhost:3000"}})

@app.route('/')
def home():
    return "Hello, World!"

@app.route('/calculate', methods=['POST'])
def handle_calculate():
    data = request.get_json()
    try:
        # sympyを使用して式を評価し、結果を文字列として返す
        expression = data['expression']
        result = sympify(expression)
        # 計算結果を数値に変換して返す（必要に応じて）
        if result.is_number:
            result = float(result)
        else:
            result = str(result)
    except SympifyError as e:
        result = "Error: Invalid expression"
    except Exception as e:
        result = "Error: " + str(e)
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)
