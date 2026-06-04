# **React Coding Challenge — User Registration Flow**

## **Tech Stack:**

* React.js (Mandatory — No TypeScript)  
* Functional Components with Hooks  
* Redux for State Management  
* React Router DOM  
* Axios or Fetch API for API calls  
* CSS/SCSS/Tailwind/Material UI (Any modern UI framework allowed)  
* Deployment Required (Vercel / Netlify / Firebase Hosting / Render)

---

## **Design & Resources:**

* Figma Link – [*Click Here*](https://www.figma.com/design/funQTECAudHhmAOAEyVece/Assignment?node-id=711-2316&m=dev)  
  * Figma password *\-* **Woliba@123**  
* API Documentation – [*Click Here*](https://docs.google.com/document/d/1EZw1eFf96yjNXrfB5Zecfn8JoaMHrRzJQ6Lj_1thB10/edit?usp=sharing)  
  * Company name and password   
    * Name: **Woliba**  
    * Pass: **Woliba@123\!**  
* Assets (Icons, Background Image, Logo) – [*Click Here*](https://drive.google.com/file/d/1QlJmATBnxka3-oiVzwjNWNTAT7oihVyf/view)

---

# **Objective**

Build a **User Registration Flow Web Application** using **React.js** based on the provided Figma Design and API Documentation.

The application should closely follow the UI/UX provided in Figma and implement all required API integrations.

---

# 

# 

# **Registration Flow**

## **Step 1 — Verify Company Name & Password**

### **Fields:**

* Company Name  
* Password

### **Validations:**

* Password Requirements:  
  * Minimum 8 characters  
  * At least 1 uppercase letter  
  * At least 1 number

### **Requirements:**

* Call API: **verify-by-company-name-and-password**  
* **Request Method**  
* Handle API success and error states properly  
* Show loading state during API request

---

## **Step 2 — Save User details**

### **Fields:**

* Valid Email  
* Firts Name  
* Last Name  
* Company Name (Pre-filled)

### **Requirements:**

* Added email validation  
* Check First Name and Last Name (Don’t allow number and special char)  
* Call API: **save-user-details-and-send-otp**  
* Proper validation and error handling

---

**Step 3 — OTP Verification**

### **Fields:**

* 6-digit OTP

### **Requirements:**

* Auto-focus next input after digit entry  
* Backspace support for previous input  
* Handle resend otp reverse timer  
* Call API: **verify-otp-for-user-registration**  
* Proper validation and error handling

---

## **Step 4 — Login Credentials & Complete Profile**

### **Fields:**

* Password & Confirm Password   
* Date of Birth  
* Phone Number  
* Work Anniversary (Optional)  
* I agree to Woliba's Terms of Service and Privacy Policy

### **Requirements:**

* Form validation  
* Password validation  
* Call API: **verify-otp-for-user-registration**

---

**Step 5 — Interest Selection**

### **Requirements:**

* Multi-select interest options  
* Data can be:  
  * Fetched from API: **viewWellnessInterest**  
  * OR hardcoded locally

---

## **Step 6 — Wellbeing Pillars**

### **Requirements:**

* Multi-select exactly 3 wellbeing pillars  
* Proper selection validation

---

## **Step 7 — Registration Completion**

### **Requirements:**

* Call Final Registration API: **user-registration**  
* Show Loader while processing  
* Handle API success/error responses properly

---

## **Step 8 — Welcome Screen**

### **Requirements:**

* Show successful registration UI  
* Display user details if available  
* Responsive and polished UI

---

# **📌 Important Note for Candidates**

### **Timeline Rules:**

* Submit within **48 Hours**  
* You can use AI but need to submit the skills and .md file used in AI

Please inform us in advance if you plan to take the extended timeline.

---

# 

# **Deployment Requirement**

Candidates must deploy the React application and share a working live URL.

You may use any free hosting platform such as:

* Vercel  
* Netlify  
* Firebase Hosting  
* Render

The submitted application must be accessible publicly for testing and evaluation.

---

# **What You Need to Submit**

### **1\. GitHub Repository**

* Public GitHub repository with complete source code

### **2\. Live Deployed URL**

* Working hosted application link

### **3\. README.md File**

README must include:

* App Overview  
* Setup Instructions  
* Libraries/Tools Used  
* Folder Structure  
* Screenshots of each step  
* Deployment Instructions  
* Assumptions (if any)  
* Timeline Followed (48 Hours / 72 Hours)

---

# 

# **Evaluation Criteria**

We will evaluate based on:

* Proper use of React Functional Components  
* Redux State Management Implementation  
* Clean Code & Project Structure  
* UI/UX matching the Figma design  
* Form Validation & Error Handling  
* API Integration Quality  
* Responsive Design  
* Git Commit Quality  
* README Documentation Quality  
* Deployment & Working Demo

---

# **Bonus Points**

* Clean Redux Architecture  
* Unit test cases written  
* Reusable Components  
* Protected Routes / Route Guards  
* Proper Error Boundaries  
* Loader & Skeleton States  
* Optimized API Handling  
* Responsive Mobile-Friendly UI  
* Clean Navigation Flow  
* Accessibility Best Practices

---

# **Rules**

 ✅ Must use React.js only  
 ✅ Must use Functional Components  
 ✅ Must use Redux for state management  
 ✅ No TypeScript allowed  
 ✅ Must integrate provided APIs  
 ✅ Must deploy the application publicly  
 ✅ Follow clean coding practices  
 ✅ Submit within the given timeline

---

# **Suggested Folder Structure (Optional)**

src/  
├── api/  
├── assets/  
├── components/  
├── pages/  
├── redux/  
├── routes/  
├── services/  
├── styles/  
├── utils/  
└── App.js  
---

# **Recommended Free Deployment Platforms**

### **Recommended:**

* Vercel (Best for React)  
* Netlify  
* Firebase Hosting  
* Render

***Note**: Candidates are free to deploy the application on any other platform as per their convenience, provided the application is publicly accessible for testing and evaluation.*

---

# **Submission Format**

Please submit the following:

* GitHub Repository URL  
* Live Hosted Application URL  
* APK equivalent not required for React  
* README.md included in repository

---

# **Notes**

* Focus on clean architecture and maintainable code.  
* Pixel-perfect UI is appreciated but functionality is more important.  
* Proper validation and API handling are mandatory.  
* The application should work properly on both desktop and mobile screen sizes.

