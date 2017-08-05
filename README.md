Lambda Server Monitor Script using Serverless Framework

See https://serverless.com/

# Set up

## Install AWS CLI

See http://docs.aws.amazon.com/cli/latest/userguide/installing.html

After installing AWS CLI, you also need to have an IAM role that have permission to deploy Lambda function, S3 buckets and any additional AWS resources. To configure default IAM role, run


```
aws configure

```

# Add URL to check

* Open file handler.js and add more URL into array urls

# Deployment and execute Lambda

## Deploy this function to Lambda from terminal
```
serverless deploy
```

## Invoke Lambda function from terminal
```
serverless invoke --function index
```

# Set up CloudWatch schedule 

* Go to Lambda function
* In Triggers, create new trigger and select CloudWatch Events
* In Rule, select Create New Rule
* Fill in rule name, description
* Type in schedule expression, for example, `rate(2 minutes)` to run schedule task every 2 minutes
* Check Enable Trigger so that the schedule task can start


