from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/flask'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
app.app_context().push()
ma = Marshmallow()
class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name =  db.Column(db.String(100))
    rollNo = db.Column(db.Integer)
    email = db.Column(db.String(100))
   

    def __init__(self, name, rollNo, email): 
         self.name = name
         self.rollNo = rollNo
         self.email = email

class StudentSchema(ma.Schema):
      class Meta:
        fields = ('id','name','rollNo','email')

student_schema = StudentSchema()
students_schema = StudentSchema(many=True)
@app.route('/get', methods = ['GET'])
def get_students():
   all_students = Student.query.all()
   results = students_schema.dump(all_students)
   return jsonify(results)

@app.route('/get/<id>/', methods = ['GET'])
def post_details(id):
    student = Student.query.get(id)
    return student_schema.jsonify(student)

@app.route('/add/', methods = ['POST'])
def add_student():
    name = request.json['name']
    rollNo = request.json['rollNo']
    email = request.json['email']
    students = Student(name,rollNo,email)
    db.session.add(students)
    db.session.commit()
    return student_schema.jsonify(students)

@app.route('/update/<id>/', methods = ['PUT'])
def update_article(id):
    student = Student.query.get(id)

    name = request.json['name']
    rollNo = request.json['rollNo']
    email = request.json['email']

    student.name = name
    student.rollNo = rollNo
    student.email = email

    db.session.commit()
    return student_schema.jsonify(student)

@app.route('/delete/<id>/', methods = ['DELETE'])
def student_delete(id):
    student = Student.query.get(id)
    db.session.delete(student)
    db.session.commit()

    return student_schema.jsonify(student)
if __name__ == "__main__":
    app.run(debug=True)