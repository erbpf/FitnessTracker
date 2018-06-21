import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from "rxjs";
// import { map } from "rxjs/operators";
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: Observable<any>;
  selectedExerciseId: string;

  constructor(private trainingService: TrainingService, private db: AngularFirestore) { }

  ngOnInit() {
    // this.exercises = this.db.collection('availableExercises').valueChanges();
    //  this.db.collection('availableExercises').snapshotChanges().subscribe(result => {for (const res of result) { console.log(res)});
    this.exercises = this.db
      .collection('availableExercises')
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data()
          };
        });
      });
   
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
