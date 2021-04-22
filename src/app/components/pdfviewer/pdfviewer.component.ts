import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pdfviewer',
  templateUrl: './pdfviewer.component.html',
  styleUrls: ['./pdfviewer.component.scss']
})
export class PDFviewerComponent implements OnInit {
 pdf:any
  constructor(
   public dialogRef: MatDialogRef<PDFviewerComponent>,
   @Inject(MAT_DIALOG_DATA)public data: { pdf: string; }){}

  ngOnInit(): void {
    this.visualizaPdf()
    console.log(this.data)



  }

  visualizaPdf() {
    const linkSource = this.data.pdf;
    console.log(linkSource)
    const downloadLink = document.createElement("iframe");
    downloadLink.src =linkSource
    downloadLink.width="100%";
    downloadLink.height="100%";
    document.getElementById("mat-dialog-0")?.appendChild(downloadLink)
 // document.body.appendChild(downloadLink)


   }

  closeDialog() {
    this.dialogRef.close();
  }

}
