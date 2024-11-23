# from flask import Flask, render_template, request, redirect, url_for, session, flash
from flask import Flask, render_template, request, redirect, url_for, session, flash, send_file

from pymongo import MongoClient
import os
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.platypus import Table, TableStyle
from io import BytesIO
import gridfs
import os
import datetime
app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['annual_report_portal']
users = db['users']
achievements = db['academic_achievements']  # New collection for academic achievements
student_activities = ['student_activities']
# settings = db['settings']

# Home route
@app.route('/')
def home():
    return render_template('login.html')

# Login route
@app.route('/login', methods=['POST'])
def login():
    username = request.form['name']
    password = request.form['password']
    
    # Find the user with matching username and password
    user = users.find_one({"username": username, "password": password})

    if user:
        session['user_id'] = str(user['_id'])
        session['role'] = user['role']
        
        if user['role'] == 'student':
            return redirect(url_for('student_dashboard'))
        elif user['role'] == 'staff':
            return redirect(url_for('staff_dashboard'))
        elif user['role'] == 'admin':
            return redirect(url_for('admin_dashboard'))
    else:
        # Use flash to display the error message
        flash("Invalid credentials. Please try again.")
        return redirect(url_for('home'))


# Role-based routes
@app.route('/student')
def student_dashboard():
    if session.get('role') == 'student':
        return render_template('dashboard_viewer.html')
    else:
        return redirect(url_for('home'))

@app.route('/staff')
def staff_dashboard():
    if session.get('role') == 'staff':
        return render_template('dashboard_faculty.html')
    else:
        return redirect(url_for('home'))

@app.route('/admin')
def admin_dashboard():
    if session.get('role') == 'admin':
        return render_template('dashboard_admin.html')
    else:
        return redirect(url_for('home'))

@app.route('/academic-achievements', methods=['GET', 'POST'])
def academic_achievements():
    if request.method == 'POST':
        title = request.form['title']
        description = request.form['description']
        course_department = request.form['course_department']
        date = request.form['date']
        visibility = request.form['visibility']

        # Handle file upload
        file = request.files['supporting_document']
        file_name = None
        if file and file.filename != '':
            file_name = file.filename
            upload_folder = os.path.join('uploads')  # Ensure the uploads folder exists
            os.makedirs(upload_folder, exist_ok=True)
            file.save(os.path.join(upload_folder, file_name))

        # Save data to MongoDB
        achievement_data = {
            'title': title,
            'description': description,
            'course_department': course_department,
            'date': date,
            'visibility': visibility,
            'file_name': file_name
        }
        achievements.insert_one(achievement_data)

        flash('Achievement submitted successfully!', 'success')
        return redirect(url_for('academic_achievements'))

    return render_template('form1.html')


# student-activities
@app.route('/student-activities', methods=['GET', 'POST'])
def student_activities():
    if request.method == 'POST':
        try:
            # Collect form data
            event_title = request.form.get('title')
            description = request.form.get('description')
            date_time = request.form.get('date_time')
            location = request.form.get('location')
            organizing_body = request.form.get('organizing_body')
            contact_info = request.form.get('contact_info')

            # Handle file upload
            poster = request.files.get('poster')
            poster_path = None
            if poster and poster.filename:
                upload_folder = 'uploads'
                os.makedirs(upload_folder, exist_ok=True)
                poster_path = os.path.join(upload_folder, poster.filename)
                poster.save(poster_path)

            # Save data to MongoDB
            student_activity = {
                'event_title': event_title,
                'description': description,
                'date_time': date_time,
                'location': location,
                'organizing_body': organizing_body,
                'contact_info': contact_info,
                'poster_path': poster_path
            }
            db['student_activities'].insert_one(student_activity)

            flash('Student activity submitted successfully!', 'success')
            return redirect(url_for('student_activities'))

        except Exception as e:
            print(f"Error: {e}")
            flash('Error submitting student activity', 'error')
            return redirect(url_for('student_activities'))

    return render_template('form2.html')

#reseach publications
@app.route('/research-publication', methods=['GET', 'POST'])
def research_publication():
    if request.method == 'POST':
        try:
            # Collect form data
            research_title = request.form.get('researchTitle')
            author_name = request.form.get('authorName')
            publication_date = request.form.get('publicationDate')
            research_summary = request.form.get('researchSummary')

            # Save data to MongoDB
            research_data = {
                'research_title': research_title,
                'author_name': author_name,
                'publication_date': publication_date,
                'research_summary': research_summary
            }
            db['research_publications'].insert_one(research_data)

            flash('Research publication submitted successfully!', 'success')
            return redirect(url_for('research_publication'))

        except Exception as e:
            print(f"Error: {e}")
            flash('Error submitting research publication', 'error')
            return redirect(url_for('research_publication'))

    return render_template('form3.html')


