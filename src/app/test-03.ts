/**
 * Update the following components to meet the requirements : 
 * 
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 * 
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 * 
 * You can add error messages below each field that shows if the field is not valid
 */
import { Component, NgModule  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
    selector : 'ng-app',
    template : `<form (submit)="submit()" novalidate>
                    <h2>Login</h2>
                    <br/>
                    <input type="email" [value]="email" name="email" (change)="onValChange($event)" />
                    <br/>
                    <input type="password" [value]="password" name="password" (change)="onValChange($event)" />
                    <button type="submit">Submit</button>
                    <br/><br/>
                    <div *ngIf="logged_in">Logged In!</div>
                </form>`
})
export class Test03Component {

    email:string = "";
    password:string = "";

    logged_in = false;

    onValChange(event){
        if(event){
            if(event.target.name == 'email'){
                this.email = event.target.value;
            }else{
                this.password = event.target.value;
            }
        }
    }

    submit(){
        event.preventDefault();
        let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        let passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        if(!regex.test(this.email)){
            alert("Invalid Email");
            return;
        };
        if(!passRegex.test(this.password)){
            alert("Invalid format password");
            return;
        }
        this.logged_in = true;
    }
}

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test03Component
            }
        ])
    ],
    declarations : [Test03Component]
})
export class Test03Module {};