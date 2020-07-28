import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { ShareModule } from '../share/share.module';
import { RegisterComponent } from './register.component';

@NgModule({
  imports: [ ShareModule ],
  declarations: [ LoginComponent, RegisterComponent ],
  providers: [],
})
export class LoginModule { }
