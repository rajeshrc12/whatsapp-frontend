# WhatsApp Frontend

---

## 🛠️ Technologies Used

**Framework & Build Tools**

- React
- Vite
- Tailwind CSS
- daisyUI

**State Management & Auth**

- Redux Toolkit
- Redux Persist
- @react-oauth/google

**Networking & Realtime**

- Axios
- Socket.io Client

**Routing & UI Utilities**

- React Router DOM
- React Icons
- React Scroll
- Moment.js
- Moment Timezone

---

## Features

- 🔐 Implemented Google Authentication for secure user login.
- 💬 Developed messaging and media sharing functionalities.
- 📁 Designed multiple file selection and preview options.
- ⚠️ Implemented warnings for file quantity and size limits.
- 📂 Integrated media preview and download functionalities.
- 🟢 Created status indicators for online/offline users with last seen timestamps.
- 🔔 Added features to display unseen message counts and mark messages as read upon contact selection.

## Demo

https://github.com/rajeshrc12/whatsapp-frontend/assets/91599153/369c663c-de08-4308-a799-ddd1d149526e

## Project is divided into two parts

1.  **Frontend** - current repo
2.  **Backend** - https://github.com/rajeshrc12/whatsapp-backend

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
