**React Frontend Development**
1. Create the React project:
# npx create-react-app invoice-app
# cd invoice-app

2. Install necessary dependencies:

# npm install @mui/material @emotion/react @emotion/styled react-router-dom axios
# npm install react-google-login

3. Google OAuth Integration
Create a Google Cloud project and configure OAuth credentials:

Go to the Google Cloud Console.
Create a new project.
Enable the Google+ API and create OAuth 2.0 Client IDs.
Set the authorized redirect URIs to your frontend URL (e.g., http://localhost:3000).

4. Create the Google Login Button Component:
   Handle Login Responses and Store User Info:
   Display Invoice Details
   Trigger Automation with Zapier

5. Create and Activate a Zap
   Step 1: Create a Zap
Log in to Zapier:

Go to Zapier and log in with your account.
Start a New Zap:

Click on the "Create Zap" button.
Step 2: Set Up the Trigger
Choose the Trigger App:

In the search bar, type "Webhooks by Zapier" and select it.
Select Trigger Event:

Choose "Catch Hook" as the trigger event and click "Continue."
Set Up the Webhook:

You will see a webhook URL provided by Zapier. Copy this URL, as you will use it in your backend.
Pick off a Child Key (Optional):

If you want to filter specific data from the webhook payload, you can specify a child key. For now, you can skip this step by clicking "Continue."
Step 3: Test the Trigger
Send a Test Request from Your Backend:
Open your terminal and use the following curl command, replacing YOUR_ZAPIER_WEBHOOK_URL with
