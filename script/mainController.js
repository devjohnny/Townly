app.controller("mainController", function ($scope, $http, $q, $timeout) {


    function Event(eventId, name, description, from, to, public, moderated, createdBy, barcode) {
        this.eventId = eventId;
        this.name = name;
        this.description = description;
        this.from = from;
        this.to = to;
        this.public = public;
        this.moderated = moderated;
        this.createdBy = createdBy;
        this.barcode = barcode;
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

    $scope.itemList = [];
    $scope.querySearch = querySearch;
    $scope.selectedItemChange = selectedItemChange;

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
        var url = "https://townlyservice.azurewebsites.net/api/Event/Events";

        $http.get(url)
            .then(function (response) {
                debugger;
                $scope.events = response.data;
                $scope.itemList = getEventNames();
            });
    }

    function getQuestions(eventIndex) {
        var eventId = $scope.events[eventIndex].eventId;

        $scope.questions = [question1, question2, question3, question4];

        $scope.questionsHidden = false;
    }

    function querySearch(query) {
        if (!query) {
            return $scope.itemList;
        }

        query = angular.lowercase(query);

        var selectedItemList = $scope.itemList.filter(function (item) {
            return angular.lowercase(item.display).includes(query);
        });
        return selectedItemList;
    }

    function selectedItemChange(item) {
        $scope.eventsHidden = true;
        getQuestions(0);

        console.log('Item changed to ' + JSON.stringify(item));
    }

    function getEventNames() {
        $scope.itemList = [];

        $scope.events.forEach(event => {
            $scope.itemList.push({ value: event.eventId, display: event.name });
        });

        return $scope.itemList;
    }
});
