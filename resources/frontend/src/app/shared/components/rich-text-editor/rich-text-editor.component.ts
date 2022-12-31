import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss']
})
export class RichTextEditorComponent {

  @Input() defaultText: string = '';
  @Output() html = new EventEmitter();

  modifyText(command:any,value?: any){

    //TODO: to make H1 H2 and list + checklist works!

    // const selection = window.getSelection();
    // const selectionRange = selection?.getRangeAt(0);
    // const range = selectionRange?.cloneRange();
    // const textSelected = selection?.toString();

    if (command === 'createLink'){
      let userLink = prompt("Enter a URL");
      if (userLink && /http/i.test(userLink)) {
        document.execCommand(command, false, userLink);

      } else if (userLink) {
        userLink = "http://" + userLink;
        document.execCommand(command, false, userLink);
      }
    }else{
      document.execCommand(command, false, value);
    }
  }

  sendContent(innerHtml: any){
    this.html.emit(innerHtml)
  }

  addText(innerHTML: string) {
    const selection = window.getSelection();
    const selectionRange = selection?.getRangeAt(0);
    const range = selectionRange?.cloneRange();
    console.log('range.start',range?.startOffset)
    console.log('range.end',range?.endOffset)
    console.log(innerHTML)
  }
}
