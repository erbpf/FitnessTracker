import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Exercise } from './exercise.model';
import { UIService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';
import * as fromTraining from './training.reducer';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private fbSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(
      this.db
        .collection('availableExercises')
        .snapshotChanges()
        .map(docArray => {
          // throw(new Error());
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              ...doc.payload.doc.data(),
            };
          });
        })
        .subscribe(
          (exercises: Exercise[]) => {
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new Training.SetAvailableTrainings(exercises));
          },
          error => {
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackbar(
              'Fetching Exercises failed, please try again later',
              null,
              3000
            );
            this.exercisesChanged.next(null);
          }
        )
    );
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.store.dispatch(new Training.StopTraining());
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.store.dispatch(new Training.StopTraining());
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.store.dispatch(new Training.SetFinishedTrainings(exercises));
        })
    );
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}


// import { Subject } from "rxjs";
// import { Injectable } from "@angular/core";
// import { AngularFirestore } from "angularfire2/firestore";
// import { Observable, Subscription } from "rxjs";
// import 'rxjs/add/operator/map'
// import { State, Store } from "@ngrx/store";

// import { Exercise } from "./exercise.model";
// import { UIService } from "../shared/ui.service";
// import * as UI from '../shared/ui.actions';
// import * as Training from './training.actions';
// import * as fromTraining from './training.reducer';


// @Injectable()
// export class TrainingService {
//     exerciseChange = new Subject<Exercise>();
//     exercisesChange = new Subject<Exercise[]>();
//     finishedExercisesChanged = new Subject<Exercise[]>();
//     private availableExercises: Exercise[] = [];
//     private runningExercise: Exercise;
//     private exercises: Exercise[] = [];
//     private fbSubs: Subscription[] = [];

//     constructor(private db: AngularFirestore,
//         private uiService: UIService,
//         private store: Store<fromTraining.State>) { }

//     fetchAvailableExercises() {
//         this.store.dispatch(new UI.StartLoading());
//         // this.uiService.loadingStateChanged.next(true);
//         this.fbSubs.push(this.db
//             .collection('availableExercises')
//             .snapshotChanges()
//             .map(docArray => {
//                 return docArray.map(doc => {
//                     return {
//                         id: doc.payload.doc.id,
//                         ...doc.payload.doc.data()
//                     };
//                 });
//             })
//             .subscribe((exercises: Exercise[]) => {
//                 this.store.dispatch(new UI.StopLoading());
//                 (exercises: Exercise[]) => {
//                     console.log(`retrieved exercises: ${exercises}`);
//                     this.store.dispatch(new Training.SetAvailableTrainings(exercises));
//                 }
//                 console.log({...this.availableExercises});
//                 // this.availableExercises = exercises;
//                 // this.exercisesChange.next([...this.availableExercises]);
//                 this.uiService.loadingStateChanged.next(false);
//             }, error => {
//                 this.store.dispatch(new UI.StopLoading());
//                 (exercises: Exercise[]) => {
//                     this.store.dispatch(new Training.SetAvailableTrainings(null));
//                 }
                
//                 console.log(error);
//                 // this.uiService.loadingStateChanged.next(false);
//                 // this.exercisesChange.next(null);
//                 this.uiService.showSnackbar(`Fetching Exercises failed, please try again later.\n${error.message}`, null, 3000);

//             }));
//     }

//     startExercise(selectedId: string) {
//         this.store.dispatch(new Training.StartTraining(selectedId));

//         // this.db.doc('availableExercises/' + selectedId).update({ lastSelected: new Date() });
//         // this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
//         // this.exerciseChange.next({ ...this.runningExercise });
//     }

//     completeExercise() {
//         this.store.dispatch(new Training.StopTraining());

//         // this.addDataToDatabase({ ...this.runningExercise, date: new Date(), state: 'completed' });
//         // this.runningExercise = null;
//         // this.exerciseChange.next(null);
//     }

//     cancelExercise(progress: number) {
//         this.addDataToDatabase({
//             ...this.runningExercise,
//             duration: this.runningExercise.duration * (progress / 100),
//             calories: this.runningExercise.calories * (progress / 100),
//             date: new Date(),
//             state: 'cancelled'
//         });

//         this.store.dispatch(new Training.StopTraining());
//         // this.runningExercise = null;
//         // this.exerciseChange.next(null);
//     }

//     getRunningExercise() {
//         return { ...this.runningExercise };
//     }

//     fetchCompletedOrCancelledExercises() {
//         this.fbSubs.push(this.db.collection('finishedExercises')
//             .valueChanges()
//             .subscribe((exercises: Exercise[]) => {
//                 this.store.dispatch(new Training.SetFinishedTrainings(exercises));
//                 // this.finishedExercisesChanged.next(exercises);
//             }, error => {
//                 // console.log(error);
//                 this.uiService.showSnackbar(error.message, null, 3000);
//             }));
//     }

//     cancelSubscriptions() {
//         this.fbSubs.forEach(sub => sub.unsubscribe);
//     }

//     private addDataToDatabase(exercise: Exercise) {
//         this.db.collection('finishedExercises').add(exercise);
//     }
// }