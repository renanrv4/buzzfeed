import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quizz',
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit {
  title:string = ""
  questions: any
  questionSelected: any

  answers:string[] = []
  answerSelected:string = ""

  questionIndex:number = 0
  questionMax:number = 0

  finish:boolean = false
  constructor() { }

  ngOnInit(): void {
    if(quizz_questions) {
      this.finish = false
      this.title = quizz_questions.title
      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]
      this.questionIndex = 0
      this.questionMax = this.questions.length

    }
  }

  playerChoose(value:string) {
    this.answers.push(value)
    this.nextQuestion()
  }

  async nextQuestion() {
    this.questionIndex++
    if(this.questionIndex < this.questionMax) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finish = true
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
    }
  }

  async previousQuestion() {
    if(this.questionIndex > 0) {
      this.questionIndex--
      this.questionSelected = this.questions[this.questionIndex]
      this.answers.pop()
    }
  }

  async checkResult(answers:string[]) {
    const result = answers.reduce((previous, current, i, arr) => {
      if(
        arr.filter(item => item === previous).length > 
        arr.filter(item => item === current).length) 
      {
        return previous
      } else {
        return current
      }
    })
    return result
  }

  async restart() {
    this.answers = []
    this.questionIndex = 0
    this.questionSelected = this.questions[this.questionIndex]
    this.finish = false
  }

}
