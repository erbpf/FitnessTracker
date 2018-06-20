import { NgModule } from '@angular/core'
import { MatButtonModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatSidenavModule } from '@angular/material'
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
        MatCheckboxModule,
        MatSidenavModule,
    ],
    exports: [ 
        MatButtonModule, 
        MatIconModule, 
        MatFormFieldModule, 
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatSidenavModule,
    ]
})
export class MaterialModule{};