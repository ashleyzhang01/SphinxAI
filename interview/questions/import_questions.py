from interview.models import db, Question
import csv

def import_questions_from_csv():
    with open('./static/questions.csv', 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            category = row['Category']
            question = row['Question']
            new_question = Question(category=category, question=question)
            db.session.add(new_question)
    
    # add files
    db.session.commit()