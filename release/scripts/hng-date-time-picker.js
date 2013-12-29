(function (angular, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['angular'], function (angular) {
            return factory(angular);
        });
    } else {
        return factory(angular);
    }
}(angular || null, function (angular) {
    /**
     * hngDateTimePicker: DateTimePicker + Angular JS
     *
     * @author Hareesh <hareeshbabu82ns@gmail.com>
     * @url https://github.com/hareeshbabu82ns/hng-date-time
     * @license New BSD License <http://creativecommons.org/licenses/BSD/>
     */

    var app = angular.module('hngDateTimePicker', []);

    app.value('hngDateTimePickerConfig', {});
    /**
     * @ngdoc directive
     * @name hngDateTimePicker.directive:hngDateTimePicker
     * @restrict A
     *
     * @description
     * Directive that instantiates {@link hngDateTimePicker.directive:hngDateTimePicker}.
     */
    app.directive('hngDateTimePicker', ['$timeout', 'hngDateTimePickerConfig',
        function ($timeout, $hngConfig) {
            return {
                restrict: 'A',
                require: '?ngModel',
                scope: {
                    pickDate: '=',
                    pickTime: '=',
                    pickSeconds: '=',
                    time12Format: '=',
                    maskInput: '=',
                    pickerType: '='
                },
                link: function postLink(scope, element, attrs, ngModel) {
                    var options = angular.extend({
                            autoClose: true,
                            pickDate: scope.pickDate,
                            pickTime: scope.pickTime,
                            pickSeconds: scope.pickSeconds,
                            maskInput: scope.maskInput
                        },
                        $hngConfig.datepicker || {});
                    angular.forEach([
                        'format',
                        'viewMode',
                        'weekStart',
                        'startDate',
                        'endDate',
                        'language',
                        'inline'
                    ], function (key) {
                        if (angular.isDefined(attrs[key]))
                            options[key] = attrs[key];

                    });
                    if (scope.time12Format) {
                        options['pick12HourFormat'] = true;
                    } else {
                        options['pick12HourFormat'] = false;
                    }
                    if (scope.maskInput === undefined) {
                        options['maskInput'] = true;
                    }
                    if (attrs.type) {
                        if (attrs.type == 'date') {
                            options['pickDate'] = true;
                            options['pickTime'] = false;
                        } else if (attrs.type == 'time') {
                            options['pickDate'] = false;
                            options['pickTime'] = true;
                        } else if (attrs.type == 'datetime') {
                            options['pickDate'] = true;
                            options['pickTime'] = true;
                        }
                    }
                    //else{
                    //  options['pickDate'] = true;
                    //  options['pickTime'] = true;
                    //}
                    if (ngModel) {

                        // $timeout(function(){
                        element.datetimepicker(options);
                        ngModel.$render = function ngModelRender() {
                            if (!ngModel.$viewValue)
                                element.datetimepicker('setLocalDate', new Date()); //'setDate' - UTC date
                            return element.datetimepicker('setLocalDate', ngModel.$viewValue);
                        };
                        //   ngModel.$render();
                        // });
                        element.on('changeDate', function (ev) {
                            scope.$apply(function () {
                                ngModel.$setViewValue(ev.localDate); //ev.date - UTC date
                            });
                        });
                        attrs.$observe('startDate', function (value) {
                            element.datetimepicker('setStartDate', value);
                        });
                        attrs.$observe('endDate', function (value) {
                            element.datetimepicker('setEndDate', value);
                        });
                        var component = element.siblings('[data-toggle="datetimepicker"]');
                        if (component.length) {
                            component.on('click', function () {
                                if (!element.prop('disabled')) {
                                    element.trigger('focus');
                                }
                            });
                        }
                    }
                    element.bind("$destroy", function () {
                        element.datetimepicker("destroy");
                    });
                    //scope.$on('$destroy', function() {
                    //  element.datetimepicker('destroy');
                    //});
                }
            };
        }
    ]);
    return app;
}));
