document.addEventListener('DOMContentLoaded', function () {
    $(document).on('click', '.tabs nav > a', function (e) {
        e.preventDefault();
        var target = this.hash;
        $(this)
            .siblings('.active').removeClass('active').end()
            .addClass('active');
        $(this).closest('.tabs').find('section > .active').removeClass('active');
        $(this).closest('.tabs').find(target).addClass('active');
    });
});
