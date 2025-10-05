# StanfordXR Equipment Loaning
For onboarding information, see [this Notion page](https://www.notion.so/stanfordxr/Developer-onboarding-to-equipment-loaning-system-2704d325f1758027aaa3dd81743c49aa?source=copy_link).

## Starting an Amplify sandbox
This project uses AWS Amplify (Gen 2) for the backend. Amplify supports personal sandbox environments
per developer; this creates cloud resources (database, business logic functions, etc.) identical to the
ones that would be deployed in prod, but only accessible by that developer on their local machine. To start
a sandbox, run the following terminal commands. If you use AWS for other purposes on your local machine, you
may need to specify a profile for each command (with the `--profile` flag):
```
aws sso login --profile [PROFILE NAME (if applicable)]
npx ampx sandbox
```

If this is your first time setting up your local machine, you may need to run the following command:
```
aws configure sso
```
If prompted, use the following values for configuring SSO:
- Start URL: https://d-916706eb85.awsapps.com/start/#/
- Region: us-west-1 (this is Northern California)