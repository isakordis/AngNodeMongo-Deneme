import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../shared/user-service.service';
import { UserClass } from '../shared/user-class.model';
declare var M: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserServiceService]
})
export class UsersComponent implements OnInit {
  users: UserClass[];
  user: UserClass;
  constructor(private userSrv: UserServiceService) {
    this.user = new UserClass();
  }
  // public show: boolean = false;
  // public buttonName: any = 'Show';
  ngOnInit() {

    this.genericRefreshMethods();
  }

  resetForm(form?: NgForm) {
    if (!this.userSrv.selectedUser) {

      this.userSrv.selectedUser = {
        _id: "",
        name: "",
        surname: "",
        age: null,
      }
    }
  }

  // onSubmit(form: NgForm) {
  //   this.userSrv.postUser(this.users).subscribe((res) => {
  //     this.resetForm(form);
  //     M.toast({html:'Kayıt Başarılı',classes:'rounded'});
  //     this.genericRefreshMethods();

  //   });
  // }
  SaveForm(user: UserClass) {

    this.userSrv.postNewUser(user).subscribe(res => {
      this.genericRefreshMethods();
      this.refreshUserList();
    });
    // this.genericRefreshMethods();
  }
  refreshUserList() {
    this.userSrv.getUserList().subscribe((res) => {
      console.log(res);
      this.users = res as UserClass[];
    });

  }
  // toggle() {
  //   this.show = !this.show;

  //   // CHANGE THE NAME OF THE BUTTON.
  //   if(this.show)  
  //     this.buttonName = "Hide";
  //   else
  //     this.buttonName = "Show";
  // }
  onEdit(usr) {
    this.user = usr;
  }
  onDelete(_id: string, form: NgForm) {

  }


  Update(user: UserClass) {
    console.log(user);
    debugger;
    this.userSrv.putUser(user).subscribe((res) => {
      console.log(res);
      debugger;
      this.users = res as UserClass[];
    });


  }

  genericRefreshMethods(): void {
    //this.resetForm();
    this.refreshUserList();
  }


}
