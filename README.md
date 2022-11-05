# Event Management Service - REST API with CRUD operations
Serverless Framework REST API with AWS API Gateway which supports CRUD functionality (Create, Read, Update, Delete)
- Service usecase - Managing events such as webinars, tech talks, hackathons, community fest and others.
- Events can be managed using http requests with required params which in turn stored and updated in **AWS DynamoDB**.
- APIs are exposed via **AWS APIGATEWAY** and protected using API keys.
- **Lambda** functions are invoked on all requests, logs are stored in **AWS CloudWatch**.
- CI/CD pipeline is configured using **Github Actions** workflow.
- **Serverless Framework** deploys functions and other resources using **CloudFormation**. 
# CI/CD setup
Screenshots of the CI/CD setup.
The GitHub Actions CI/CD pipeline triggers deployment based on a git push to the master branch which goes through and deploys the backend Serverless Framework REST API and any other resources e.g. DynamoDB Table(s).
## Workflow
![image](https://user-images.githubusercontent.com/50690238/200123638-270c875f-a047-43e8-97f9-4c49b431ebe4.png)
## Cloudformation Stack
![image](https://user-images.githubusercontent.com/50690238/200123686-0f286d21-df85-41e1-af42-a33a80e9e239.png)

### Requirements completion status

0. All application code must be written using NodeJS, Typescript is acceptable as well - **`Used NodeJS with TypeScript`**

1. All AWS Infrastructure needs to be automated with IAC using [Serverless Framework](https://www.serverless.com) - **`Used Serverless Framework with yml config`**

2. The API Gateway REST API should store data in DynamoDB - **`Done - DynamoDB resources are configured in sls yml config`**

3. There should be 4-5 lambdas that include the following CRUD functionality (Create, Read, Update, Delete) *don't use service proxy integration directly to DynamoDB from API Gateway - **Below are the lambda functions**
    - RegisterEvent - Method - `POST`
    - GetEvent - Method - `GET`
    - UpdateEvent - Method - `PATCH`
    - DeleteEvent - Method - `DELETE`

3. Build the CI/CD pipeline to support multi-stage deployments e.g. dev, prod - **Adhered - Support mutiple stages**

4. The template should be fully working and documented - **Adhered**

4. A public GitHub repository must be shared with frequent commits - **Repo is made public**

5. A video should be recorded (www.loom.com) of you talking over the application code, IAC, and any additional areas you want to highlight in your solution to demonstrate additional skills - **Shared via email**

## Possible future enhancements:
- To configure lambda authoriser
- If functions keep adding, separate sls .yml files can created and imported to the main file. 
- Email notifications can be sent to organisers using SES.
- Secrets can be fetched from AWS Secret Manager
- On Scaling, Pub-Sub model can be configured using SNS and SQS.

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).
