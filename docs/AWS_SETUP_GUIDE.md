# 🔑 AWS Setup Guide: Getting Your Access Keys

Follow these steps to generate the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` needed for SubScout (and EchoLog/Context Clue).

## Step 1: Login to AWS Console

1.  Go to [aws.amazon.com/console](https://aws.amazon.com/console).
2.  Sign in to your AWS account.

## Step 2: Create a User in IAM

We need to create a "service account" that has permission to talk to Bedrock (the AI service).

1.  In the top search bar, type **IAM** and click **IAM** (Identity and Access Management).
2.  In the left sidebar, click **Users**.
3.  Click the orange **Create user** button.
4.  **User details:**
    - User name: `NovaHackathonUser`
    - Click **Next**.
5.  **Permissions:**
    - Select **Attach policies directly**.
    - In the "Permissions policies" search box, type `Bedrock`.
    - Check the box for **`AmazonBedrockFullAccess`**.
    - Click **Next**.
6.  Click **Create user**.

## Step 3: Generate Access Keys

1.  Click on the user you just created (`NovaHackathonUser`) in the list.
2.  Click the **Security credentials** tab (halfway down the page).
3.  Scroll down to the **Access keys** section.
4.  Click **Create access key**.
5.  Select **Local code** (or just check the box saying you understand recommendations).
6.  Click **Next**, then **Create access key**.

## 🛑 IMPORTANT: Copy Keys Now

You will see two keys. **Copy them immediately.**

- **Access key:** Starts with `AKIA...` (This is your `AWS_ACCESS_KEY_ID`)
- **Secret access key:** Starts with `wJalr...` (This is your `AWS_SECRET_ACCESS_KEY`)

**Note:** You cannot see the Secret Key again after you close this window!

## Step 4: Enable Nova Models (Compulsory!)

Even with keys, the AI models are "off" by default. You must enable them.

1.  In the top search bar, type **Bedrock** and click **Amazon Bedrock**.
2.  Check your **Region** in the top-right corner (e.g., `N. Virginia` vs `Oregon`).
    - _Note this region! This is your `AWS_REGION` (e.g., `us-east-1`)_.
3.  In the left sidebar, scroll down to **Model access**.
4.  Click the orange **Enable specific models** button.
5.  Look for the **Amazon** section.
6.  Check the boxes for:
    - **Titan Text G1 - Express** (or Premier)
    - **Titan Image Generator**
    - **Nova Lite**
    - **Nova Micro**
    - **Nova Pro**
    - _(Select all Nova models available)_
7.  Click **Next** / **Submit**.
8.  Wait a minute until the Status changes to "Access granted" (green).

## Step 5: Configure your Project

### For Local Development:

Paste the keys into your `.env.local` file:

```env
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=wJalr...
AWS_REGION=us-east-1
```

### For Vercel Deployment:

1.  Go to your Vercel Project Dashboard.
2.  Click **Settings** -> **Environment Variables**.
3.  Add the same 3 variables there.
