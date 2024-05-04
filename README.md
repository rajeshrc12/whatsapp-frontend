# WhatsApp Frontend
Project is divided into two parts
Frontend - current repo
Backend - https://github.com/rajeshrc12/whatsapp-backend
Make sure you install both 

If you encounter any issues during installation, feel free to reach out to me on LinkedIn: https://www.linkedin.com/in/rajeshcharhajari/

## Project Installation

1. **Clone the Project:**
   git clone https://github.com/rajeshrc12/whatsapp-frontend.git

2. **Navigate to Project Directory:**
   cd whatsapp-frontend

3. **Create `.env` File:**

- Create a file named `.env` in the root folder.
- Add the following variables to the `.env` file:

  ```
  VITE_GOOGLE_ID=
  VITE_SERVER_URL=http://localhost:<YOUR_SERVER_PORT>/
  ```

      For VITE_GOOGLE_ID, follow these instructions:
      https://support.google.com/workspacemigrate/answer/9222992?hl=en
      https://youtu.be/OKMgyF5ezFs

      Ensure you add the Authorized JavaScript Origin properly; otherwise, you won't be able to log in.

4. **Install Dependencies:**
   npm install

5. **Start the Project:**
   npm run dev

   **Troubleshooting Tips: **
   If you face issues with Google authentication, double-check your .env file settings and the Authorized JavaScript Origin in your Google Developer Console.
   Ensure your server is running and accessible via the specified VITE_SERVER_URL.
   For additional help, refer to the project documentation or reach out on LinkedIn.
   Happy coding! 🚀
