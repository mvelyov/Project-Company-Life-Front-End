import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ContactsService } from '../../../core/admin/contacts.service';

@Component({
  selector: 'app-add-contacts',
  templateUrl: './add-contacts.component.html',
  styleUrls: ['./add-contacts.component.scss'],
})
export class AddContactsComponent implements OnInit {

  private checked: boolean = false;
  private title = new FormControl();
  constructor(public dialogRef: MatDialogRef<AddContactsComponent>, private contactsService: ContactsService ) {
}
  public logForm(value: any): void {
    if (value.checked) {
      delete value.checked;
      value.isMapAddress = 'yes';
    } else {
      delete value.checked;
    }
    this.contactsService.createContactDetails(value);
    setTimeout( () => {
      window.location.reload();
    });
  }
  public close(): void {
  this.dialogRef.close();
}

  // tslint:disable-next-line:no-empty
  public ngOnInit(): void {}

}
