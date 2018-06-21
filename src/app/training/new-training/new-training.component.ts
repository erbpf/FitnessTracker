import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from "rxjs";
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exerciseSubscription: Subscription;
  isLoading: boolean = false;
  private loadingSubs: Subscription;

  constructor(private trainingService: TrainingService, 
              private db: AngularFirestore,
              private uiServics: UIService) { }

  ngOnInit() {
    this.loadingSubs = this.uiServics.loadingStateChanged.subscribe(isLoading => this.isLoading = isLoading);
    this.exerciseSubscription = this.trainingService.exercisesChange.subscribe(
      exercises => { 
        if(exercises != null) {
          (this.exercises = exercises)
        } else {

        }
      });
    
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    console.log(`Selected Id: ${form.value.exercise}`);
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }

}
