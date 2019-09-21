from flask import Flask, jsonify

app = Flask('api')

@app.route('/api/todo')
def list_todos():
    return jsonify([
        {'id': 1, 'title': 'eat lots of chocolate', 'completed': False},
        {'id': 2, 'title': 'go to the bank', 'completed': False},
        {'id': 3, 'title': 'hhmm', 'completed': True},
        {'id': 4, 'title': 'hehe', 'completed': False},
        {'id': 5, 'title': 'ok', 'completed': False},
    ])

if __name__ == '__main__':
    app.run(debug=True)