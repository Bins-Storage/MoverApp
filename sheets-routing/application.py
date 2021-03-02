from flask import *
from flask_cors import CORS
import gspread, json
from customerfunctions import *
from inventoryfunctions import *
from orderfunctions import *
from oauth2client.service_account import ServiceAccountCredentials

# custom functions import
from qr_routing_helper import get_date, find_job_by_date, convert_jobs_to_dict, extractTenantItems

TEST_SHEET = '18l4cO3X1dp8MCWqDencHYUTidUhXb7u9IHFp_vg_5uQ'
TIMEZONE = 'America/Los_Angeles'

# auth for google sheet
gc = gspread.service_account(filename='credentials.json')
sh = gc.open_by_key(TEST_SHEET)
order_sheet = sh.sheet1
completed_order_sheet = sh.get_worksheet(1)
inventory_sheet = sh.get_worksheet(2)

application = Flask(__name__)
CORS(application)

@application.route('/')
def hello_world():
    return 'Hello world!'

@application.route('/getjobs', methods=['POST', 'GET'])
def get_jobs():
    try:
        # get todays date
        today = get_date(TIMEZONE)
        print('Today is ', today)

        # get jobs of todays date
        todays_jobs = find_job_by_date(today, order_sheet)

        # compile jobs into json
        todays_jobs_dict = convert_jobs_to_dict(todays_jobs)
        todays_jobs_json = jsonify(todays_jobs_dict)

        # return the json
        return todays_jobs_json
        
    except Exception as e:
        print('Exception occurred: ', e)
        return e

@application.route('/finishpickup', methods=['POST', 'GET'])
def finishpickup():
    try:
        # extract relevant order data
        pickup_data = request.get_json()
        print('Pickup Data', pickup_data)
        box_list = pickup_data['boxList']
        tenant_email = pickup_data['tenantEmail']
        start_time = pickup_data['start']
        end_time = pickup_data['end']

        for item in box_list:
            item_id = item['id']
            item_uri = item['uri']

            # find next empty row
            next_row = len(inventory_sheet.col_values(1)) + 1

            # push data to spreadsheet
            inventory_sheet.update_cell(next_row, 1, item_id)
            inventory_sheet.update_cell(next_row, 3, tenant_email)
            inventory_sheet.update_cell(next_row, 4, 'No')
            inventory_sheet.update_cell(next_row, 5, item_uri)

    except Exception as e:
        print('Exception Occurred: ', e)

    return 'Done with pickup'

@application.route('/gettenantboxes', methods=['POST', 'GET'])
def get_tenant_boxes():
    try:
        # extract the tenant email
        tenant_email = request.get_json()['tenantEmail']

        # get the tenants items in storage
        tenant_items = extractTenantItems(tenant_email, inventory_sheet)

        # make it json
        payload = {'tenantItems': tenant_items}
        return jsonify(payload)
    except Exception as e:
        print('Exception occurred: ', e)
    
    return 'Done with tenant boxes route'

@application.route('/finishdelivery', methods=['POST', 'GET'])
def finish_delivery():
    try:
        # get info on start/end time
        delivery_info = request.get_json()
        print(delivery_info)
        email = delivery_info['tenantEmail']
        address = delivery_info['address']
        start = delivery_info['start']
        end = delivery_info['end']

        # find next empty row
        next_empty_row = len(completed_order_sheet.col_values(1)) + 1

        # update completed_order sheet with delivery info
        completed_order_sheet.update_cell(next_empty_row, 1, next_empty_row - 3)    # minus 3 since that's the offset for sequential ids
        completed_order_sheet.update_cell(next_empty_row, 2, start + 'to' + end)
        completed_order_sheet.update_cell(next_empty_row, 4, address)
        completed_order_sheet.update_cell(next_empty_row, 5, email)
        completed_order_sheet.update_cell(next_empty_row, 7, 'delivery')

    except Exception as e:
        print('Exception occurred in finishdelivery: ', e)
    return 'delivery method done'

@application.route("/customers", methods=['POST', 'GET'])
def log():
    try:
        loginInfo = request.get_json(force=False, cache=True)
        addCustomer(loginInfo['name'],
                    loginInfo['email'],
                    loginInfo['phone'],
                    loginInfo['address'],
                    loginInfo['specialInstructions'],
                    loginInfo['size'],
                    loginInfo['building'],
                    loginInfo['parking'],
                    loginInfo['licenseNumber'],
                    loginInfo['licenseState'])
    except:
        print('exception')
    x = {'a':False}
    return jsonify(x)

@application.route("/modifycustomers", methods=['POST', 'GET'])
def log2():
    try:
        customerInfo = request.get_json(force=False, cache=True)
        modifyCustomer(customerInfo['name'],
                       customerInfo['email'],
                       customerInfo['phone'],
                       customerInfo['address'],
                       customerInfo['specialInstructions'],
                       customerInfo['selectedButton'])

    except:
        print('exception')
    x = {'a':False}
    return jsonify(x)

@application.route("/modifyAddress", methods=['POST', 'GET'])
def log3():
    try:
        customerAddress = request.get_json(force=False, cache=True)
        modifyAddress(customerAddress['name'],
                       customerAddress['email'],
                       customerAddress['phone'],
                       customerAddress['address'],
                       customerAddress['specialInstructions'],
                       customerAddress['selectedButton'],
                       customerAddress['building'],
                       customerAddress['parking'])

    except:
        print('exception')
    x = {'a':False}
    return jsonify(x)

@application.route("/inventory", methods=['POST', 'GET'])
def log4():
    try:
        binInfo = request.get_json(force=False, cache=True)
        addBin(binInfo['itemName'], binInfo['email'], binInfo['image'])
    except:
        print('exception')
    x = {'a':False}
    return jsonify(x)

@application.route("/render", methods=['GET'])
def log5():
    list = json.dumps(renderList())
    return list

@application.route("/orders", methods=['POST', 'GET'])
def log6():
    try:
        orderInfo = request.get_json(force=False, cache=True)
        addOrder(orderInfo['dateSelected'],
                 orderInfo['timeSelected'],
                 orderInfo['address'],
                 orderInfo['email'],
                 orderInfo['phone'],
                 orderInfo['type'],
                 orderInfo['selected'])
    except:
        print('exception')
    x = {'a':False}
    return jsonify(x)

@application.route("/renderorders", methods=['GET'])
def log7():
    list = json.dumps(renderOrders())
    return list

@application.route("/renderpastorders", methods=['GET'])
def log8():
    list = json.dumps(renderPastOrders())
    return list

@application.route("/modifybin", methods=['POST', 'GET'])
def log9():
    try:
        binInfo = request.get_json(force=False, cache=True)
        modifyBin(binInfo['id'],
                  binInfo['selected'],
                  binInfo['email'],
                  binInfo['isInStorage'])
    except:
        print('exception')
    x = {'a':False}
    return jsonify(x)

@application.route("/%used", methods=['GET'])
def log10():
    list = json.dumps(renderPercentages())
    return list

if __name__ == '__main__':
    application.run(debug=True, host='0.0.0.0')