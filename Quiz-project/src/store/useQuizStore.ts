import { create } from "zustand";
type QuestionType = "mcq" | "true_false" | "fill_blank" | "image" | "match";
type Question = {
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: number|string;
  Explanation: string;
  imageUrl?:string;
  blanksCount?:number;
  matches?:{left:string;right:string[]};
};

interface QuizState {
  currentQuestion: number;
  answers: (number | null)[];
  score: number;
  showScore: boolean;
  showSolution: boolean;
  questions: Question[];
  selectAnswer: (optionIndex: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  resetQuiz: () => void;
  solution: () => void;
}

const useQuizStore = create<QuizState>((set, get) => ({
  currentQuestion: 0,
  answers: Array(10).fill(null),
  score: 0,
  showScore: false,
  showSolution: false,

  questions: [
    {
      type:"mcq",
      question: "What does CSS stand for?",
      options: [
        "Computer Style Sheets",
        "Creative Style Sheets",
        "Cascading Style Sheets",
        "Colorful Style Sheets",
      ],
      correctAnswer: 2,
      Explanation:
        "CSS stands for Cascading Style Sheets, which is used to control the layout, colors, fonts, and overall look of web pages.",
    },
    { type:"mcq",
      question: "What does HTTP stand for?",
      options: [
        "Hypertext Technical Protocol",
        "Hypertext Transfer Protocol",
        "High Transfer Text Protocol",
        "Hyper Transfer Text Protocol",
      ],
      correctAnswer: 1,
      Explanation:
        "HTTP stands for Hypertext Transfer Protocol, which defines how data is transmitted between a web browser and a server.",
    },
    { type:"mcq",
      question: "Which language is primarily used for web scripting?",
      options: ["JavaScript", "Python", "C++", "Java"],
      correctAnswer: 0,
      Explanation:
        "JavaScript is the most common scripting language for web development, used to make web pages interactive and dynamic.",
    },
    {
      type:"mcq",
      question: "What does SQL stand for?",
      options: [
        "Standard Question Language",
        "Simple Query Language",
        "Sequential Query Language",
        "Structured Query Language",
      ],
      correctAnswer: 3,
      Explanation:
        "SQL stands for Structured Query Language, which is used to manage and manipulate relational databases.",
    },
    { type:"mcq",
      question: "What is the main function of a web server?",
      options: [
        "To store data",
        "To run applications",
        "To serve web pages to clients",
        "To protect networks",
      ],
      correctAnswer: 2,
      Explanation:
        "A web server's main function is to store and serve website content (HTML, CSS, images, etc.) to users via the internet.",
    },
    { type:"mcq",
      question: "Which company developed the Java programming language?",
      options: ["Sun Microsystems", "Microsoft", "IBM", "Apple"],
      correctAnswer: 0,
      Explanation:
        "Java was originally developed by Sun Microsystems in 1995 and is now owned by Oracle Corporation.",
    },
    { type:"mcq",
      question: "What is the purpose of the <title> tag in HTML?",
      options: [
        "To create a new section",
        "To define the title of the web page",
        "To add a comment",
        "To include a script",
      ],
      correctAnswer: 1,
      Explanation:
        "The <title> tag defines the title of the HTML document, which appears in the browser tab and is important for SEO.",
    },
    { type:"mcq",
      question: "What does API stand for?",
      options: [
        "Application Program Interface",
        "Advanced Programming Interface",
        "Application Programming Interface",
        "Automated Program Interface",
      ],
      correctAnswer: 2,
      Explanation:
        "API stands for Application Programming Interface, which allows different software applications to communicate with each other.",
    },
    { type:"mcq",
      question: "What is the purpose of a database index?",
      options: [
        "To store large files",
        "To create backups",
        "To manage user permissions",
        "To speed up data retrieval",
      ],
      correctAnswer: 3,
      Explanation:
        "A database index improves query performance by allowing faster data retrieval, similar to an index in a book.",
    },
    { type:"mcq",
      question:
        "Which protocol is commonly used for secure communication over the internet?",
      options: ["HTTPS", "FTP", "HTTP", "SMTP"],
      correctAnswer: 0,
      Explanation:
        "HTTPS (Hypertext Transfer Protocol Secure) encrypts the data sent between a browser and a server, ensuring privacy and security.",
    },
  {
    type: "true_false",
    question: "The Earth is flat.",
    options: ["True", "False"],
    correctAnswer: 1,
    Explanation: "The Earth is spherical."
  },
  {
    type: "fill_blank",
    question: "______ is the capital of France.",
    correctAnswer: "Paris",
    Explanation: "Paris is the capital city of France."
  },
  {
    type: "image",
    question: "Identify this landmark.",
    imageUrl: "/images/eiffel_tower.jpg",
    options: ["Eiffel Tower", "Statue of Liberty", "Big Ben"],
    correctAnswer: 0,
    Explanation: "The Eiffel Tower is located in Paris, France."
  }


  ],

  selectAnswer: (optionIndex) =>
    set((state) => {
      const answers = [...state.answers];
      answers[state.currentQuestion] = optionIndex;
      return { answers };
    }),

  nextQuestion: () =>
    set((state) => {
      const isLastQuestion =
        state.currentQuestion === state.questions.length - 1;

      if (isLastQuestion) {
        let score = 0;
        state.questions.forEach((question, index) => {
          if (state.answers[index] === question.correctAnswer) {
            score++;
          }
        });
        return { showScore: true, score };
      }

      return { currentQuestion: state.currentQuestion + 1 };
    }),

  prevQuestion: () =>
    set((state) => ({
      currentQuestion: Math.max(state.currentQuestion - 1, 0),
    })),

  resetQuiz: () =>
    set((state) => ({
      currentQuestion: 0,
      answers: Array(state.questions.length).fill(null),
      score: 0,
      showScore: false,
      showSolution: false,
    })),

  solution: () =>
    set((state) => ({
      showSolution: !state.showSolution,
    })),
}));

export default useQuizStore;