@app.route('/alumni-achievement', methods=['GET', 'POST'])
def alumni_achievement():
    if request.method == 'POST':
        try:
            # Collect form data
            alumni_name = request.form.get('alumniName')
            graduation_year = int(request.form.get('graduationYear'))
            achievement_title = request.form.get('achievementTitle')
            achievement_details = request.form.get('achievementDetails')

            # Save data to MongoDB
            alumni_data = {
                'alumni_name': alumni_name,
                'graduation_year': graduation_year,
                'achievement_title': achievement_title,
                'achievement_details': achievement_details
            }
            db['alumni_achievements'].insert_one(alumni_data)

            flash('Alumni achievement submitted successfully!', 'success')
            return redirect(url_for('alumni_achievement'))

        except Exception as e:
            print(f"Error: {e}")
            flash('Error submitting alumni achievement', 'error')
            return redirect(url_for('alumni_achievement'))

    # Retrieve submitted achievements to display
    achievements = db['alumni_achievements'].find()
    return render_template('form4.html', achievements=achievements)


@app.route('/future-goals', methods=['GET', 'POST'])
def future_goals():
    if request.method == 'POST':
        try:
            # Collect form data
            department_name = request.form.get('departmentName')
            goal_title = request.form.get('goalTitle')
            goal_description = request.form.get('goalDescription')
            target_date = request.form.get('targetDate')

            # Save data to MongoDB
            goal_data = {
                'department_name': department_name,
                'goal_title': goal_title,
                'goal_description': goal_description,
                'target_date': target_date
            }
            db['future_goals'].insert_one(goal_data)

            flash('Future goal submitted successfully!', 'success')
            return redirect(url_for('future_goals'))

        except Exception as e:
            print(f"Error: {e}")
            flash('Error submitting future goal', 'error')
            return redirect(url_for('future_goals'))

    # Retrieve submitted goals to display
    goals = db['future_goals'].find()
    return render_template('form5.html', goals=goals)

@app.route('/feedback', methods=['GET', 'POST'])
def feedback():
    if request.method == 'POST':
        try:
            # Collect form data
            user_name = request.form.get('userName')
            feedback_text = request.form.get('feedback')

            # Save data to MongoDB
            feedback_data = {
                'user_name': user_name,
                'feedback': feedback_text
            }
            db['feedback_comments'].insert_one(feedback_data)

            flash('Thank you for your feedback!', 'success')
            return redirect(url_for('feedback'))

        except Exception as e:
            print(f"Error: {e}")
            flash('Error submitting feedback', 'error')
            return redirect(url_for('feedback'))

    # Retrieve submitted feedback to display
    feedbacks = db['feedback_comments'].find()
    return render_template('form6.html', feedbacks=feedbacks)


@app.route('/add-user', methods=['GET', 'POST'])
def add_user():
    if request.method == 'POST':
        # Collect form data
        email = request.form['email']
        password = request.form['password']
        roll_no = request.form['rollNo']  # Ensure the name matches the input field's 'name' attribute
        department = request.form['year']  # Matches 'name' attribute of the <select> element

        # Validate and store in the MongoDB collection
        user_data = {
            "username": email,
            "password": password,
            "roll_no": roll_no,
            "department": department,
            "role": "student"  # Default role, or change based on input if needed
        }

        # Check for duplicates
        existing_user = users.find_one({"username": email})
        if existing_user:
            flash("User already exists!", "error")
        else:
            users.insert_one(user_data)
            flash("User added successfully!", "success")

        return redirect(url_for('add_user'))

    return render_template('add-user.html')

@app.route('/remove_user', methods=['GET', 'POST'])
def remove_user():
    if request.method == 'POST':
        # Retrieve form data
        email = request.form.get('email')

        # Check if email is provided
        if not email:
            flash("Please provide an email address.", "error")
            return redirect(url_for('remove_user'))

        # Delete the user with the provided email
        result = users.delete_one({"username": email})

        # Check if deletion was successful
        if result.deleted_count > 0:
            flash("User removed successfully.", "success")
        else:
            flash("No matching user found. Please check the details.", "error")

        return redirect(url_for('remove_user'))

    # Render the HTML template for GET requests
    return render_template('remove-user.html')

# Route to view all pending submissions for admin approval
@app.route('/approve-data')
def approve_data():
    # Fetch all pending achievements from the database
    pending_achievements = achievements.find({"status": "pending"})
    return render_template('approve-data.html', achievements=pending_achievements)

# Route to approve a submission
@app.route('/approve/<submission_id>')
def approve_submission(submission_id):
    try:
        # Update the status of the submission to 'approved'
        achievements.update_one(
            {'_id': ObjectId(submission_id)},
            {'$set': {'status': 'approved'}}
        )
        flash("Submission approved successfully!", "success")
    except Exception as e:
        flash(f"Error approving submission: {e}", "error")
    return redirect(url_for('approve_data'))

# Route to reject a submission
@app.route('/reject/<submission_id>')
def reject_submission(submission_id):
    try:
        # You can either delete the submission or mark it as rejected
        achievements.update_one(
            {'_id': ObjectId(submission_id)},
            {'$set': {'status': 'rejected'}}
        )
        flash("Submission rejected.", "error")
    except Exception as e:
        flash(f"Error rejecting submission: {e}", "error")
    return redirect(url_for('approve_data'))


