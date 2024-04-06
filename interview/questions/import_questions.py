from interview.models import db, Question
import csv

def import_questions_from_csv():
    with open('./static/behavioral.csv', 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            category = 'BEHAVIORAL'
            question = row['question']
            new_question = Question(category=category, question=question)
            db.session.add(new_question)
    
    # add files
    db.session.commit()