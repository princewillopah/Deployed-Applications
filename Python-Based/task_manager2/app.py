# app.py
from flask import Flask, render_template, request, redirect, url_for, flash
import psycopg2
from config import DATABASE_CONFIG

app = Flask(__name__)
app.secret_key = 'supersecretkey'  # Needed for flash messages

def get_db_connection():
    conn = psycopg2.connect(**DATABASE_CONFIG)
    return conn

@app.route('/')
def index():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT id, title, description, due_date, completed, created_at 
        FROM tasks 
        ORDER BY completed, due_date NULLS LAST, created_at;
    """)
    tasks = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('index.html', tasks=tasks)

@app.route('/create', methods=['GET', 'POST'])
def create():
    if request.method == 'POST':
        title = request.form['title'].strip()
        description = request.form['description'].strip()
        due_date = request.form['due_date'] or None

        if not title:
            flash('Title is required!', 'error')
            return render_template('create.html')

        conn = get_db_connection()
        cur = conn.cursor()
        try:
            cur.execute(
                """INSERT INTO tasks (title, description, due_date, completed)
                   VALUES (%s, %s, %s, %s)""",
                (title, description, due_date, False)
            )
            conn.commit()
            flash('Task created successfully!', 'success')
        except Exception as e:
            flash('Error creating task.', 'error')
            print(e)
        finally:
            cur.close()
            conn.close()

        return redirect(url_for('index'))

    return render_template('create.html')

@app.route('/edit/<int:id>', methods=['GET', 'POST'])
def edit(id):
    conn = get_db_connection()
    cur = conn.cursor()

    if request.method == 'POST':
        title = request.form['title'].strip()
        description = request.form['description'].strip()
        due_date = request.form['due_date'] or None
        completed = 'completed' in request.form

        if not title:
            flash('Title is required!', 'error')
            cur.execute("SELECT id, title, description, due_date, completed FROM tasks WHERE id = %s;", (id,))
            task = cur.fetchone()
            cur.close()
            conn.close()
            return render_template('edit.html', task=task)

        try:
            cur.execute("""
                UPDATE tasks SET title = %s, description = %s, due_date = %s, completed = %s
                WHERE id = %s
            """, (title, description, due_date, completed, id))
            conn.commit()
            flash('Task updated!', 'success')
        except Exception as e:
            flash('Error updating task.', 'error')
            print(e)
        finally:
            cur.close()
            conn.close()

        return redirect(url_for('index'))

    else:
        cur.execute("SELECT id, title, description, due_date, completed FROM tasks WHERE id = %s;", (id,))
        task = cur.fetchone()
        cur.close()
        conn.close()
        if not task:
            flash('Task not found.', 'error')
            return redirect(url_for('index'))
        return render_template('edit.html', task=task)

@app.route('/delete/<int:id>', methods=['POST'])
def delete(id):
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("DELETE FROM tasks WHERE id = %s;", (id,))
        conn.commit()
        flash('Task deleted!', 'success')
    except Exception as e:
        flash('Error deleting task.', 'error')
        print(e)
    finally:
        cur.close()
        conn.close()
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)