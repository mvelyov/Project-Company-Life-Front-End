import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { JobAdsService } from '../../core/admin/job-ads.service';
import { IJobAds } from '../../models/job-ads';
import { AddJobComponent } from '../add-job/add-job.component';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss'],
})
export class AdsComponent implements OnInit {

  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;

  private displayedColumns = ['id', 'title', 'createdAt', 'view', 'edit', 'delete'];
  private dataSource: MatTableDataSource<IJobAds>;

  constructor(public dialog: MatDialog, private readonly jobAdsService: JobAdsService) {}

  public ngOnInit(): void {
    this.jobAdsService.getAllJobAds().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    }

  public applyFilter(filterValue: string): void {
    let filterVal;
    filterVal = filterValue.trim(); // Remove whitespace
    filterVal = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterVal;
  }
  public openCreateModal(): void {
    const dialogRef = this.dialog.open(AddJobComponent, {
      width: '250px',
      height: '500px',
    });
  }
}
