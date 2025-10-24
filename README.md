# Workforce-Management-Automation-Tool

 Automates onboarding, unit assignment, and personalized email communication for new workers and excos using **Google Apps Script**.

---

## 🧾 Description

**WorkForce Management Automation Tool** is a Google Apps Script project that automates the onboarding and communication process for new workers and excos in an organization.

When new workers or excos fill out a Google Form, the system automatically:
- Generates personalized Google Docs (letters)
- Emails them to the recipients with attachments
- Sends unit heads the list of their new members
- Saves all generated documents to organized Google Drive folders

It integrates **Google Forms**, **Google Sheets**, **Google Docs**, **Gmail**, **Drive**, and **AppSheet** — creating a complete workflow with no manual work required.

---

## ⚙️ How It Works

### 📝 1. New Worker Application
- Intending workers fill out a Google Form.
- Interviewers access submitted data through an **AppSheet** interface linked to the Sheet.

### 💼 2. Unit Assignment & Notification
- After interviews, the interviewer assigns each new worker to a **unit**.
- The system:
  - Generates a **personalized unit assignment letter** containing:
    - The worker’s name and assigned unit
    - The **unit head’s name and phone number**
  - Sends the letter as an **email attachment**
  - Saves a copy of the letter in a designated **Google Drive folder**

### 👥 3. Unit Head Notification
- The system cross-checks a sheet containing each **unit head’s details** (names, emails, phone numbers).
- Each **unit head** receives:
  - An email containing the list of new workers assigned to their unit (names, emails, phone numbers).

### 📨 4. Exco Communication
- The same system processes **new breed excos**:
  - Sends each exco a **personalized invitation-to-serve letter**
  - Saves each invitation letter in a separate **Drive folder**
  - Emails them their letter as a **PDF attachment**

---

## 🗂️ Folder Structure
```
├── Code.js # Core logic: generate and send workforce letters
├── UnitHead.gs.js # Logic for notifying unit heads
├── Excos.js # Sends invitation letters to new breed excos
├── test.js # Used for testing data before production
├── appsscript.json # Project configuration file
└── README.md
```


---

## 🛠️ Setup Instructions

1. **Open Google Apps Script**
   - Visit [script.google.com](https://script.google.com/) and create a new project.

2. **Add the scripts**
   - Copy all `.js` files from this repository into your Apps Script project.

3. **Set Configuration Variables**
   - Update your IDs and folder details in the script:
     ```js
     const FOLDER_ID = "YOUR_DRIVE_FOLDER_ID";
     const TEMPLATE_ID = "YOUR_DOC_TEMPLATE_ID";
     const UNIT_SHEET_ID = "YOUR_SHEET_ID";
     ```

4. **Prepare Your Sheets**
   - Ensure you have:
     - A sheet for **new workers**
     - A sheet for **unit heads** (name, email, phone number)
     - A sheet for **new breed excos**

5. **Set Up Triggers**
   - Go to **Triggers → Add Trigger**
   - Choose the function `onFormSubmit`
   - Select event type: “From form → On form submit”

6. **Test**
   - Run `test.js` to simulate the flow before deploying live.

---

## 🧰 Technologies Used

- **Google Apps Script**
- **Google Sheets**
- **Google Forms**
- **Google Docs API**
- **GmailApp**
- **DriveApp**
- **AppSheet Integration**

---

## 🤝 Contributing

Contributions are welcome!  
If you’d like to add new features or enhance the automation (like templating or logs), feel free to:
- Open an **issue**, or  
- Submit a **pull request**

---

## 📄 License

**MIT License © 2025 Jesutoni Aderibigbe**

---

## 🏷️ GitHub Metadata

| Field | Value |
|-------|--------|
| **Repository Name** | `workforce-management-automation-tool` |
| **Short Description** | Automates onboarding, unit assignment, and personalized email communication using Google Apps Script |
| **Tags** | `google-apps-script`, `automation`, `gmail`, `google-drive`, `onboarding`, `workflow`, `appsheet` |

---

## 💡 Example Tagline (for your GitHub repo header)

> Seamlessly automates onboarding, assignments, and email communication for new workers and excos — powered by Google Apps Script.
