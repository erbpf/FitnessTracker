import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { TrainingService } from './training.service';
import * as fromTraining from './training.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  // ongoingTraining = false;
  // exerciseSubscription: Subscription;
  ongoingTraining$: Observable<boolean>;

  constructor(private trainingService: TrainingService,
              private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining);
    // this.exerciseSubscription = this.trainingService.exerciseChange.subscribe(exercise => {
    //   this.ongoingTraining = (exercise) ? true : false;
    // })
  }

  onTrainingStart(p) {   
    console.log(`Starting Id: ${p.selectedId}`);
    this.trainingService.startExercise(p.selectedId);
  }

  // ngOnDestroy() {
  //   if(this.exerciseSubscription) {
  //     this.exerciseSubscription.unsubscribe();
  //   }
  // }
}
