$(document).ready(function(){
    var fadeDelay = 250;

    var btnSwitchToRegistration = $('a.register'),
        btnSwitchToLogin = $('a.login'),
        panelLogin = $('div.login'),
        panelRegistration = $('div.register'),
        btnRegister = $('a.btnRegister');

    btnSwitchToRegistration.click(function(){
        panelLogin.fadeOut(fadeDelay);
        panelRegistration.delay(fadeDelay).fadeIn();
    });

    btnSwitchToLogin.click(function(){
        panelRegistration.fadeOut(fadeDelay);
        panelLogin.delay(fadeDelay).fadeIn();
    });

    var invalidateInput = function(input){
        input.val('');
        input.focus();
        input.addClass('form-error');
    }

    btnRegister.click(function(){
        var inptLogin = $('.form-login');
        inptLogin.removeClass('form-error');

        var login = inptLogin.val();
        if (login.length == 0 || !login.match('[a-zA-Z]+')){
            invalidateInput(inptLogin);
            return;
        }

        var inptPassword = $('.form-password'),
            inptPasscheck = $('.form-passcheck');
        inptPassword.removeClass('form-error');
        inptPasscheck.removeClass('form-error');

        var password = inptPassword.val(),
            passcheck = inptPasscheck.val();

        if (password.length == 0 || !password.match('[a-zA-Z0-9]+')){
            invalidateInput(inptPassword);
            return;
        }

        if (password != passcheck){
            invalidateInput(inptPasscheck);
            return;
        }

        var imgLoading = $('img.loading');
        imgLoading.removeClass('hidden');

        Utils.toggleElementsState(false, [inptLogin, inptPassword, inptPasscheck, btnRegister]);

        var guid = Utils.guid();
        Utils.get('/api/security/getkey', {
            id: guid
        }, function(data){
            var key = GibberishAES.dec(data.key, guid);
            var package = {
                login: GibberishAES.enc(login, key),
                passw: GibberishAES.enc(password, key),
                hashc: data.key
            };

            Utils.post('/api/user/register', package, function(data){
                //ok
                imgLoading.addClass('hidden');
                Utils.toggleElementsState(true, [inptLogin, inptPassword, inptPasscheck, btnRegister]);
                window.location = '/';
            }, function(data){
                //not ok
                imgLoading.addClass('hidden');
                Utils.toggleElementsState(true, [inptLogin, inptPassword, inptPasscheck, btnRegister]);
                Utils.alert('Случилась ошибка при создании нового пользователя. Повторите процедуру позже.')
            });
        })
    })
});
