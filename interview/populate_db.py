from interview.models import db, Question, CodingTechnical
import csv

def import_questions_from_csv():
    with open('./static/questions.csv', 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            category = row['Category']
            question = row['Question']
            if not Question.query.filter_by(category=category.upper(), question=question).first():
                new_question = Question(category=category.upper(), question=question)
                db.session.add(new_question)
    
    # add files
    db.session.commit()

def import_coding_technicals():
    with open('./static/coding_technicals.csv', 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            # print(row)
            language = row['\ufeffLanguage']
            name = row['Name']
            if not CodingTechnical.query.filter_by(language=language.upper(), name=name).first():
                new_question = CodingTechnical(
                    language=language.upper(), 
                    name=name,
                    description = row['Description'],
                    starter_code = row['StarterCode'],
                    solution=row['SampleSolution'],
                    tests=row['Tests']
                )
                db.session.add(new_question)

    db.session.commit()