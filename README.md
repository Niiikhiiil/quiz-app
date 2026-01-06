# Quiz App (Proctored React Quiz)

A proctored online quiz application built using **React**, **Vite**, and **Tailwind CSS**.  
The app enforces exam rules such as fullscreen mode, tab switching detection, refresh prevention, and developer tools monitoring.

---

## Features

- Fullscreen enforced quiz mode
- Prevents page refresh during active quiz
- Detects and logs violations:
  - Tab switching or window minimization
  - Exiting fullscreen mode
  - Right-click attempts
  - DevTools shortcuts (F12, Ctrl+Shift+I/J/C, Ctrl+U)
- Real-time violation counter
- Question navigation (Next / Previous)
- Quiz submission on last question
- Final score with violations summary

---

## Quiz Flow

1. **Ready**
   - Displays exam rules
   - User starts the quiz
2. **Active**
   - Fullscreen enabled
   - Questions shown one at a time
   - Violations tracked live
3. **Finished**
   - Displays score and violations

---

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Custom React Hooks
- ESLint

---

## Project Structure

```text
src
├── components
│   ├── QuizStart.jsx
│   ├── QuizQuestion.jsx
│   ├── QuizNavigation.jsx
│   ├── QuizSubmit.jsx
│   └── QuizResults.jsx
├── hooks
│   └── useQuiz.js
├── data
│   └── questions.json
├── App.jsx
└── main.jsx
```
Installation:
```text
npm install
```
Run Development Server:
```text
npm run dev
```
Build for Production:
```text
npm run build

```
## Notes
- Browsers do not allow fully blocking DevTools; attempts are detected and recorded
- beforeunload behavior may vary across browsers
- Fullscreen enforcement depends on browser support

## Author
- Nikhil Muliya
- Give ⭐⭐⭐⭐⭐
