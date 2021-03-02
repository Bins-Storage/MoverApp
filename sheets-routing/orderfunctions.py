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

def addOrder(date, time, address, email, phone, type, items):
    range_ = 'Orders!A3:H'
    value_range_body = {
        "majorDimension": "COLUMNS",
        "values": [['=INDIRECT(ADDRESS(ROW()-1,COLUMN()))+1'], [date], [time], [address], [email], [phone], [type], [items]]
    }
    request = service.spreadsheets().values().append(spreadsheetId=spreadsheet_id, range=range_, valueInputOption=value_input_option, body=value_range_body)
    response = request.execute()

def renderOrders():
    range_ = "Orders!A3:H"
    value_render_option = "FORMATTED_VALUE"
    date_time_render_option = 'FORMATTED_STRING'
    request2 = service.spreadsheets().values().get(spreadsheetId=spreadsheet_id, range=range_, valueRenderOption=value_render_option, dateTimeRenderOption = date_time_render_option)
    response2 = request2.execute()
    list = response2['values']
    keys = ['id', 'date', 'time', 'address', 'name', 'phone', 'type', 'items']
    result = [dict(zip(keys, entry)) for entry in list]
    return result

def renderPastOrders():
    range_ = "CompletedOrders!A3:H"
    value_render_option = "FORMATTED_VALUE"
    date_time_render_option = 'FORMATTED_STRING'
    request2 = service.spreadsheets().values().get(spreadsheetId=spreadsheet_id, range=range_, valueRenderOption=value_render_option, dateTimeRenderOption = date_time_render_option)
    response2 = request2.execute()
    list = response2['values']
    keys = ['id', 'date', 'time', 'address', 'name', 'phone', 'type', 'items']
    result = [dict(zip(keys, entry)) for entry in list]
    return result
