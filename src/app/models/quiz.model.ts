export class Choice {
  constructor(public value: string, public correct?: boolean) {}
}

export class Question {
  constructor(public label: string, public choices: Choice[]) {}
}

// represents data to load
export class Quiz {
  constructor(public label: string, public name: string, public description: string, public fileName: string) {}
}

// represents data app will collect each time user answers question
export class Answers {
  constructor(public values: Choice[] = []) {}
}

export interface QuizCategory {
  url: string;
  imgPath: string;
  alt: string;
  label: string;
}

export interface QuizData {
  // quizId: number,
  id: number;
  player1Id: number;
  player2Id: number;
  testStartPlayer1: Date;
  testStartPlayer2: Date;
  testEndPlayer1: Date;
  testEndPlayer2: Date;
  totalQuestions: number;
  testType: string;
  correctAnswersPlayer1: number;
  correctAnswersPlayer2: number;
  updatedAt: Date;
  createdAt: Date;
}


export interface QuizDataPost {
  // quizId: number,
  // id: number;
  player1Id: number;
  player2Id: number;
  testStartPlayer1: Date;
  testStartPlayer2: Date;
  testEndPlayer1: Date;
  testEndPlayer2: Date;
  totalQuestions: number;
  testType: string;
  correctAnswersPlayer1: number;
  correctAnswersPlayer2: number;
  // updatedAt: Date
}
