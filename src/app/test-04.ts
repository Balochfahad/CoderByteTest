/**
 * Add 2 input forms in the following component for first name and last name. Once both forms are filled out by the user, and user has clicked out of the fields, then beside it a username should be automatically generated which should be in the following format: [firstname]_[lastname]_[random integer]
 * First name and last name should be lowercased, and then a random integer between 1 and 9 should be added to the end
 * For example: if the inputs are "John" and "DOE" the generated username could be "john_doe_4" or "john_doe_2"
 */
import { Component, NgModule  } from '@angular/core';
import { RouterModule} from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
    selector : 'ng-app',
    template : `
                <h2>Enter your first and last name</h2>
                <div class="inputSec">
                    <input class="inputs" name="firstName" [value]="firstName" placeholder="First Name" (blur)="getFielVal($event)" />
                    <input class="inputs" name="lastName" [value]="lastName" placeholder="Last Name" (blur)="getFielVal($event)" />
                    <p *ngIf="username">Username: {{username}}</p>
                </div>
                `,
    styles : ['.inputSec { display: flex; flex-direction: column; justify-content: center; align-items: center }','.inputs { border-radius: 4px; width: 20rem; margin-bottom: 10px }']
})
export class UserNameComponent {
    username: any = ""
    firstName: any="";
    lastName: any="";

    getFielVal(event){
        if(event.target.name == 'firstName'){
            this.firstName = event.target.value;
        }else{
            if(event.target.name == 'lastName'){
                this.lastName = event.target.value;
            }
        }

        if(this.firstName && this.lastName){
            let num = Math.random() * 100;
            this.username = `${this.firstName}_${this.lastName}_${parseInt(num.toFixed(0))}`;
        }
    }

}

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : UserNameComponent
            }
        ])
    ],
    declarations : [UserNameComponent]
})
export class UserNameModule {}