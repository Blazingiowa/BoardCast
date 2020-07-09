window.onload = function () {
    OnSubmitEvent();
}

function OnSubmitEvent() {
    $(function () {
        $('#taihi').click(function () {
            window.location.href = 'index.html'
        });

        $('#newcreate').click(function () {
            $('#newform').submit();
        });
    });
}
