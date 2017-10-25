(function(){
    angular
        .module("app")
        .filter("displayParagraph", displayParagraph);

    function displayParagraph(){
        return function(text){
            var output = text.replace(/\n/g, '<br/>');
            return output;
        }
    }
})()