import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class StatusService {
    constructor() { }
    private loginStatus: BehaviorSubject<any> = new BehaviorSubject(false);    

    setLoginStatus(loginStatus : boolean){
        this.loginStatus.next(loginStatus);
    }

    getLoginStatus() {
        return this.loginStatus.asObservable();
    }
}