from flask import Flask, request, jsonify
from flask_cors import CORS
import gspread

# auth for google sheet
gc = gspread.service_account(filename='credentials.json')
sh = gc.open_by_key('1sju-9IKAuEOJw9M0xAm_ggUxqVc9RyePe82d6wo2EGE')
worksheet = sh.sheet1

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello world!'


@app.route('/finishpickup', methods=['POST', 'GET'])
def finish_job():
    try:
        job_data = request.get_json()

        # get the number of filled in rows
        num_rows = len(worksheet.col_values(1))
        row_to_add = num_rows + 1

        # get the box data
        box_data = ''
        for i in range(len(job_data['boxList'])):
            if i == len(job_data['boxList']) - 1:
                box_data = box_data + job_data['boxList'][i]
            else:
                box_data = box_data + job_data['boxList'][i] + ','

        # push the box data to row_to_add cols A,B,C [name, address, box_data]
        worksheet.update('A' + str(row_to_add), job_data['name'])
        worksheet.update('B' + str(row_to_add), job_data['streetAddress'])
        worksheet.update('C' + str(row_to_add), box_data)

        
    except Exception as e:
        print('Exception occurred in finish_job', e)

    return 'Done'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')