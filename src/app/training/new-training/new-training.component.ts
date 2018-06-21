import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: Exercise[] = [];
  selectedExerciseId: string;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exercises = this.trainingService.getAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    console.log(`Selected Id: ${form.value.exercise}`);
    this.trainingService.startExercise(form.value.exercise);
  }

  // Bound Property Approach
  // onStartTraining() {
  //   this.trainingService.startExercise(this.selectedExerciseId);
  // }
}
