import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
import { ShowDetailImageDialog } from '../image-viewer/image-viewer.component';
import { marker } from "../model/marker";
import { AppService } from '../service/appService';
import { HttpService } from '../service/http.service';
import { posts } from '../model/posts';

@Component({
  selector: 'app-write',
  templateUrl: './app.write.html',
  styleUrls: ['./app.write.css']
})
export class AppWrite implements OnInit {

  @ViewChild('fileInput') fileInputEl:ElementRef;

  isLoading = true;
  classify:string;

  constructor(private route: ActivatedRoute, private ElementRef:ElementRef, public dialog: MatDialog, private appService: AppService, public snackBar: MatSnackBar, private httpService: HttpService) { 
    
  }

  titleFormControl = new FormControl('', [Validators.required]);
  editorContent = new FormControl('', [Validators.required]);
  quillInstance;
  imageArr = new Array();
  selectType = "restaurant";
  marker?: marker;

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
      this.classify = params['classify'];
      this.marker = null;
      this.selectType = "restaurant";
      this.imageArr = new Array();
      this.editorContent.reset();
    });

    this.isLoading = false;
  }

  //글 등록!
  pressSaveBtn() {
    if(this.editorContent.valid && this.titleFormControl.valid){
      var post:posts = {  //게시글 뼈대 제작
        postClassify: 0,
        studentNum: this.appService.myInfo.studentNum,
        publisherId: this.appService.myInfo.userId,
        publisher: this.appService.myInfo.name,
        publisherIntro: this.appService.myInfo.intro,
        publisherImg: this.appService.myInfo.image,
        images: null,
        title: '',
        body: '',
        marker: null,
        tag: null
      };

      this.isLoading = true;
      
      switch(this.classify){
        case 'post':{ //게시글
          post.title = this.titleFormControl.value; //제목입력
          post.body = this.editorContent.value; //본문입력
          this.httpService.postPost(post)
          .subscribe(
            data => {
              this.isLoading = false;
              console.log(JSON.stringify(data));
              if(data.result){  //성공
                this.snackBar.open("게시글 업로드 완료", "확인", {
                  duration: 2000,
                });
              } else {  //실패
                this.snackBar.open("게시글 업로드 실패 - " + data.message, "확인", {
                  duration: 5000,
                });
              }
            },
            error => {
              this.isLoading = false;
              console.error("[error] - " + error.error.text);
              alert("[error] - " + error.error.text);
            }
          );
          
          break;
        }  
        case 'elbum':{ //앨범
          console.log('앨범 업로드 완료');
          this.snackBar.open("앨범 업로드 완료", "확인", {
            duration: 2000,
          });
          break;
        }
        case 'map':{ //맛집
          console.log('맛집 업로드 완료');
          this.snackBar.open("맛집 업로드 완료", "확인", {
            duration: 2000,
          });
          break;
        }
        default:{
          console.error('알 수 없음');
          this.snackBar.open("알 수 없음", "확인", {
            duration: 2000,
          });
          break;
        }
      }  
    } else {  //벨리데이션 실패
      this.snackBar.open("제목과 본문을 작성하시오.", "확인", {
        duration: 2000,
      });
    }
  }

  pressDeleteImage(index:number){
    this.imageArr.splice(index, 1); //삭제
  }

  pressDetailmage(index:number){
    console.log("이미지 열기");
    var image = new Image();
    image.src = this.imageArr[index];
    image.onload = () => {
      let dialogRef = this.dialog.open(ShowDetailImageDialog, {
        height: image.height.toString(),
        width: image.width.toString(),
        data: { imageUrl: image.src }
      });

      dialogRef.afterClosed().subscribe(result => {});
    } 
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

    let elements = this.ElementRef.nativeElement.querySelectorAll('.ql-toolbar');
    var span = document.createElement('span');
    span.className = "ql-formats";
    var emoBtn = document.createElement('button');
    emoBtn.type = "button";
    emoBtn.className = "ql-emoticon";
    emoBtn.style.backgroundColor = "black";
    emoBtn.addEventListener
    span.appendChild(emoBtn);
    elements[0].appendChild(span);

    emoBtn.addEventListener('click', function() {
      console.log('여기에 이모티콘 선택창!');
    });
  }

  addImageAndUploadServer($event) {
    console.log($event.target.files[0]);
    for ( var i=0; i<$event.target.files.length; i++){
      this.isLoading = true;
      //todo: 서버에 이미지 저장 후, url 리턴해서 이미지 뿌려주기
      this.isLoading = false;
  
      switch(this.classify){
        case 'post':{ //게시글
          console.log('게시글 이미지 업로드 완료');
          var range = this.quillInstance.getSelection(!this.quillInstance.hasFocus()); 
          this.quillInstance.insertEmbed(range, 'image', "/../assets/testImage2.jpg");
          break;
        }
        case 'elbum':{ //앨범
          console.log('앨범 이미지 업로드 완료');
          this.imageArr.push("/../assets/testImage2.jpg");
          console.log(this.imageArr.length);
          break;
        }
        case 'map':{ //맛집
          console.log('맛집 이미지 업로드 완료');
          this.imageArr.push("/../assets/testImage2.jpg");
          console.log(this.imageArr.length);
          break;
        }
        default:{
          console.error('알 수 없는 이미지 업로드');
          break;
        }
      }  
    }
  }

  addEmoticon(){
    console.log("이모티콘 클릭");
  }

  mapClicked($event){
    this.marker = {
      lat: $event.coords.lat,
		  lng: $event.coords.lng,
		  label: "위치"
    }
  }
}
