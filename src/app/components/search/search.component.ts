import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Topic } from '../../models/topic';
import { TopicService } from '../../services/topic.service';

@Component({
	selector: 'app-search',
	templateUrl: '../topics/topics.component.html',
	styleUrls: ['./search.component.css'],
	providers: [TopicService]
})
export class SearchComponent implements OnInit {
	public page_title: string;
	public topics: Topic[];
	public no_paginate;
	public search: string;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _topicService: TopicService
	) {
		this.page_title = 'Buscar: ';
		this.no_paginate = true;
		this.search = '';
	}

	ngOnInit() {
		this._route.params.subscribe(params => {
			const searchParam = params['search'];
			this.page_title = 'Buscar: ' + searchParam;
			this.getTopics(searchParam);
		});
	}

	getTopics(search: string) {
		this._topicService.search(search).subscribe(
			response => {
				if (response.topics) {
					this.topics = response.topics;
				}
				this.search = ''; // Restablecer la variable search después de obtener los resultados
			},
			error => {
				console.log(error);
			}
		);
	}
}
