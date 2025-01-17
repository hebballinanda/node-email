# This is nodejs application where using nodemailer and @aws-sdk/client-ses package.

## Navigate to AWS SES :
"https://us-east-1.console.aws.amazon.com/ses/home?region=us-east-1#/account"

## Adding Email 
- In left side inside configuration there are identities 
- so click on that and there you add email address
- add both sender and reciever email.
- verify both mail.
- once verified successfully.

## Add Env variables
- Access key 
- Secret key
- Sender 
- Reciever

## Run code with command
```bash
nodemon app.js
```

## Navigate to localhost:3000/send-email
####  check mail you could have got email