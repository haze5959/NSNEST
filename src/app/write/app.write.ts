import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-write',
  templateUrl: './app.write.html',
  styleUrls: ['./app.write.css']
})
export class AppWrite implements OnInit {

  classify:number;
  constructor(private route: ActivatedRoute) { }

  titleFormControl = new FormControl();
  editorContent = new FormControl();

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
    var toolbar = quill.getModule('toolbar');
    toolbar.addHandler('image', this.imageHandler);
  }

  imageHandler(value) {
    console.log(value);
  }

  addImageAndUploadServer($event) {
    for ( var i=0; i<$event.target.files.length; i++){
      var reader = new FileReader();
      reader.onload = (loadEvent: any) => {
        // this.dataUrl.push(loadEvent.target.result);
      }
      reader.readAsDataURL($event.target.files[i]); //이게 뭐지? 프리뷰가 나타난다고 하던데..
  }
}
