/**
 * Update the following components to meet the requirements : 
 * * Bind `field` of [textfield] component to its text input
 * * Pass value of `field` from [textfield] component to [title] property of component [ng-app]
 */

/* Developer Comments */
/* I would have used Service as well to pass data but for now I have used event Emitter */
import { Component, NgModule, Output, EventEmitter  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';


@Component({
    selector : 'textfield',
    template : '<input (input)="onValChange($event)" type="text" [value]="field" />',
})

export class TextField {
    field = "";
    @Output() textVal = new EventEmitter<string>();
    onValChange(event){
        this.field = event.target.value;
        this.textVal.emit(this.field);
    }
}

@Component({
    selector : 'child-component',
    template : `<h2>Title:<h2><br/><textfield (textVal)="getTextFieldVal($event)"></textfield>`
})
export class ChildComponent {
    @Output() textValFromChild = new EventEmitter<string>();
    getTextFieldVal(val){
        this.textValFromChild.emit(val)
    }

}


@Component({
    selector : 'ng-app',
    template : `<div>
                    <child-component (textValFromChild)="getTitleFieldVal($event)"></child-component> <br/>
                    Title is {{title}}
                </div>`,                    
})
export class Test02Component {
    title:string = "";
    getTitleFieldVal(val){
        this.title = val
    }    
}

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test02Component
            }
        ])
    ],
    declarations : [Test02Component,ChildComponent,TextField]
})
export class Test02Module {};