# @app.route('/add_user')
# def add_user():
#     return render_template('add-user.html')

# @app.route('/remove_user')
# def remove_user():
#     return render_template('remove-user.html')

# @app.route('/approve_data')
# def approve_data():
#     return render_template('approve-data.html')

@app.route('/generate-reports', methods=['GET', 'POST'])
def generate_reports():
    if request.method == 'POST':
        # Get category and year from the form submission
        category = request.form.get('category')  # e.g., "academic achievements"
        year = request.form.get('year')  # e.g., "2024"

        # Validate input
        if not category or not year:
            flash("Category and year are required", "error")
            return redirect(url_for('generate_reports'))

        # Connect to MongoDB
        client = MongoClient('mongodb://localhost:27017')
        db = client['annual_report_portal']
        achievements_collection = db['academic_achievements']
        reports_collection = db['annual_reports']

        # Fetch data from the `academic_achievements` collection (filter by year if available)
        data = achievements_collection.find({"year": year})  # Filter by year if provided

        # Create the PDF document in memory
        buffer = BytesIO()
        pdf = canvas.Canvas(buffer)
        
        # Add a Title Page
        pdf.setFont("Helvetica-Bold", 20)
        pdf.drawString(200, 750, f"Annual Report: {category.title()} ({year})")
        pdf.setFont("Helvetica", 12)
        pdf.drawString(200, 700, f"Generated on: {datetime.datetime.now().strftime('%Y-%m-%d')}")
        pdf.showPage()  # Start a new page

        # Add Header to New Page
        pdf.setFont("Helvetica-Bold", 16)
        pdf.drawString(50, 800, f"{category.title()} ({year})")

        # Prepare Table Data
        table_data = [["Title", "Description", "Department", "Date"]]
        for record in data:
            table_data.append([
                record.get("title", "N/A"),
                record.get("description", "N/A"),
                record.get("course_department", "N/A"),
                record.get("date", "N/A")
            ])

        # Create and Style Table
        table = Table(table_data)
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ]))
        table.wrapOn(pdf, 50, 600)
        table.drawOn(pdf, 50, 500)

        # Save PDF
        pdf.save()
        buffer.seek(0)

        # Store PDF in MongoDB with category and year
        report_data = {
            "filename": f"{category}_{year}_report.pdf",
            "content": buffer.getvalue(),
            "category": category,
            "year": year,
            "generated_on": datetime.datetime.now()
        }

        # Insert the report document into the `annual_reports` collection
        reports_collection.insert_one(report_data)
        buffer.close()

        # Flash success message
        flash(f"Report generated successfully for {category.title()} in {year}", "success")

        return redirect(url_for('generate_reports'))

    # If GET request, display the form
    return render_template('generate_report_form.html')

@app.route('/settings')
def settings():
    return render_template('update-settings.html')

@app.route('/submit_achievement')
def submit_achievement():
    return render_template('faculty_related_form.html')

@app.route('/edit_submission')
def edit_submission():
    return render_template('edit-submission.html')

@app.route('/notifications')
def notifications():
    return render_template('notification.html')

# @app.route('/student-activities')
# def student_activities():
#     return render_template('form2.html')

@app.route('/research-publications')
def research_publications():
    return render_template('form3.html')

@app.route('/alumni-achievements')
def alumni_achievements():
    return render_template('form4.html')

# @app.route('/future-goals')
# def future_goals():
#     return render_template('form5.html')

@app.route('/feedback-comments')
def feedback_comments():
    return render_template('form6.html')

@app.route('/view-report')
def view_report():
    return render_template('view-report.html')

@app.route('/download-pdf-form', methods=['GET', 'POST'])
def download_pdf():
    if request.method == 'POST':
        # Get the category and year from the form
        category = request.form.get('category')
        year = request.form.get('year')

        # Validate input
        if not category or not year:
            return "<script>alert('Category and year are required');</script>"

        # Connect to MongoDB
        client = MongoClient('mongodb://localhost:27017')
        db = client['annual_report_portal']
        reports_collection = db['annual_reports']

        # Query MongoDB for the matching report
        report = reports_collection.find_one({"category": category, "year": year})

        # If the report is found, return the PDF
        if report and "content" in report:
            return send_file(
                BytesIO(report["content"]),  # Binary content of the PDF
                as_attachment=True,  # Forces download
                download_name=report["filename"],  # The filename for the download
                mimetype='application/pdf'  # Specifies it's a PDF file
            )
        else:
            return "<script>alert('No report found for the given category and year');</script>"
    return render_template('download_pdf.html')
    # return redirect(url_for('download_pdf'))

# @app.route('/home')
# def logout():
#     return render_template('login.html')

@app.route('/logout')
def logout():
    # Clear the session to log the user out
    session.clear()
    # Flash a logout success message
    flash("You have been logged out successfully.", "info")
    # Redirect to the login page
    return redirect(url_for('home'))


if __name__ == '__main__':
    app.run(debug=True)
