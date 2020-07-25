import { NgModule } from '@angular/core';
import { ShareModule } from '../../share/share.module';
import { StoragePoolComponent } from './storage-pool/storage-pool.component';

@NgModule({
  imports: [
    ShareModule
  ],
  declarations: [StoragePoolComponent]
})
export class ServeModule { }
