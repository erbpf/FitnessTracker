import { NgModule } from '@angular/core'
import { MatButtonModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule } from '@angular/material'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    imports: [ 
        MatButtonModule, 
        MatIconModule, 
        MatFormFieldModule, 
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule
    ],
    exports: [ 
        MatButtonModule, 
        MatIconModule, 
        MatFormFieldModule, 
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule
    ]
})
export class MaterialModule{};