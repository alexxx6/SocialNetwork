socialNetwork.directive('popupShow', function () {
    return {
        restrict: 'A',
        template: '<span>{{label}}</span>',
        link: function (scope, el, attrs) {
            scope.label = attrs.popupLabel;

            $(el).popover({
                trigger: 'click',
                html: true,
                content: attrs.popupHtml,
                placement: attrs.popupPlacement
            });
        }
    };
});