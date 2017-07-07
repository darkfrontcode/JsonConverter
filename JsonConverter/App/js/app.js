/* ==========================================================================
   -- UIRouter Config
   ========================================================================== */

var config = function($stateProvider, $urlRouterProvider) {

	var listState = {
		name: 'list',
		url: '/list',
		component: 'list',
		resolve: {
			contacts: function (contactService) {
				return contactService.get()
			}
		}
	}

	var addState = {
		name: 'add',
		url: '/add',
		component: 'add'
	}

	$urlRouterProvider.otherwise('/list')

	$stateProvider.state(listState);
	$stateProvider.state(addState);
}


/* ==========================================================================
   -- App Controller
   ========================================================================== */

var appCtrl = function ($scope, $http){}

/* ==========================================================================
   -- List Component
   ========================================================================== */

var listComponent = {
	selector: `list`,
	bindings: {
		contacts: '<'
	},
	template: `
		<div class="row grow center-xs middle-xs">
			<div id="card-list" class="row grow between-xs" ng-if="$ctrl.contacts.length > 0">
				<card contact="contact" ng-repeat="contact in $ctrl.contacts"></card>
			</div>
			<div id="no-contacts" ng-if="$ctrl.contacts.length == 0">
				You don't have any contacts 
				<br/>
				right now.
			</div>
		</div>
	`
}

/* ==========================================================================
   -- Add Component
   ========================================================================== */

var addComponent = {
	selector: `add`,
	controller: function(contactService){

		this.save = function(contact)
		{
			contactService.post(contact);
		}

	},
	template: `
		<div id="add-form-wrapper" class="row grow center-xs middle-xs">
			<form id="add-form" class="row col-xs-6" name="$ctrl.contactForm" novalidate>
				<input ng-model="$ctrl.contact.name" type="text" placeholder="Name"  ng-required="true"/>
				<input ng-model="$ctrl.contact.email" type="text" placeholder="Email"  ng-required="true"/>
				<input ng-model="$ctrl.contact.phone" type="text" placeholder="Phone"  ng-required="true"/>
				<input ng-model="$ctrl.contact.subject" type="text" placeholder="Subject"  ng-required="true"/>
				<textarea ng-model="$ctrl.contact.message" cols="30" rows="10" placeholder="Message" ng-required="true"></textarea>
				<div class="button-wrapper row grow between-xs">
					<button class="btn-red col-xs-4" ui-sref="list">Back</button>
					<input class="btn-green col-xs-4" type="submit" ng-click="$ctrl.save($ctrl.contact)" value="Save" ng-disabled="contactForm.$invalid" class="btn btn-default"/>
				</div>
			</form>
		</div>
	`
}

/* ==========================================================================
   -- Header Component
   ========================================================================== */

var headerComponent = {
	selector: `header`,
	controller: function($scope){
		$scope.greetings = "header";
	},
	template: `
		<div class="col-xs-6">
			<h2>PeopleSoft</h2>
		</div>
		<div class="col-xs-6 end-xs">
			<button ui-sref="add" class="btn-green">Add Contact</button>
		</div>
	`
}


/* ==========================================================================
   -- Card Component
   ========================================================================== */

var cardComponent = {
	selector: `card`,
	bindings:{
		contact: `=`,
	},
	template: `
		<h3>{{ $ctrl.contact.Name }}</h3>
		<div class="phone">{{ $ctrl.contact.Phone }}</div>
		<div class="email">{{ $ctrl.contact.Email }}</div>
		<div class="subject">{{ $ctrl.contact.Subject }}</div>
		<div class="message">{{ $ctrl.contact.Message }}</div>
	`
}

/* ==========================================================================
   -- Contact Service
   ========================================================================== */

var ContactService = function($http){

	return {

		get: function(){

			return $http.get('/api/Contact').then(
				function (res){
					var content = res.data;

					if(content !== null)
					{
						return res.data;
					}
					else
					{
						return [];
					}
				}, 
				function (err){ return [] }
			);

		},

		post: function(contact){

			var data = angular.copy(contact);

			$http.post('/api/Contact', data).then(
				function (res)
				{
					console.log(res.data)
				}, 
				function (err)
				{

				}
			);

		}

	};
}

/* ==========================================================================
   -- App Module
   ========================================================================== */

var app = angular.module('app', ['ui.router'])
app
	.controller('appCtrl', appCtrl)
	.component('list', listComponent)
	.component('header', headerComponent)
	.component('add', addComponent)
	.component('card', cardComponent)
	.service('contactService', ContactService)
	.config(config)