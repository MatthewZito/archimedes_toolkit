import smtplib
from email.message import EmailMessage

# instantiate email object
email = EmailMessage

# solicit input vals for said obj
email['from'] = input('Enter your email address: ')
password = input('Enter your password: ')
email['to'] = input('Enter destination email address: ')
email['subject'] = input('Enter email subject: ')
content = input('Enter email content: ')
email.set_content(content)

# auth - change to dynamic TO-DO
with smtplib.SMTP(host=f'smtp.gmail.com', port=587) as smtp:
    # intro server
    smtp.ehlo()
    # connect server
    smtp.starttls()
    # login
    smtp.login(f'{email['from']}, '{password}')
    smtp.send_message(email)

