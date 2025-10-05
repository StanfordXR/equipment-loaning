# StanfordXR Equipment Loaning
For onboarding information, see [this Notion page](https://www.notion.so/stanfordxr/Developer-onboarding-to-equipment-loaning-system-2704d325f1758027aaa3dd81743c49aa?source=copy_link).

## Starting an Amplify sandbox
This project uses AWS Amplify (Gen 2) for the backend. Amplify supports personal sandbox environments
per developer; this creates cloud resources (database, business logic functions, etc.) identical to the
ones that would be deployed in prod, but only accessible by that developer on their local machine. To start
a sandbox, run the following terminal commands:

```
aws sso login --profile [PROFILE NAME (optional)]
```