from twilio.rest import Client

def main():
    # authenticate
    account_sid = input('Enter Account SID')
    auth_token = input('Enter auth token: ')
    client = Client(account_sid, auth_token)

    # src number
    src_num = ''

    # compose SMS
    
    target_num = input('Enter a phone number: ')
    body_text = input('Enter SMS content: ')
    message = client.messages.create(
        from_=f'+{src_num}',
        body=body_text,
        to=f'+{target_num}'
    )

    print(message.sid)
    
if __name__ == '__main__':
    main()