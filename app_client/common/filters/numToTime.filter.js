(function () {
    angular
        .module("app")
        .filter("numToTime", numToTime)

    function numToTime() {
        return function (num) {
            var hour, min, sec;

            hour = parseInt(num / 3600);
            min = parseInt((num - hour * 3600) / 60);
            sec = num - hour * 3600 - min * 60;

            var formatNum  = function(num){
                if(num < 10) return "0" + num.toString();
                else return num.toString();
            }

            return formatNum(hour) + ":" + formatNum(min) + ":" + formatNum(sec);
        }
    }

})();