$(document).ready(function(){
    var fadeDelay = 250;

    var btnSwitchToRegistration = $('a.register'),
        btnSwitchToLogin = $('a.login'),
        panelLogin = $('div.login'),
        panelRegistration = $('div.register');

    btnSwitchToRegistration.click(function(){
        panelLogin.fadeOut(fadeDelay);
        panelRegistration.delay(fadeDelay).fadeIn();
    });

    btnSwitchToLogin.click(function(){
        panelRegistration.fadeOut(fadeDelay);
        panelLogin.delay(fadeDelay).fadeIn();
    });
});
