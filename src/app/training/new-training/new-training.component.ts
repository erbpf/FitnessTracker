import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription, Observable } from "rxjs";
import { Store } from '@ngrx/store';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { UIService } from '../../shared/ui.service';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;
  private loadingSubs: Subscription;

  constructor(private trainingService: TrainingService,
    private db: AngularFirestore,
    private uiServics: UIService,
    private store: Store<fromTraining.State>) { }

  ngOnInit() {
   this.isLoading$ = this.store.select(fromRoot.getIsLoading);
   this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
   this.fetchExercises();
  }

  fetchExercises() {
    console.log('fetching exercises');
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    console.log(`Selected Id: ${form.value.exercise}`);
    this.trainingService.startExercise(form.value.exercise);
  }

}
