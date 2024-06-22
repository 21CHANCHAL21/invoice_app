**Step 1: React Frontend Development**
1. Set up the Project
Initialize a new React project using Create React App or a similar setup.
Install necessary packages:

# npx create-react-app invoice-app
# cd invoice-app
# npm install @mui/material @emotion/react @emotion/styled react-router-dom axios
# npm install react-google-login

**Step 2. Google OAuth Integration**
Create a Google Cloud project and configure OAuth credentials:

Go to the Google Cloud Console.
Create a new project.
Enable the Google+ API and create OAuth 2.0 Client IDs.
Set the authorized redirect URIs to your frontend URL (e.g., http://localhost:3000).

