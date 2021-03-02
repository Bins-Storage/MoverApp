from datetime import datetime
import pytz
import gspread

def get_date(location):
    # set timezone based on location
    tz = pytz.timezone(location)

    curr_dt = datetime.now(tz)

    month = curr_dt.month
    day = curr_dt.day
    if (curr_dt.month < 10):
        month = '0' + str(month)
    if (curr_dt.day < 10):
        day = '0' + str(day)

    date_str = str(curr_dt.year) + '-' + month + '-' + day

    return date_str

def find_job_by_date(date, order_sheet):
    # sheet has 2 header rows, so subtract those out for total jobs
    num_rows = len(order_sheet.col_values(1))

    # get all jobs and remove the 2 header rows
    all_jobs = order_sheet.get_all_values()
    del all_jobs[0:2]

    # extract todays jobs from all jobs
    todays_jobs = []
    for job in all_jobs:
        if job[1] == date:
            todays_jobs.append(job)
        
    return todays_jobs

def convert_jobs_to_dict(jobs):
    job_dict = {}
    
    # parse the job by data field
    for job in jobs:
        job_id = job[0]
        job_date = job[1]
        job_time = job[2]
        job_address = job[3]
        job_email = job[4]
        job_phone_num = job[5]
        job_type = job[6]
        job_items = job[7]

        job_dict[f'job_{job_id}'] = {
            'id': job_id,
            'date': job_date,
            'time': job_time,
            'address': job_address,
            'email': job_email,
            'phone_num': job_phone_num,
            'job_type': job_type,
            'items': job_items,
        }

    return job_dict

def extractTenantItems(email, inventory_sheet):
    inventory_list = inventory_sheet.get_all_values()

    tenants_items = []
    for item in inventory_list:
        if item[2] == email:
            tenants_items.append(item[1])

    return tenants_items
    

if __name__ == '__main__':
    TEST_SHEET = '18e4lbD42262cXmiE2Gy4T1YSTGdANbdvJT_AU95pRqA'
    TIMEZONE = 'America/Los_Angeles'

    print('Today is ', get_date('America/Los_Angeles'))

    # auth for google sheet
    gc = gspread.service_account(filename='credentials.json')
    sh = gc.open_by_key(TEST_SHEET)
    order_sheet = sh.sheet1
    inventory_sheet = sh.get_worksheet(2)

    js = find_job_by_date('2021-02-23', order_sheet)
    js_dict = convert_jobs_to_dict(js)
    print(js_dict)

    print(extractTenantItems('bigzhang17@gmail.com', inventory_sheet))