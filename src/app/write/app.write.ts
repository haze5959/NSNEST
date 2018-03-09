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

  onEditorCreated(quill) {
    var toolbar = quill.getModule('toolbar');
    toolbar.addHandler('image', this.imageHandler);
  }

  imageHandler(value) {
    console.log(value);
  }

  pressSaveBtn() {
    alert(this.editorContent.value);
  }

}
