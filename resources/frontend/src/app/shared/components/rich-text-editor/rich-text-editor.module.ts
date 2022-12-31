import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RichTextEditorComponent } from './rich-text-editor.component';
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    RichTextEditorComponent
  ],
  exports: [
    RichTextEditorComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
  ]
})
export class RichTextEditorModule { }
