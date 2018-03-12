import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-write',
  templateUrl: './app.write.html',
  styleUrls: ['./app.write.css']
})
export class AppWrite implements OnInit {

  @ViewChild('fileInputEl') fileInputEl:ElementRef;

  classify:number;
  constructor(private route: ActivatedRoute, private ElementRef:ElementRef) { }

  titleFormControl = new FormControl();
  editorContent = new FormControl();
  quillInstance;

  editorModule = {
    toolbar: [
      ['bold', 'italic', 'underline'],        // toggled buttons
      ['blockquote', 'code-block'],
  
      [{ 'script': 'sub'}],      // superscript/subscript
  
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'align': [] }],
  
      ['image', 'video']                         // link and image, video
    ]
  };

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      // alert(params['classify']);
      this.classify = params['classify'];
    });
  }

  pressSaveBtn() {
    alert(this.editorContent.value);
  }

  /**
   * 에디터 관련 메서드
   */
  onEditorCreated(quill) {
    this.quillInstance = quill;
    var toolbar = this.quillInstance.getModule('toolbar');
    toolbar.addHandler('image', () => {
      this.fileInputEl.nativeElement.click();
    });
  }

  addImageAndUploadServer($event) {
    console.log($event.target.files[0]);
    for ( var i=0; i<$event.target.files.length; i++){
      // var reader = new FileReader();
      // reader.onload = (loadEvent: any) => {
      //   // this.dataUrl.push(loadEvent.target.result);
      // }
      // reader.readAsDataURL($event.target.files[i]); //이게 뭐지? 프리뷰가 나타난다고 하던데..
      var range = this.quillInstance.getSelection(!this.quillInstance.hasFocus()); 
      this.quillInstance.insertText(range, 'Hello', true);
    }
  }
}
