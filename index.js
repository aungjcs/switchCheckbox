/* global angular */
/* jshint unused: false */

angular.module( 'app', [])
    .directive( 'switchCheckbox', ['$rootScope', function( $rootScope ) {

        return {
            require: 'ngModel',
            restrict: 'E',
            template: '' +
                '<label class="switchCheckbox">' +
                '    <input type="checkbox">' +
                '    <div class="switchBox">' +
                '        <div class="switchContainer">' +
                '            <div class="on">ON</div>' +
                '            <div class="switch"></div>' +
                '            <div class="off">OFF</div>' +
                '        </div>' +
                '    </div>' +
                '</label>',
            replace: true,
            compile: function( tElement, tAttrs ) {

                return function link( scope, ele, attr, ctrls ) {

                    var ngModelCtrl = ctrls,
                        cbx = ele.find( 'input' ).eq( 0 );

                    cbx.on( 'click', function( evt ) {

                        if ( attr.disabled ) {

                            evt.preventDefault();
                        }
                    });

                    // model -> ui
                    ngModelCtrl.$render = function() {

                        cbx.prop( 'checked', ngModelCtrl.$viewValue );
                    };

                    // ui -> model
                    cbx.on( 'change', function( evt ) {

                        scope.$applyAsync(function() {

                            ngModelCtrl.$setViewValue( cbx.prop( 'checked' ) );
                            ngModelCtrl.$render();
                        });
                    });
                };
            }
        };
    }]);
