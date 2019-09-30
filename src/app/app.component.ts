import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { ApiService } from './service/api.service';
import { User } from './service/data.service';
import { DataService } from './service/data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'interceptor';
  user: User = new User();
  users = [];
  constructor(private api: ApiService, private afAuth: AngularFireAuth, private data: DataService) {

  }
  ngOnInit() {
    this.afAuth.authState.subscribe((user: any) => {
      if (user && user.uid) {
        this.afAuth.auth.currentUser.getIdToken().then(token => {
          this.data.token = token;
          this.api.get("firebase", { token: token }).toPromise().then((res: any) => {
            this.user = res.user;
          }).catch(() => {
            alert("firebaseで認証成功しましたが、 サーバーAPIの認証に失敗しました。");
            this.logout();
          });
        });
      } else {
        this.logout();
      }
    });
  }
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider()).catch(reason => {
      alert("ログインに失敗しました。");
    });

  }
  logout() {
    this.afAuth.auth.signOut();
    this.user = new User;
    this.data.token = "";
    this.users = [];
  }
  getUser() {
    if (this.user.id) {
      this.api.get("users", {}).toPromise().then((res: any) => {
        this.users = res;
      });
    } else {
      alert("ログインしてください。");
    }
  }
}
