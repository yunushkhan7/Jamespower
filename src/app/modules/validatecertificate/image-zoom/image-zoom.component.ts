import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image-zoom',
  templateUrl: './image-zoom.component.html',
  styleUrls: ['./image-zoom.component.scss']
})
export class ImageZoomComponent implements OnInit {

  name = "Angular";
  constructor() {
    this.translatePos = { x: this.CanvasWidth / 2, y: this.CanvasHeight / 2 };
   }
  drawItems = []
  originalItems = []
  count = 0
  @Input('CanvasHeight') CanvasHeight :any
  @Input('CanvasWidth') CanvasWidth :any
  @Input() ImageSrc;
  @Output() selected = new EventEmitter();
  taggedItem = ""
  showInput: boolean = false;
  isMoving: boolean;
  public imgWidth: number;
  public uniX: number;
  public uniY: number;
  public uniX2: number;
  public uniY2: number;
  public initX: number;
  public initY: number;
  public imgHeight: number;
  public url: string;
  public image;
  public originalImageWidth;
  public originalImageHeight;
  public hRatio;
  public vRatio;
  public translatePos;
  public scale = 1.0;
  public scaleMultiplier = 0.8;

  @ViewChild("layer1", { static: false }) layer1Canvas: ElementRef;
  private context: CanvasRenderingContext2D;
  private layer1CanvasElement: any;

  ngOnInit(): void {
    console.log('ImageSrc', this.ImageSrc)
    this.imageLoad();
  }

  imageLoad() {
    this.image = new Image();
    this.image.src = this.ImageSrc;
    this.image.onload = () => {
      console.log(this.CanvasWidth, this.CanvasHeight);
      console.log(this.image.width, this.image.height);
      this.originalImageWidth = this.image.width;
      this.originalImageHeight = this.image.height;
      this.image.width = this.CanvasWidth;
      this.image.height = this.CanvasHeight;
      this.hRatio = this.originalImageWidth / this.CanvasWidth;
      this.vRatio = this.originalImageHeight / this.CanvasHeight;
      this.layer1CanvasElement = this.layer1Canvas.nativeElement;
      this.layer1CanvasElement.width = this.CanvasWidth;
      this.layer1CanvasElement.height = this.CanvasHeight;
      this.showImage();
    }
  }

  showImage() {
    this.count++;
    this.layer1CanvasElement = this.layer1Canvas.nativeElement;
    this.context = this.layer1CanvasElement.getContext("2d");
    this.context.clearRect(0, 0, this.CanvasWidth, this.CanvasHeight);
    this.context.save();
    this.context.translate(this.translatePos.x, this.translatePos.y);
    this.context.scale(this.scale, this.scale);
    this.context.drawImage(this.image, 0, 0, this.image.width, this.image.height);
    this.context.restore()
    let parent = this;
    if (this.count == 1) {
      this.layer1CanvasElement.addEventListener("mousedown", (e) => {
        this.isMoving = true
        this.initX = e.offsetX;
        this.initY = e.offsetY;
      });
      this.layer1CanvasElement.addEventListener("mouseup", (e) => {
        this.isMoving = false
        this.showInput = true
        this.drawItems.push({
          name: "",
          x0: this.initX,
          y0: this.initY,
          x1: this.uniX,
          y1: this.uniY
        });
        this.originalItems.push({
          name: "",
          x0: Math.ceil(this.initX * this.hRatio),
          y0: Math.ceil(this.initY * this.vRatio),
          x1: Math.ceil(this.uniX * this.hRatio),
          y1: Math.ceil(this.uniY * this.vRatio)
        });
        // parent.drawRect("red", e.offsetX - this.initX, e.offsetY - this.initY, 0);
        this.uniX = undefined
        this.uniY = undefined
      });
    }

    this.layer1CanvasElement.addEventListener("mousemove", (e) => {
      if (this.isMoving) {
        // parent.drawRect("red", e.offsetX - this.initX, e.offsetY - this.initY, 0);
      }
    });
    // this.drawRect("red", 0, 0, 1);
  }

  // drawRect(color = "black", height, width, flag) {
  //   if (this.uniX | flag) {
  //     this.context.clearRect(0, 0, this.CanvasWidth, this.CanvasHeight);
  //     this.context.save();
  //     this.context.translate(this.translatePos.x, this.translatePos.y);
  //     this.context.scale(this.scale, this.scale);
  //     this.context.drawImage(this.image, 0, 0, this.image.width, this.image.height);
  //     this.context.restore()
  //   }
  //   // console.log(this.image.width, this.image.height)
  //   this.uniX = height
  //   this.uniY = width
  //   this.uniX2 = height
  //   this.uniY2 = width
  //   for (var i = 0; i < this.drawItems.length; i++) {
  //     this.context.beginPath();
  //     this.context.rect(
  //       this.drawItems[i].x0,
  //       this.drawItems[i].y0,
  //       this.drawItems[i].x1,
  //       this.drawItems[i].y1
  //     );
  //     this.context.lineWidth = 3;
  //     this.context.strokeStyle = color;
  //     this.context.stroke();
  //   }
  // }

  isSingleClick: Boolean = true;

  fun1() {
    this.isSingleClick = true;
    setTimeout(() => {
      if (this.isSingleClick) {
        this.scale =1;
        // this.scale *= this.scaleMultiplier;
        console.log('this.scale', this.scale)
        this.showImage();
      }
    }, 250)
  }

  fun2() {
    this.isSingleClick = false;
    this.scale = 1.5625;
      // this.scale /= this.scaleMultiplier;
      console.log('zoom this.scale', this.scale)
      this.showImage();
  }

  // val = '';
  // fun1(val1) {
  //   if (val1 = "single") {
  //     console.log('val', val1)
  //   }
  // }

  // fun2(val2) {
  //   if (val2 == "double") {
  //     console.log('val', val2);
  //   }
  // }

  zoomIn() {
    console.log("zooming in")
    this.scale /= this.scaleMultiplier;
    console.log('zoom this.scale', this.scale)
    this.showImage();
  }

  zoomOut() {
    console.log("zooming out")
    this.scale *= this.scaleMultiplier;
    console.log('this.scale', this.scale)
    this.showImage();

  }


}
