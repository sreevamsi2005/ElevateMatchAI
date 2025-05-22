
export interface ResponseCategory {
  keywords: string[];
  responses: string[];
}

export const RESPONSE_CATEGORIES: Record<string, ResponseCategory> = {
  resume: {
    keywords: ["resume", "cv", "portfolio", "skills list"],
    responses: [
      "Your resume is your professional story! Make sure to highlight your academic achievements, projects, and any internships or volunteer work.",
      "For a standout resume, quantify your achievements whenever possible and tailor it to each job application. Use action verbs and be specific about your contributions.",
      "Don't forget to use our AI Resume Builder tool to get personalized suggestions for improving your resume! It can help with formatting and keyword optimization.",
      "A strong resume should be concise (1-2 pages), well-organized, and error-free. Consider including a professional summary that highlights your unique value proposition."
    ]
  },
  interview: {
    keywords: ["interview", "hiring", "recruit", "job offer", "questions"],
    responses: [
      "For interviews, prepare by researching the company and practicing common questions. Remember to prepare thoughtful questions to ask them too!",
      "Mock interviews can significantly boost your confidence. Have you tried our mock interview feature in the Practice section? It gives personalized feedback!",
      "Remember to follow up with a thank-you note after your interview. It shows professionalism and genuine interest in the position.",
      "The STAR method (Situation, Task, Action, Result) is excellent for structuring your answers to behavioral questions. Practice this technique before your interviews."
    ]
  },
  study: {
    keywords: ["study", "learn", "class", "course", "exam", "assignment", "homework", "grades", "professor"],
    responses: [
      "Try the Pomodoro technique - 25 minutes of focused study followed by a 5-minute break. It works wonders for maintaining concentration!",
      "Creating a study group can help you stay accountable and provide different perspectives on challenging topics. Have you considered forming one?",
      "Don't forget to review regularly rather than cramming before exams. Spaced repetition is key to long-term retention of information.",
      "Active recall (testing yourself) is more effective than passive review. Try explaining concepts out loud or teaching them to someone else to reinforce your understanding."
    ]
  },
  motivation: {
    keywords: ["motivate", "inspire", "discourage", "tired", "stressed", "burnout", "overwhelmed", "stuck"],
    responses: [
      "Remember why you started this journey. Your future self will thank you for persisting through these challenges!",
      "Break big goals into smaller, manageable tasks. Each small win will fuel your motivation and build momentum toward your larger objectives.",
      "It's okay to take breaks! Balance is essential for sustainable progress and preventing burnout. Self-care isn't selfish—it's necessary.",
      "Everyone faces setbacks. What separates successful people is their ability to learn from failures and keep moving forward. You've got this!"
    ]
  },
  career: {
    keywords: ["career", "job", "profession", "industry", "field", "employment", "work", "internship"],
    responses: [
      "Explore different career paths by talking to professionals in fields that interest you. Most people are happy to share their experiences!",
      "Consider how your strengths, values, and interests align with potential career paths. The best careers often involve work that feels meaningful to you.",
      "Building a professional network now can open doors later. Attend industry events, join relevant online communities, and connect with alumni.",
      "Don't be afraid to pivot if your interests change. Many successful professionals have changed directions multiple times throughout their careers."
    ]
  },
  skills: {
    keywords: ["skill", "learn", "develop", "improve", "certification", "training", "workshop"],
    responses: [
      "Focus on developing both technical and soft skills. Communication, problem-solving, and adaptability are highly valued across all industries.",
      "Consider pursuing relevant certifications to validate your skills. They can give you a competitive edge in the job market.",
      "Our platform offers various skill assessment tools to help identify your strengths and areas for improvement. Have you tried them yet?",
      "The most in-demand skills change over time. Stay updated with industry trends through professional journals, webinars, and online courses."
    ]
  },
  balance: {
    keywords: ["balance", "stress", "mental health", "wellness", "self-care", "burnout", "overwhelmed"],
    responses: [
      "Maintaining work-life balance is crucial for long-term success. Schedule dedicated time for relaxation and activities you enjoy.",
      "Physical exercise can significantly improve cognitive function and reduce stress. Even a 20-minute daily walk can make a difference!",
      "Practice mindfulness or meditation to help manage stress. Just 5-10 minutes daily can improve focus and emotional regulation.",
      "Don't hesitate to seek support when needed. Our platform connects you with resources for mental health and wellness."
    ]
  },
  general: {
    keywords: [],
    responses: [
      "I'm here to help! What specific area would you like guidance on? I can assist with career planning, study strategies, interview preparation, and more.",
      "Is there a particular challenge you're facing right now that I can assist with? Sometimes talking it through can help clarify the best approach.",
      "Remember, every successful person started somewhere. Persistence and continuous learning are key to achieving your goals!",
      "The most effective way to advance is to set specific, measurable goals and track your progress. Would you like some help setting up a development plan?"
    ]
  }
};

export function findBestResponseCategory(userInput: string): string {
  const normalizedInput = userInput.toLowerCase();
  
  // Check each category for keyword matches
  for (const [category, data] of Object.entries(RESPONSE_CATEGORIES)) {
    if (category === 'general') continue; // Skip general category for now
    
    for (const keyword of data.keywords) {
      if (normalizedInput.includes(keyword)) {
        return category;
      }
    }
  }
  
  // No specific matches, use general category
  return 'general';
}

export function generateBotResponse(userInput: string): string {
  const category = findBestResponseCategory(userInput);
  const responses = RESPONSE_CATEGORIES[category].responses;
  return responses[Math.floor(Math.random() * responses.length)];
}
