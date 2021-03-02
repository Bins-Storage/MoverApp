import gspread, json
from flask import Flask, request, abort, jsonify
from oauth2client.service_account import ServiceAccountCredentials
from googleapiclient import discovery

scope = ["https://spreadsheets.google.com/feeds","https://www.googleapis.com/auth/spreadsheets","https://www.googleapis.com/auth/drive.file","https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name("creds.json", scope)
client = gspread.authorize(creds)
service = discovery.build('sheets', 'v4', credentials=creds)
spreadsheet_id = '18l4cO3X1dp8MCWqDencHYUTidUhXb7u9IHFp_vg_5uQ'
value_input_option = 'USER_ENTERED'

def addBin(description, email, image):
    range_ = 'Inventory!A3:F'
    value_range_body = {
        "majorDimension": "COLUMNS",
        "values": [['=INDIRECT(ADDRESS(ROW()-1,COLUMN()))+1'], [description], [email], ['No'], [image]]
    }
    request = service.spreadsheets().values().append(spreadsheetId=spreadsheet_id, range=range_, valueInputOption=value_input_option, body=value_range_body)
    response = request.execute()

def renderList():
    range_ = "Inventory!A3:F"
    value_render_option = "UNFORMATTED_VALUE"
    request2 = service.spreadsheets().values().get(spreadsheetId=spreadsheet_id, range=range_, valueRenderOption=value_render_option)
    response2 = request2.execute()
    list = response2['values']
    keys = ['id', 'description', 'owner', 'isInStorage', 'photo']
    result = [dict(zip(keys, entry)) for entry in list]
    return result

def modifyBin(id, description, owner, isInStorage):
    customerID = id
    range_ = "Inventory!A:A"
    value_render_option = "UNFORMATTED_VALUE"
    request3 = service.spreadsheets().values().get(spreadsheetId=spreadsheet_id, range=range_, valueRenderOption=value_render_option)
    response3 = request3.execute()
    values = response3['values']

    def findRow(id):
        for counter, x in enumerate(values, 1):
            if id == x:
                return counter
    value_range_body = {
        "majorDimension": "COLUMNS",
        "values": [[id], [description], [owner], [isInStorage]]}
    row = findRow([customerID])
    value_input_option = "RAW"
    range_2 = "Inventory!A" + str(row) + ":D" + str(row)
    request4 = service.spreadsheets().values().update(spreadsheetId=spreadsheet_id, range=range_2, valueInputOption=value_input_option, body=value_range_body)
    response4 = request4.execute()
