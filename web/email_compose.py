import smtplib
from email.message import EmailMessage

# instantiate email object
email = EmailMessage

# TO-DO NEEDS FIX
# solicit input vals for said obj
from_address = input('Enter your email address: ')
to_address = input('Enter destination email address: ')
subject = input('Enter email subject: ')
email['from'] = from_address
password = input('Enter your password: ')
email['to'] = to_address
email['subject'] = subject
content = input('Enter email content: ')
email.set_content(content)
sender = email['from']

# auth - change to dynamic TO-DO
with smtplib.SMTP(host=f'smtp.gmail.com', port=587) as smtp:
    # intro server
    smtp.ehlo()
    # connect server
    smtp.starttls()
    # login
    smtp.login(f'{sender}', f'{password}')
    smtp.send_message(email)

