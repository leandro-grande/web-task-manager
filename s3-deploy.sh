yarn build
aws s3 sync dist s3://task-manager-private/
