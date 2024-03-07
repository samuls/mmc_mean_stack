import { Component, OnInit } from '@angular/core';

import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public commentList: any[] = [];
  constructor(private _commentService: CommentService) {}

  ngOnInit(): void {
    this._commentService.getAll().subscribe((result:any[]) => {
      this.commentList = result.slice(0,10);
    });
  }
}
