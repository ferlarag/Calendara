enum QuestionResponse {
  singleLine = "Single Line",
  multipleLines = "Multiple Lines",
  singleOption = "Single Option",
  multipleOptions = "Multiple Options",
  yesOrNo = "Yes or no",
}

export interface Question {
  id: string;
  title: string;
  responseType: QuestionResponse;
}

export interface EventBookingOptions {
  askForName: boolean;
  askForLastName: boolean;
  askForEmail: boolean;
  askForNumber: boolean;
  questions: Question[];
}
