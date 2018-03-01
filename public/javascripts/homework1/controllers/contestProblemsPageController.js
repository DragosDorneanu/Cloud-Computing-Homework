angular.module('apisCallflow')
    .controller('contestProblemsPageController', ['$scope', '$routeParams', 'dataCollectorService',
        function ($scope, $routeParams, dataCollectorService) {
            $scope.problems = [];
            $scope.fetchingProblems = true;
            $scope.showingProblem = false;
            $scope.problemNotAvailable = false;

            dataCollectorService
                .getContestProblems($routeParams.contestId)
                .then(fetchedContestProblemsCallback);

            $scope.getProblemContent = function (problem) {
                $scope.problemNotAvailable = false;
                dataCollectorService
                    .getProblemContent($routeParams.contestId, problem.index)
                    .then(getProblemContentCallback)
                    .then(getProblemHypertext);
            };

            $scope.exitProblem = function () {
                $scope.showingProblem = false;
                $scope.$apply();
            };

            function getProblemContentCallback(response) {
                return new Promise((resolve, reject) => {
                    $scope.showedProblem = response.data;
                    try {
                        $scope.showedProblem.sampleTest = zip($scope.showedProblem.sampleTest.input, $scope.showedProblem.sampleTest.output);
                        $scope.showingProblem = true;
                    } catch (error) {
                        $scope.problemNotAvailable = true;
                    } finally {
                        $scope.$apply();
                        resolve();
                    }
                });
            }

            function getProblemHypertext() {
                console.log('dasdasddassda');
                dataCollectorService
                    .getTextHyperlinks(concatenateText($scope.showedProblem))
                    .then(placeTextHyperlinks)
                    .catch(console.error);
            }

            function placeTextHyperlinks(result) {
                let replacementToken, alreadyReplaced = new Set();
                const entities = result.data.response.entities;
                const problemStatement = document.getElementsByClassName('centered-problems-statement')[0];

                entities.forEach((entity) => {
                    if (!alreadyReplaced.has(entity.matchedText) && entity.wikiLink !== '') {
                        alreadyReplaced.add(entity.matchedText);
                        replacementToken = `<a href="${entity.wikiLink}">${entity.matchedText}</a>`;
                        problemStatement.innerHTML = problemStatement.innerHTML.replace(entity.matchedText, replacementToken);
                    }
                });
            }

            function concatenateText(problem) {
                let textContainer;
                let text = '';
                const relevantTextContainer = ['story', 'inputSpecifications', 'outputSpecifications', 'note'];

                for (let index = 0; index < relevantTextContainer.length; ++index) {
                    textContainer = problem[relevantTextContainer[index]];
                    for (let prop in textContainer) {
                        text += textContainer[prop] + '\n';
                    }
                }
                return text;
            }

            function fetchedContestProblemsCallback(response) {
                $scope.problems = response.data;
                $scope.fetchingProblems = false;
                $scope.$apply();
            }

            function zip(array1, array2) {
                if (array1.length !== array2.length) {
                    throw new Error('Arrays must have same size');
                }
                let zipArray = [];
                for (let index = 0; index < array1.length; ++index) {
                    zipArray.push([array1[index], array2[index]]);
                }
                return zipArray;
            }
        }]);