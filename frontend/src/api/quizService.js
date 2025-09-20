// src/api/quizService.js
export const submitQuiz = async (quizData) => {
  try {
    const response = await fetch('/api/quiz/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quizData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error submitting quiz:", error);
    throw error;
  }
};
