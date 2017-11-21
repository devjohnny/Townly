app.controller("mainController", function ($scope, $q, $timeout) {

    function Event(eventId, name, description, fromDate, toDate, isPublic, isModerated, createdDate, publicEventId) {
        this.eventId = eventId;
        this.name = name;
        this.description = description;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.isPublic = isPublic;
        this.isModerated = isModerated;
        this.createdDate = createdDate;
        this.publicEventId = publicEventId;
    }

    function Question(questionId, questionText, isModerated, createdBy, createdDate, event, likeCount, liked) {
        this.questionId = questionId;
        this.questionText = questionText;
        this.isModerated = isModerated;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.event = event;
        this.likeCount = likeCount;
        this.liked = liked
    }

    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    function getGuid() {
        return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
    }

    var event1 = new Event(13, "TestEvent1", "This is a test event", new Date().toDateString(), new Date().toDateString(), true, false, new Date().toDateString(), "xdj3x5yl3e8g23bhjudj4aw1j");
    var event2 = new Event(10, "TestEvent2", "This is a test event", new Date().toDateString(), new Date().toDateString(), true, false, new Date().toDateString(), "axadja3x5s2yl33a8gbd4aw1j");
    var event3 = new Event(17, "TestEvent3", "This is a test event", new Date().toDateString(), new Date().toDateString(), true, false, new Date().toDateString(), "rtxdj3x5yl3e8g54bdjj4aw1j");
    var event4 = new Event(11, "TestEvent4", "This is a test event", new Date().toDateString(), new Date().toDateString(), true, false, new Date().toDateString(), "zhxdj3x5yl3e8hgjbdja4aw1j");
    var event5 = new Event(5, "TestEvent5", "This is a test event", new Date().toDateString(), new Date().toDateString(), true, false, new Date().toDateString(), "ujkxdj3x5yl38e8gbdj4yaw1j");
    var event6 = new Event(6, "TestEvent6", "This is a test event", new Date().toDateString(), new Date().toDateString(), true, false, new Date().toDateString(), "6zxdj3xgb5yl3e8gbdj4ayw1j");

    var question1 = new Question(1, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pretium lectus quam id leo in?", false, "Kis Pitta", new Date().toDateString(), event1, 6, false);
    var question2 = new Question(2, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pretium lectus quam id leo in?", false, "Nagy Pitta", new Date().toDateString(), event1, 13, false);
    var question3 = new Question(3, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pretium lectus quam id leo in?", false, "Jóska Pitta", new Date().toDateString(), event1, 13, false);
    var question4 = new Question(4, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pretium lectus quam id leo in?", false, "Ejj Pitta", new Date().toDateString(), event2, 5, false);

    $scope.events = getPublicEvents();
    $scope.questions = [];

    $scope.eventsHidden = false;
    $scope.questionsHidden = true;

    $scope.openEvent = function (eventIndex) {
        $scope.eventsHidden = true;
        getQuestions(eventIndex);
    }

    $scope.like = function (questionIndex) {
        if ($scope.questions[questionIndex].liked) {
            $scope.questions[questionIndex].likeCount--;
            $scope.questions[questionIndex].liked = false;;
        }
        else {
            $scope.questions[questionIndex].likeCount++;
            $scope.questions[questionIndex].liked = true;
        }

    }

    function getEvent(publicEventId) {

    }

    function getPublicEvents() {
        //httprequest
        return [event1, event2, event3, event4, event5, event6];
    }

    function getQuestions(eventIndex) {
        var eventId = $scope.events[eventIndex].eventId;

        //httprequest
        //var selectedQuestions = questions.filter(function (item) {
        //    return item.event.eventId == eventId;
        //});

        //$scope.questions2 = $scope.questions2.concat(selectedQuestions);
        $scope.questions = [question1, question2, question3, question4];

        $scope.questionsHidden = false;
    }

    //$scope.itemList = [{ value: "valami", display: "valami" }, { value: "valami2", display: "valami2" }, { value: "alma", display: "alma" }];    
    $scope.itemList = [{ value: event1, display: event1.name }, { value: event2, display: event2.name }, { value: event3, display: event3.name }, { value: event4, display: event4.name }, { value: event5, display: event5.name }, { value: event6, display: event6.name }];

    $scope.simulateQuery = true;
    $scope.isDisabled = false;

    // list of `state` value/display objects
    $scope.states = loadAll();
    $scope.querySearch = querySearch;
    $scope.selectedItemChange = selectedItemChange;
    $scope.searchTextChange = searchTextChange;

    $scope.newState = newState;

    function newState(state) {
        alert("Sorry! You'll need to create a Constitution for " + state + " first!");
    }


    function querySearch(query) {
        console.log("query: " + query);
        var results = query ? $scope.states.filter(createFilterFor(query)) : $scope.states,
            deferred;
        if ($scope.simulateQuery) {
            deferred = $q.defer();

            //Get servicecall
            $timeout(function () {
                deferred.resolve(results);
            }, Math.random() * 1000, false);

            return deferred.promise;
        } else {
            return results;
        }
    }

    function searchTextChange(text) {
        console.log('Text changed to ' + text);
    }

    function selectedItemChange(item) {
        $scope.eventsHidden = true;
        getQuestions(0);

        console.log('Item changed to ' + JSON.stringify(item));
    }

    function loadAll() {
        var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';

        return $scope.itemList;
        //allStates.split(/, +/g).map(function (state) {
        //    return {
        //        value: state.toLowerCase(),
        //        display: state
        //    };
        //});
    }

    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(state) {
            return (state.value.indexOf(lowercaseQuery) === 0);
        };
    }
});
