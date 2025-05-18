 
# 📝 Vue AI Blog Editor (SPA)

A **single-page application (SPA)** built with **Vue.js** and **Bootstrap**, featuring a rich-text editor for blogging with **AI-powered writing assistance**. Users can sign up, log in, and create/edit/save/delete blog drafts with smart AI support for generating titles, summarizing content, and suggesting keywords. All data is stored locally in the browser using `localStorage`.

---

## 🚀 Features

* 🔐 **User Authentication**

  * Simple sign-up and login system (stored locally)

* 📝 **Rich-Text Editor**

  * Write and format blog content in a WYSIWYG editor

* 🤖 **AI-Powered Writing Assistance** (via [Gemini AI API](https://ai.google.dev/))

  * `Generate Title`: Create a compelling blog title
  * `Summarize Content`: Auto-generate a concise summary of your content
  * `Suggest Keywords`: Extract relevant keywords from your draft

* 💾 **Draft Management**

  * Create new blog drafts using a modal interface
  * Save drafts to local storage
  * Edit or delete drafts any time

---

 

## 🛠️ Technologies Used

* **Vue.js 3**
* **Bootstrap 5**
* **Gemini AI API (via fetch or Axios)**
* **localStorage (for saving drafts and user data)**

---

## 📦 Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/AyomideSeyiAdigun/ethwas-blog.git
   cd AYO-VUE-BLOG
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the App**

   ```bash
   npm run dev
   ```

4. **Configure API Key**

   * Create a `.env` file in the root:

     ```
     VITE_API_URL=your_api_url_here
     VITE_API_KEY=your_api_key_here
     ```
   

---

## 🧠 How It Works

* When a user logs in and clicks **Create Draft**, a modal opens with a rich-text editor.
* The three AI-powered buttons:

  * Call the Gemini API with the current content to:

    * Generate a blog title (`generateTitle`)
    * Summarize the written text (`summarizeContent`)
    * Suggest relevant keywords (`suggestKeywords`)
* Drafts are stored in `localStorage` under the logged-in user.
* Drafts can be edited or deleted later.

---

## ✨ Example Gemini API Calls

```js
// Example POST request for generating a title
await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    contents: [{ parts: [{ text: "Suggest a blog title for the following content: ..." }] }]
  })
});
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.vue
│   ├── SingleDraft.vue
│   └── icons/
│       ├── AddIcon.vue
│       ├── DeleteIcon.vue
│       └── EditIcon.vue
│
├── constants/
│   └── constants.ts
│
├── dto/
│   ├── draft-dto.ts
│   └── login-dto.ts
│
├── router/
│   └── index.ts
│
├── services/
│   ├── draftService.ts
│   ├── localStorage.ts
│   └── userService.ts
│
├── store/
│   └── loggedIn-store.ts
│
├── views/
│   ├── DraftView.vue
│   ├── HomeView.vue
│   ├── Login.vue
│   └── Signup.vue
│
├── App.vue
└── main.ts



```

---

## 📄 License

This project is open-source under the [ETWASRECHERCHE](LICENSE).

---

## 🙋‍♀️ Contributing

Feel free to fork the repo, submit pull requests, or suggest features via issues.

 