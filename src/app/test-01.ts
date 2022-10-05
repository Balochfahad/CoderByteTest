/**
 * In the following component, update the code so that when the value of the [loan-amount] is changed:
 * * If it's blank or 0, the values of [monthly_payment] and [late_payment] becomes "N/A",
 * * If it has a value, the value of [monthly_payment] becomes 2% of [loan-ammount] and the value of [late_payment] becomes 5% of [monthly_payment].
 * * Both [monthly_payment] and [late_payment] should print in the template in currency format : $1,234
 */

import { Component, Input,NgModule, OnInit  } from '@angular/core';
import { RouterModule } from "@angular/router";
import {CurrencyPipe} from "@angular/common"

@Component({
    selector : 'ng-app',
    template : `<div>
                    <h2>Loan Details</h2>
                    <b>Monthly Payment:</b> {{convertedMonthlyPayment ? convertedMonthlyPayment : monthly_payment ? monthly_payment : 'N/A'}} <br/>
                    <b>Late Payment Fee : {{late_payment ? late_payment : 'N/A'}}</b> <br/>
                </div>`,
    providers: [CurrencyPipe]                      
})
export class Test01Component implements OnInit {
    constructor(private currencyPipe: CurrencyPipe){}
    loan_amount:number = 1000;
    monthly_payment:number = 20;
    late_payment = 1;
    convertedMonthlyPayment: any;
  
    ngOnInit(){
        if(this.monthly_payment && this.loan_amount && this.late_payment){
            if(((this.monthly_payment/this.loan_amount)*100) == 2 && ((this.late_payment/this.monthly_payment)*100) == 5){
                this.convertedMonthlyPayment = this.currencyPipe.transform(this.monthly_payment) 
                this.currencyPipe.transform(this.late_payment)
            }
        }
        
    }
}

@NgModule({
    imports : [
        RouterModule.forChild([
            {
                path : "",
                component : Test01Component
            }
        ])
    ],
    declarations : [Test01Component],
})
export class Test01Module {}