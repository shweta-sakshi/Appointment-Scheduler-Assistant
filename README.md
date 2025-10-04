# Appointment-Scheduler-Assistant

**AI-Powered Appointment Scheduler Backend**  
This project provides a backend service that parses natural language appointment requests from either **text** or **images**. It uses an **Image preprocessing + OCR + NLP pipeline** to extract entities, normalize them into a structured format, and return a clean JSON object ready for scheduling.

---

## 📑 Table of Contents

- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Directory Structure](#-directory-structure)
- [Request Flow](#-request-flow)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)

---

## 🏗 Architecture

The application is built with **Node.js** and **Express.js**, following a **modular, service-oriented architecture** to ensure scalability and maintainability.

---

## ⚙️ Tech Stack

- **Backend:** Node.js, Express.js
- **Preprocessing:** image-js
- **Image Processing (OCR):** Tesseract.js
- **Natural Language Processing (NLP):** compromise compromise-dates (department, date/time extraction)
- **Error Handling:** Centralized middleware with custom error classes

---

## 📂 Directory Structure

src/
├── api/routes # Defines API endpoints
├── controllers # Handles requests & responses
├── services # (Preprocessing, OCR, NLP, etc.)
├── middleware # Middleware (e.g., file uploads)
└── utils # custom error Handler

---

## 🔄 Request Flow

1. Client sends a **POST request** with either an **image** or **raw text**.
2. **Multer middleware** handles image uploads.
3. **Controller** validates input and passes it to the **Pipeline Service**.
4. **preprocessing** enhance image for better text extraction(if image is provided)
5. **OCR Service** extracts text (if an image is provided).
6. **NLP Service** extracts entities (e.g., department, date, time).
7. **Normalization Service** normalizes (date and time)
8. **Controller** returns a structured JSON response or a clarification request.
9. **Global Error Handler** standardizes error responses.

---

## 🚀 Getting Started

### Prerequisites

- Node.js **v18+**

### Installation & Setup

1. Clone the repository(fork this repo):

   ```bash
   git clone <YOUR_REPOSITORY_URL>

   ```

2. Navigate to the backend folder:

   ```bash
   cd backend

   ```

3. Install dependencies:

   ```bash
   npm install

   ```

4. Create an uploadedfile folder for temporary file uploads:

   ```bash
   mkdir uploadedfile

   ```

5. Create a .env file in the backend directory:
   add PORT=3000

6. Run the server:
   ```bash
   node index.js
   ```

## 📡 API Documentation

### **Endpoint**

`POST /api/v1/appointments/parse`

This endpoint processes either an **image file** or a **raw text string** to extract appointment details.

---

### 🖼️ 1️⃣ Image Upload (multipart/form-data)

    **Request:**
    ```bash
    curl -X POST \
    http://localhost:3000/api/v1/appointments/parse \
    -F "image=@/path/to/your/appointment_note.png"

### 📝 2️⃣ Raw Text (text/plain)

**Request:**

````bash
curl -X POST \
http://localhost:3000/api/v1/appointments/parse \
-H "Content-Type: text/plain" \
-d "Book dentist next Friday at 3pm"

### ✅ Successful Response

   ```json
   {
   "appointment": {
       "department": "Dentistry",
       "date": "2025-10-10",
       "time": "15:00",
       "tz": "Asia/Kolkata"
   },
   "status": "ok"
   }

### ❓ Guardrail / Clarification Response

   ```json
   {
   "status": "needs_clarification",
   "message": "Could not determine a valid date or time."
   }
````
