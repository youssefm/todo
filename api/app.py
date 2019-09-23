from flask import Flask, jsonify, request, Response

app = Flask("api")

TODOS = [
    {"id": 1, "title": "eat lots of chocolate", "completed": False},
    {"id": 2, "title": "go to the bank", "completed": False},
    {"id": 3, "title": "hhmm", "completed": True},
    {"id": 4, "title": "hehe", "completed": False},
    {"id": 5, "title": "ok", "completed": False},
]


@app.route("/api/todo")
def list_todos():
    return jsonify(TODOS)


@app.route("/api/todo", methods=["POST"])
def new_todo():
    new_todo = request.get_json()
    new_todo["id"] = max([todo["id"] for todo in TODOS]) + 1
    new_todo["completed"] = False
    TODOS.append(new_todo)
    return jsonify(new_todo)


@app.route("/api/todo/<id>", methods=["PUT"])
def update_todo(id):
    updated = request.get_json()
    assert str(updated["id"]) == id
    global TODOS
    TODOS = sorted(
        [todo for todo in TODOS if str(todo["id"]) != id] + [updated],
        key=lambda t: t["id"],
    )
    return Response()


@app.route("/api/todo/<id>", methods=["DELETE"])
def delete_todo(id):
    found_index = None
    for index, todo in enumerate(TODOS):
        if str(todo["id"]) == id:
            found_index = index
            break

    if found_index is not None:
        del TODOS[found_index]

    return Response()


if __name__ == "__main__":
    app.run(debug=True)
