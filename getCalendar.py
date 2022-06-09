#!/usr/bin/env python3
from __future__ import print_function

import datetime
import os.path
import re

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']

# Regex to check event is for complete day
regex = "^\d{4}-\d{2}-\d{2}$"

def main():
    """Shows basic usage of the Google Calendar API.
    Prints the start and name of the next 10 events on the user's calendar.
    """
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    try:
        service = build('calendar', 'v3', credentials=creds)

        # Call the Calendar API
        monday = datetime.date.today()
        monday -= datetime.timedelta(days=monday.weekday())
        monday = str(monday) + "T08:00:00.000000Z"        
        events_result = service.events().list(calendarId='c_kvj8digsqnaqh4u9bo8957q8f0@group.calendar.google.com', timeMin=monday,
                                              maxResults=30, singleEvents=True,
                                              orderBy='startTime').execute()
        events = events_result.get('items', [])

        if not events:
            print('No upcoming events found.')
            return

        # Prints the start and name of the next 10 events
        i = 0
        with open('dates.txt', 'w') as f:
            for event in events:
                if i >= 10: 
                    break
                start = event['start'].get('dateTime', event['start'].get('date'))
                if re.match(regex, start):
                    f.write(f"{start} {event['summary']}\n")
                    i += 1

            

    except HttpError as error:
        print('An error occurred: %s' % error)

if __name__ == '__main__':
    main()