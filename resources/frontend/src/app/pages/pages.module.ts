import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FaqComponent } from './faq/faq.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { AboutComponent } from './about/about.component';
import {SharedModule} from "../shared/shared.module";
import {RichTextEditorModule} from "../shared/components/rich-text-editor/rich-text-editor.module";



@NgModule({
  declarations: [
    HomeComponent,
    FaqComponent,
    ContactUsComponent,
    NotFoundComponent,
    AboutComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        SharedModule,
        RichTextEditorModule,
    ]
})
export class PagesModule { }
