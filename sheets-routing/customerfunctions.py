import gspread, json
import numpy as np
from flask import Flask, request, abort, jsonify
from oauth2client.service_account import ServiceAccountCredentials
from googleapiclient import discovery

scope = ["https://spreadsheets.google.com/feeds","https://www.googleapis.com/auth/spreadsheets","https://www.googleapis.com/auth/drive.file","https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name("creds.json", scope)
client = gspread.authorize(creds)
service = discovery.build('sheets', 'v4', credentials=creds)
spreadsheet_id = '18l4cO3X1dp8MCWqDencHYUTidUhXb7u9IHFp_vg_5uQ'

def addCustomer(name, email, phone, address, specialInstructions, size, building, parking, licenseNumber, licenseState):
    range_ = 'Customers!A3:K3'
    value_range_body = {
        "majorDimension": "COLUMNS",
        "values": [[email], [name], [phone], [address], [specialInstructions], [size], [building], [parking], ["0%"], [licenseNumber], [licenseState]]
    }
    value_input_option = 'USER_ENTERED'
    request = service.spreadsheets().values().append(spreadsheetId=spreadsheet_id, range=range_, valueInputOption=value_input_option, body=value_range_body)
    response = request.execute()

def modifyCustomer(name, email, phone, address, specialInstructions, size):
    customerID = email
    range_ = "Customers!A:A"
    value_render_option = "UNFORMATTED_VALUE"
    request2 = service.spreadsheets().values().get(spreadsheetId=spreadsheet_id, range=range_, valueRenderOption=value_render_option)
    response2 = request2.execute()
    values = response2['values']

    def findRow(id):
        for counter, x in enumerate(values, 1):
            if id == x:
                return counter
    value_range_body = {
        "majorDimension": "COLUMNS",
        "values": [[email], [name], [phone], [address], [specialInstructions], [size]]}
    row = findRow([customerID])
    value_input_option = "RAW"
    range_2 = "Customers!A" + str(row) + ":F" + str(row)
    request3 = service.spreadsheets().values().update(spreadsheetId=spreadsheet_id, range=range_2, valueInputOption=value_input_option, body=value_range_body)
    response3 = request3.execute()

def modifyAddress(name, email, phone, address, specialInstructions, size, building, parking):
    customerID = email
    range_ = "Customers!A:A"
    value_render_option = "UNFORMATTED_VALUE"
    request2 = service.spreadsheets().values().get(spreadsheetId=spreadsheet_id, range=range_, valueRenderOption=value_render_option)
    response2 = request2.execute()
    values = response2['values']

    def findRow(id):
        for counter, x in enumerate(values, 1):
            if id == x:
                return counter
    value_range_body = {
        "majorDimension": "COLUMNS",
        "values": [[email], [name], [phone], [address], [specialInstructions], [size], [building], [parking]]}
    row = findRow([customerID])
    value_input_option = "RAW"
    range_2 = "Customers!A" + str(row) + ":H" + str(row)
    request3 = service.spreadsheets().values().update(spreadsheetId=spreadsheet_id, range=range_2, valueInputOption=value_input_option, body=value_range_body)
    response3 = request3.execute()

def renderPercentages():
    range_ = ["Customers!A3:A", "Customers!I3:I"]
    value_render_option = "FORMATTED_VALUE"
    majorDimension_ = "ROWS"
    request = service.spreadsheets().values().batchGet(spreadsheetId=spreadsheet_id, ranges=range_, valueRenderOption=value_render_option, majorDimension=majorDimension_)
    response = request.execute()
    list = np.concatenate((response.get('valueRanges')[0]['values'],response.get('valueRanges')[1]['values']),axis = 1)
    keys = ['email', 'percentageUsed']
    result = [dict(zip(keys, entry)) for entry in list]
    return result
