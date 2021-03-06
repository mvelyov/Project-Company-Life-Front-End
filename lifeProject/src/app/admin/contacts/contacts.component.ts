import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { ContactsService } from '../../core/admin/contacts.service';
import { TransferJobAdsService } from '../../core/transfer-data/transfer-data.service';
import { IContactDetails } from '../../models/contact-details';
import { AddContactsComponent } from './add-contacts/add-contacts.component';
import { EditContactDetailsComponent } from './edit-contact-details/edit-contact-details.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {

  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;

  private displayedColumns = ['id', 'name', 'value', 'isMapAddress', 'createdAt', 'edit', 'delete'];
  private dataSource: MatTableDataSource<IContactDetails>;
  private noContactDetails: boolean;

  constructor(public dialog: MatDialog, private readonly contactsService: ContactsService,
              private transferJobAdsService: TransferJobAdsService) {}

  public fillTable = () => {
      this.contactsService.getAllContactDetails().subscribe((data) => {
      if (data.length === 0) {
        this.noContactDetails = true;
      } else {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      }
    });
  }

  public ngOnInit(): void {
    this.fillTable();
    }
  public openCreateModal(): void {
      const dialogRef = this.dialog.open(AddContactsComponent, {
        width: '300px',
        height: '300px',
      });
    }
  public openEditModal(contacts: object): void {
    this.transferJobAdsService.insertData(contacts);
    const dialogRef = this.dialog.open(EditContactDetailsComponent, {
        width: '350px',
        height: '200px',
      });
    }
  public deleteAd(id: number): void {
      const object = {
        id,
      };
      this.contactsService.deleteContactDetails(object);
      }

  public openDialog(id: number): void {
      if (confirm('Are you sure you want to delete this link!')) {
        this.deleteAd(id);

          setTimeout(() => {
            window.location.reload();
          });

      }
    }
  }
