# Howto configure your access for Developer.

## Step 1: Generate the Access Keys (AWS)
In order for them to use the aws ssm start-session command, each developer needs a key. In the IAM Console:

1. Go to Users > Click in the username (devname).
2. Security Credentials Tab > Create access key.
3. Choose The command line interface (CLI).
4. Give the Access Key ID and Secret Access Key to each developer.

## Step 2: O Developer configure his machine
The Developer must run in the terminal:

```Bash
aws configure
# Insert the Key, the Secret, and the region (us-east-1)
```

## Step 3: Create the users into the PostgreSQL
Don't use the "postgres" user (it's a secure best practice), connect with your user to the database and run:

```SQL
-- Creating a new user for DevName
CREATE USER devname WITH PASSWORD 'mudar123';

-- Giving connection permission to your real database. 
GRANT CONNECT ON DATABASE your_database_name TO devname;

-- Giving see permission to tables in the public schema
GRANT USAGE ON SCHEMA public TO devname;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO devname;
```

## Step 4: Using your local machine to access the PostgreSQL:

1. Install aws session manager
https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html

For OpenSUSE Tumbleweed
```bash
# Download the RPM official package from AWS
curl "https://s3.amazonaws.com/session-manager-downloads/plugin/latest/linux_64bit/session-manager-plugin.rpm" -o "session-manager-plugin.rpm"

# Install using the zypper (this resolve the necessary dependencies)
sudo zypper install session-manager-plugin.rpm
```

2. Check the installation
After the installation, check if the binary is running well:

```Bash
session-manager-plugin
```

1. Connect to the SSM.
```bash
#!/bin/bash
# Script for DEV connect to the PostgreSQL
echo "Starting aws channel to the PostgreSQL..."
aws ssm start-session \
    --target <i-ID_DA_INSTANCIA_BASTION> \
    --document-name AWS-StartPortForwardingSessionToRemoteHost \
    --parameters '{"host":["<SEU-RDS-ENDPOINT.AWS.COM>"],"portNumber":["5432"],"localPortNumber":["5432"]}'
```
> This create a direct channel to the RDS without need the public IP or firewall port open to the internet.

1. Use your SQL favorite client:

- Host: localhost
- Port: 5432
- User: devname
- Database: database_name (NEVER use the rdsadmin).