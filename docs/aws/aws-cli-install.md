# AWS CLI Installation 
To install the AWS CLI, follow steps bellow for your OS:

## Linux (Ubuntu/Debian):
1. Install the unzip:
```bash
sudo apt install unzip
```

2. Download and install the latest version:
```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

3. Check the installation:
```bash
aws --version
```

## Windows:
- Download the installer in https://awscli.amazonaws.com/AWSCLIV2.msi and run. After installation, the AWS CLI should be avalilable in both the command prompt cmd and PowerShell.

## macOS:
- Use the Homebrew:
```bash
brew install awscli
```

- Or download the installer .pkg from the AWS official site. 


# Configuration for AWS CLI
After the installation, configure the AWS CLI with your credentials:

1. Run th command:
```bash
aws configure
```

1. Fill in the requested fields:

- AWS Access Key ID: Insert the access key (got in IAM).
- AWS Secret Access Key: Insert the secret key.
- Default region name: Ex: us-east-1 (default region).
- Default output format: json.

> Important: Save your keys in the secure place. Never share or expose in the code.