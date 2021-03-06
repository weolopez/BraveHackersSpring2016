import {Component, View} from 'angular2/core';
//import {User} from '../../models/user/user';

@Component({ selector: 'login' })
@View({  templateUrl: 'build/components/login/login.html' })
export class Login {
  user: any =
  {
    user: 
    {
        name: 'Anonymous User', 
        profileLocation: 'local', 
        profile: 
        {
            profileImageURL:'http://www.psdgraphics.com/file/male-silhouette.jpg'
        }
     }
  };
  constructor() {
 //   this.user = User.getInstance();
    this.user.loginImage='';
  }
  login() {
    if (this.isLoggedIn())  
        this.user.logout();
    else    
        this.user.authUser();
  }
  isLoggedIn() {
      return this.user.user.name!=='Anonymous User';
  }
}