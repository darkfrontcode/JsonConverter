/* ==========================================================================
   -- UIRouter Config
   ========================================================================== */

var config = function($stateProvider, $urlRouterProvider)
{

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
   -- Header Component
   ========================================================================== */

var headerComponent = {
	selector: `header`,
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
   -- List Component
   ========================================================================== */

var listComponent = {
	selector: `list`,
	bindings:
	{
		contacts: '<'
	},
	controller: function(contactService, $state)
	{
		this.delete = function(name)
		{
			contactService.delete(name).then(
				function(res){
					$state.reload()
				}
			)
		}
	},
	template: `
		<div class="row col-xs" ng-if="$ctrl.contacts.length > 0">
			<div id="card-list" class="row col-xs between-xs middle-xs center-xs">
				<card contact="contact" delete="$ctrl.delete(name)" ng-repeat="contact in $ctrl.contacts"></card>
			</div>
		</div>
		<div class="row col-xs middle-xs center-xs" ng-if="$ctrl.contacts.length == 0">
			<div id="no-contacts">
				You don't have any contacts 
				<br/>
				right now.
			</div>
		</div>
	`
}

/* ==========================================================================
   -- Card Component
   ========================================================================== */

var cardComponent = {
	selector: `card`,
	bindings:
	{
		contact: `=`,
		delete: `&`
	},
	template: `
		<i class="fa fa-times-circle" aria-hidden="true" ng-click="$ctrl.delete({ name: $ctrl.contact.Name})"></i>
		<h3>{{ $ctrl.contact.Name }}</h3>
		<div class="phone">{{ $ctrl.contact.Phone }}</div>
		<div class="email">{{ $ctrl.contact.Email }}</div>
		<div class="subject">{{ $ctrl.contact.Subject }}</div>
		<div class="message">{{ $ctrl.contact.Message }}</div>
	`
}

/* ==========================================================================
   -- Add Component
   ========================================================================== */

var addComponent = {
	selector: `add`,
	controller: function(contactService)
	{

		this.save = function(contact)
		{
			contactService.post(contact);
		}

	},
	template: `
		<div id="add-form-wrapper" class="col-xs">
			<form id="add-form" name="$ctrl.contactForm" novalidate>
				<input ng-model="$ctrl.contact.name" type="text" placeholder="Name"  ng-required="true"/>
				<input ng-model="$ctrl.contact.email" type="text" placeholder="Email"  ng-required="true"/>
				<input ng-model="$ctrl.contact.phone" type="text" placeholder="Phone"  ng-required="true"/>
				<input ng-model="$ctrl.contact.subject" type="text" placeholder="Subject"  ng-required="true"/>
				<textarea ng-model="$ctrl.contact.message" cols="30" rows="10" placeholder="Message" ng-required="true"></textarea>
				<div class="button-wrapper row grow between-xs">
					<button class="btn-red col-xs-4" ui-sref="list">Back</button>
					<input class="btn-green col-xs-4" type="submit" ng-click="$ctrl.save($ctrl.contact)" value="Save" ng-disabled="$ctrl.contactForm.$invalid" class="btn btn-default"/>
				</div>
			</form>
		</div>
	`
}

/* ==========================================================================
   -- Contact Service
   ========================================================================== */

var ContactService = function($http, $state){

	return {

		get: function()
		{

			return $http.get('/api/Contact').then(
				function (res){
					return res.data !== null ? res.data : []
				}, 
				function (err)
				{
					console.log(err);
				}
			);

		},

		post: function(contact)
		{

			var data = angular.copy(contact);

			$http.post('/api/Contact', data).then(
				function (res)
				{
					$state.go('list');
				}, 
				function (err)
				{
					console.log(err);
				}
			);

		},

		delete: function(name)
		{
			var url = '/api/Contact/' + name

			return $http.delete(url).then(
				function (res)
				{
					return;
				}, 
				function (err)
				{
					console.log(err)
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
	.component('list', listComponent)
	.component('header', headerComponent)
	.component('add', addComponent)
	.component('card', cardComponent)
	.service('contactService', ContactService)
	.config(config)