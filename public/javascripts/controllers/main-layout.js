function MainLayoutController(){
    var btnDropdown = $('div[data-dropdown=true]'),
        menuDropdown = $('#drop'),
        btnLogout = $('#btnLogout');

    menuDropdown.stateHidden = true;

    btnDropdown.on('click', function(e){
        if (menuDropdown.stateHidden){
            menuDropdown.stateHidden = false;
            menuDropdown.fadeIn(400);
        } else {
            menuDropdown.stateHidden = true;
            menuDropdown.fadeOut(400);
        }

        e.stopPropagation();
    });

    $(document).on('click', function(){
        if (!menuDropdown.stateHidden){
            menuDropdown.stateHidden = true;
            menuDropdown.fadeOut(400);
        }
    });

    btnLogout.on('click', function(){
        Utils.get('/api/user/logout',{},function(){
            window.location.reload();
        })
    })
}

$(document).ready(function(){
    var controller = new MainLayoutController();
});
