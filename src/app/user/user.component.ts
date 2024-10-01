import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { UserSelector } from './state/user.selector';
import { User } from './state/user.model';
import { LoadUsers } from './state/user.action';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class DietComponent implements OnInit {


  users$: Observable<User[]> = inject(Store).select(UserSelector.getUser);



  constructor(private store: Store) {  

  }

  ngOnInit(): void {
    this.store.dispatch(new LoadUsers());
    this.users$.subscribe(((user) => {

    }))
  }

}