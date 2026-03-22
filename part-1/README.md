# HDR UK Technical Test - Part 1: Product Feedback Form

## 📌 Overview

A production-ready React component for a SaaS product feedback widget. Users can submit a star rating (1–5) and a written comment. The form simulates an asynchronous API submission process with comprehensive state management, validation, and user feedback.

## 🛠 Tech Stack

* **Framework:** React (Bootstrapped with Vite)
* **Styling:** Tailwind CSS (Custom configured with a centralised design system variable approach)

## ✅ Features & Assessment Criteria

* **React Fundamentals:** Handled natively using `useState` for `rating`, `comment`, and `status`. The textarea is fully controlled by React state.
* **Async Handling:** Uses a Promise-wrapped `setTimeout` to mimic a 1.5-second API network request, complete with dynamic `idle`, `loading`, and `success` UI states.
* **Code Quality & UI Instinct:** Enforces both a star rating and a comment with clear validation errors. The submit button disables during loading to prevent duplicate submissions, and the styling uses a robust, scalable Tailwind CSS variable configuration.